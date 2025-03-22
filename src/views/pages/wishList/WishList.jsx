import React, { useEffect, useState } from 'react'
import SubHeading from '../../components/subheading/Subheading'
import Products from '../../components/products/Products'
import { getUserId } from '../../../model/auth/token'
import { fetchProductsHelper } from '../../../model/products/products'
import Loader from '../../components/loader/Loader'

const WishList = () => {
    const userId = getUserId();
    const [loading, setLoading] = useState(false);
    const[wishList, setWishList] = useState([]);
    const[recommendations, setWishlistRelated] = useState([]);

    useEffect(() => {
        const handleHistory = async () => {
            try{
                setLoading(true);
                setWishList(await fetchProductsHelper('wishlist', userId));
                setWishlistRelated(await fetchProductsHelper('wishlist/recomend', userId));
            }catch(error){
                return;
            }finally{
                setTimeout(() => {
                    setLoading(false);
                }, 1000);
            }
        }
        handleHistory();
    },[])
    return (
        <>
        {loading ? <Loader />
            :<div className=' w-full flex  flex-col px-[50px] lg:px-[130px]'>
                <div className='flex flex-col pb-[10px] lg:pb-[20px]  pt-15 '>
                    {wishList && wishList.length > 0 &&<SubHeading heading={`wishlist(${wishList.length})`} title='Liked Products' btn={true} btnText='See All'/>}
                    {wishList && wishList.length === 0 &&<SubHeading heading="WishList" title='No Liked Products' btn={true}/>}
                    {wishList && wishList.length > 0 &&<div className='grid grid-cols-2 gap-10 lg:gap-15 lg:flex lg:flex-wrap  justify-start items-center'>
                        {wishList.map((item, index) => (
                            <Products item={item} key={index} />
                        ))}
                    </div>}
                </div>
                {recommendations.length > 0 &&<div className='flex flex-col pb-[10px] lg:pb-[20px]  pt-15 mb-20'>
                    <SubHeading heading="Just for you" title='Recommendations' btn={true} btnText='See All'/>
                    <div className='grid grid-cols-2 gap-10 lg:gap-15 lg:flex lg:flex-wrap  justify-start items-center'>
                        {recommendations.map((item, index) => (
                            <Products item={item} key={index} />
                        ))}
                    </div>
                </div>}
            </div>}
        </>
    )
}

export default WishList
