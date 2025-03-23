import React, {useEffect, useState } from "react";
import axios from "axios"; 
import "primeicons/primeicons.css";
import { Rating } from "primereact/rating";
import { Link } from "react-router-dom";
import FavoriteIcon from '@mui/icons-material/Favorite';
import VisibilityIcon from '@mui/icons-material/Visibility';
import {fetchProductsHelper, isProductLiked } from "../../../model/products/products";
import { getUserId } from "../../../model/auth/token";
import { productsUrl } from "../../../const";
const Products = ({ item }) => {
	const userId= getUserId();
	const [wishList, setWishList] = useState([]);
	const [liked, setLiked] = useState(false);

	useEffect(() => {
		const handleFetch =async () => {
            const wishlistData = await fetchProductsHelper('wishlist', userId);
            setWishList(wishlistData);
            setLiked(isProductLiked(wishlistData, item.id));
		}
		handleFetch();
	},[userId])

	const discount = Math.round((1 - item.offerPrice / item.price) * 100);

	

    const toggleLike = async () => {
        try {
            const productDetails = {
                userId,
                productId: item.id
            };

            if (liked) {
                setWishList(prev => prev.filter(p => p.id !== item.id));
                setLiked(false);
                await axios.delete(`${productsUrl}/wishlist/remove`, { data: productDetails });
            } else {
                setWishList(prev => [...prev, item]);
                setLiked(true);
                await axios.post(`${productsUrl}/wishlist/add`, productDetails);
            }
        } catch (error) {
            console.error("Error toggling wishlist", error);
        }
    };
	return (
		<div className="flex transition-transform duration-500 ease-in-out pb-6">
			<div className="h-[350px] w-[170px]">
				<div className="bg-gray-100 rounded-sm h-55 md:h-60 flex flex-col">
					<div className="flex justify-between">
						<p className="flex items-center h-4 w-12 bg-[#DB4444] m-3 justify-center rounded-md text-white text-xs p-2 font-semibold">
						{discount}%
						</p>
						<div className="icons flex flex-col gap-1 mt-3 mx-4">
						{userId &&<FavoriteIcon
							fontSize="small"
							onClick={toggleLike} 
							className={`${liked ? 'text-[#DB4444]' : 'text-gray-500'} cursor-pointer`}
						/>}
						<Link to={`/product/${item.id}`}>
							<VisibilityIcon fontSize="small" className="text-gray-500 cursor-pointer"/>
						</Link>
						</div>
					</div>
					<div className="flex h-[80%] w-full overflow-hidden items-center justify-center m-auto">
						<img
						src={item.images[0]}
						className="object-fit"
						alt={item.name}
						/>
					</div>
				</div>
				<p className="product_name font-bold mt-2 ">
					{item.name}
				</p>
				<div className="flex flex-row">
					<p className="text-red-500 text-[16px] font-semibold m-1">Ksh.{item.offerPrice}</p>
					<p className="text-gray-400 font-semibold m-1">
						<s>ksh.{item.price}</s>
					</p>
				</div>
				<div className="flex items-center mt-1">
					<Rating
						className="text-yellow-500"
						value={item.ratings}
						cancel={false}/>
					<p className="font-semibold ml-2">({item.ratingsCount})</p>
				</div>
			</div>
		</div>
	);
};

export default Products;
