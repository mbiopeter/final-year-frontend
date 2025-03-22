import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import {  fetchProductsHelper, getProductBySubCategory } from '../../model/products/products';
import SubHeading from '../components/subheading/Subheading';
import Products from '../components/products/Products';
import Loader from '../components/loader/Loader';

const SubCategory = () => {
    const [loading, setLoading] = useState(false);
    const[allProducts, setAllProducts] = useState([]);

    useEffect(() => {
        const handleAllProducts = async () => {
            try{
                setLoading(true);
                setAllProducts(await fetchProductsHelper('allproducts'));
            }catch(error){
                return;
            }finally{
                setTimeout(() => {
                    setLoading(false);
                }, 1000);
            }
        }
        handleAllProducts();
    },[])


    const {subcategory} = useParams();
    const formattedSubCategory = subcategory.replace(/-/g, ' ');

    const subcategoryProducts = getProductBySubCategory(allProducts,formattedSubCategory )
    return (
        <>
        {loading ? <Loader />
            :<div className=' w-full py-[20px] px-[50px] lg:px-[150px]'>
                <div className='flex flex-col pb-[10px] lg:pb-[20px]  pt-5 mb-20'>
                    {subcategoryProducts.length === 0 &&<SubHeading heading={formattedSubCategory} title='No Items' btn={true} btnText='See All'/>}
                    {subcategoryProducts.length > 0 &&<SubHeading heading="Sub category" title={formattedSubCategory} btn={true} btnText='See All'/>}
                    {subcategoryProducts.length > 0 &&<div className='grid grid-cols-2 gap-10 sm:grid-cols-2 lg:flex lg:flex-wrap  justify-start items-center'>
                        {subcategoryProducts.map((item, index) => (
                            <Products item={item} key={index} />
                        ))}
                    </div>}
                </div>
            </div>}
        </>
    )
}

export default SubCategory
