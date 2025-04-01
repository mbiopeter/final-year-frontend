import React, { useEffect, useState } from 'react';
import { Rating } from "primereact/rating";
import Rate from '@mui/material/Rating';
import FavoriteIcon from '@mui/icons-material/Favorite';
import delivery from '../../../assets/images/delivery.png';
import reload from '../../../assets/images/reload.png';
import SubHeading from '../../components/subheading/Subheading';
import Products from '../../components/products/Products';
import { fetchProductsHelper, getProductById, isHistory, isProductLiked } from '../../../model/products/products';
import { useParams } from 'react-router-dom';
import { isOrderPlaced } from '../../../model/cart/cart';
import { cartUrl, productsUrl, serverUrl } from '../../../const';
import axios from "axios";
import { getUserId } from '../../../model/auth/token';
import Loader from '../../components/loader/Loader';
import Error404 from '../error/Error404';

const Product = ({ items, setItems }) => {
    const userId= getUserId();
    const [loading, setLoading] = useState(false);
    const { productId } = useParams();
    const [wishList, setWishList] = useState([]);
    const [rated, setRated] = useState(false);
    const [available, setAvailable] = useState()

    useEffect(() => {
        const handleFetch =async () => {
            if (userId) {
                setWishList(await fetchProductsHelper('wishlist', userId));
            }
        }
        handleFetch();
    },[userId])

    const [allProducts, setAllProducts] = useState([]);
    const [explore, setExplore] = useState([]);
    const [history, setHistory] = useState([]);

    const [quantity, setQuantity] = useState(1);
    const [selectedColor, setSelectedColor] = useState('');
    const [selectedSize, setSelectedSize] = useState('');
    const [mainImage, setMainImage] = useState(null);
    const [liked, setLiked] = useState(false);


    useEffect(() => {
        const fetchData = async () => {
            try{
                setLoading(true);
                setAllProducts(await fetchProductsHelper('allproducts'));
                setExplore(await fetchProductsHelper('explore'));
                if (userId) {
                    setHistory(await fetchProductsHelper('history', userId));
                }
            }catch(error){
                return;
            }finally{
                setTimeout(() => {
                    setLoading(false);
                }, 1000);
            }
        };
        fetchData();
    }, [rated]);


    const product = getProductById(allProducts, productId) ;
    useEffect(() => {
        if (product) {
            setMainImage(product.images?.[0] || null);
            setSelectedColor(product.variantType?.color?.[0] || '');
            setSelectedSize(product.variantType?.size?.[0] || '');
            if (userId && wishList) {
                setLiked(isProductLiked(wishList, product.id));
            }
        }
    }, [product]);

    const toggleLike = async() => {
        try{
            setLiked((prev) => !prev);
            const productDetails = {
                userId,
                productId
            }
            if (liked) {
                setWishList(prev => prev.filter(p => p.id !== product.id));
                //api request to un like a product
                await axios.delete(`${productsUrl}/wishlist/remove`,{ data: productDetails } );

            } else {
                
                setWishList(prev => [...prev, product]);
                //api request to like a product
                await axios.post(`${productsUrl}/wishlist/add`,productDetails );
            }
        }catch(error){
            return;
        }
    };

    const increment = () => setQuantity(q => q + 1);
    const decrement = () => setQuantity(q => (q > 1 ? q - 1 : 1));

    const isOrdered = isOrderPlaced(items, productId);

    const handleAddCart = async () => {
        try{
            if (!isOrdered && product) {
                const cartItem = {
                    productId:product.id,
                    userId,
                    quantity
                }
                await axios.post(`${cartUrl}/new`, cartItem);
                setItems(prev => {
                    return Array.isArray(prev) ? [...prev, { productId: product.id, img: `${serverUrl}/${product.images[0]}`, product: product.name, price: product.offerPrice, quantity }] : [{ productId: product.id, img: `${serverUrl}/${product.images[0]}`, product: product.name, price: product.offerPrice, quantity }];
                });
                
                
            }
        }catch(error){
            console.log(error);
        }
    };

    useEffect(() => {
        const handleAddhistory = async () => {
            try{
                if (product && !isHistory(history, product.id)) {
                    setHistory(prev => [...prev, product]);
                    const reqData = {
                        productId, 
                        userId 
                    }
                    await axios.post(`${productsUrl}/history/new`, reqData)
                }
            }catch(error){
                console.log(error);
            }
        }
        handleAddhistory();
    }, [product]);

    const [rating,setRatings] = useState(product && product.ratings);

    const handleRatings = async () => {
        try{
            const data = {
                productId,
                userId,
                rating
            }
            //api request to rate a product
            setRated(true);
            await axios.post(`${productsUrl}/rating/create`,data );
        }catch(error){
            console.log(error);
        }
    }

    useEffect(() => {
        if(product && product.amountLeft < quantity){
            setAvailable(false);
        }else{
            setAvailable(true);
        }
    },[product, quantity])

    if (!product) return <Error404 />;


    return (
        <>
        {loading ? <Loader />
            :<div className='w-full flex flex-col py-5 px-5 lg:px-20'>

                <div className="flex justify-start items-center py-4">
                    <div className="flex flex-row gap-1">
                        <span className="text-sm text-gray-500">Account</span>/ 
                        <span className="text-sm text-black">Product</span>
                    </div>
                </div>

                <div className='w-full flex flex-col lg:flex-row gap-10'>
                    <div className='flex lg:w-[50%] flex-col lg:flex-row gap-5'>
                        <div className='flex flex-row lg:flex-col gap-5'>
                            {product.images.slice(1).map((image, index) => (
                                <div 
                                    key={index} 
                                    className='w-24 h-24 p-2 shadow-sm flex overflow-hidden items-center justify-center rounded-sm'
                                    onClick={() => setMainImage(image)}>
                                    <img src={image} className='w-full' alt='product' />
                                </div>
                            ))}
                        </div>
                        <div className='shadow-sm overflow-hidden max-h-[72vh] p-5 lg:min-w-[80%] flex items-center justify-center'>
                            <img src={mainImage} className='w-full' alt='Main Product' />
                        </div>
                    </div>

                    <div className='shadow-sm flex flex-col gap-2 w-full lg:w-2/5 p-5'>
                        <h2 className='text-xl font-semibold'>{product.name}</h2>
                        <div className='flex items-center gap-2'>
                            <Rating value={product.ratings} cancel={false} />
                            <span className='text-sm'>({product.ratingsCount})</span>
                            <span className='text-sm'>|</span>
                            <span className={`text-sm ${product.amountLeft >= 50 ? 'text-green-500' : 'text-red-500'}`}>
                                {product.amountLeft >= 50 ? 'In Stock' : product.amountLeft + ' Items Left'}
                            </span>
                        </div>
                        <span className='text-lg font-medium'>${product.price}</span>
                        <p className='text-sm text-gray-700'>{product.description}</p>
                        <hr />

                        {userId &&<div className='flex flex-row gap-8 items-center'>
                            <Rate
                                name="simple-controlled"
                                value={rating}
                                onChange={(event, newValue) => {
                                setRatings(newValue);
                            }} />
                            <button
                                onClick={handleRatings}
                                className={`${rated ? 'bg-green-400': ' bg-red-500'} cursor-pointer py-2 px-7 text-white rounded-sm`}>
                                    {rated ? 'Rated sucess':'Rate Product'}
                            </button>
                        </div>}

                        {userId &&<div className='flex gap-5 mt-4'>
                            <div className='flex border rounded-sm'>
                                <button className='w-10 text-lg font-bold border-r' onClick={decrement}>-</button>
                                <span className='w-12 text-lg font-medium flex items-center justify-center'>{quantity}</span>
                                <button className='w-10 text-lg font-bold bg-red-500 text-white' onClick={increment}>+</button>
                            </div>
                            <button
                                onClick={available ? handleAddCart: null}
                                className={`
                                    ${isOrdered ? 'bg-green-500 cursor-not-allowed' 
                                    :available === false ? 'bg-gray-500 cursor-not-allowed' 
                                    :'bg-red-500 cursor-pointer'} py-2 px-7 text-white rounded-sm`}>
                                {isOrdered ? 'Order Placed'
                                :available === false ? 'Out of stock' 
                                : 'Add To Cart'}
                            </button>
                            <div className='p-2 border rounded-sm w-10 h-10 flex items-center justify-center'>
                                <FavoriteIcon
                                    fontSize="small"
                                    onClick={toggleLike} 
                                    className={`${liked ? 'text-[#DB4444]' : 'text-gray-500'} cursor-pointer`}
                                />
                            </div>
                        </div>}


                        <div className='border rounded-md mt-4'>
                            <div className='flex items-center p-4 gap-4'>
                                <img src={delivery} className='h-5' alt='Free Delivery' />
                                <div>
                                    <span className='text-md font-medium'>Free Delivery</span>
                                    <p className='text-xs underline'>Enter your postal code for Delivery Availability</p>
                                </div>
                            </div>
                            <hr />
                            <div className='flex items-center p-4 gap-4'>
                                <img src={reload} className='h-5' alt='Return Delivery' />
                                <div>
                                    <span className='text-md font-medium'>Return Delivery</span>
                                    <p className='text-xs underline'>Free 30 Days Delivery Returns. Details</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className='py-10'>
                    <SubHeading heading="Related Items" btn={false} section={'New'} />
                    <div className='grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-5'>
                        {explore.map((item, index) => (
                            <Products item={item} key={index} />
                        ))}
                    </div>
                </div>

            </div>}
        </>
    );
};

export default Product;
