import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { fetchCategories, getCategoryById } from '../../../model/categories/category';
import SubHeading from '../../components/subheading/Subheading';
import Products from '../../components/products/Products';
import { fetchProductsHelper, getProductByCategory } from '../../../model/products/products';
import Loader from '../../components/loader/Loader';

const SubCategory = ({ subcategory, values }) => {
    const { categoryId } = useParams();
    const formattedSubCategory = subcategory.replace(/\s+/g, '-');
    return (
        <Link to={`/category/${categoryId}/${formattedSubCategory}`}>
            <div className="flex min-w-[70px] h-full flex-col bg-[#F1F1F1] shadow-lg items-center justify-center p-3 rounded-lg hover:bg-[#DB4444] hover:text-white transition-colors duration-300 ease-in-out">
                <div className="h-[30px] w-[30px] overflow-hidden rounded-full bg-[#FFF] mb-2">
                    <img src={values.img} className="object-cover w-full h-full" alt={values.name} />
                </div>
                <span className="text-sm font-semibold text-[#333]">{values.name}</span>
            </div>
        </Link>
    );
};

const Category = () => {
    const [loading, setLoading] = useState(false);
    const [allProducts, setAllProducts] = useState([]);
    const [BasicCategories, setBasicCategories] = useState([]);
    const [moreCategories, setMoreCategories] = useState([]);

    useEffect(() => {
        const handleFetch = async () => {
            try{
                setLoading(true);
                setAllProducts(await fetchProductsHelper('allproducts'));
                setBasicCategories(await fetchCategories('basic'));
                setMoreCategories(await fetchCategories('others'));
            }catch(error){
                return;
            }finally{
                setTimeout(() => {
                    setLoading(false);
                }, 1000);
            }
        };
        handleFetch();
    }, []);

    const { categoryId } = useParams();

    const allCategories = [...BasicCategories, ...moreCategories];
    const currentcategory = getCategoryById(allCategories, categoryId);
    const categoryProducts = currentcategory ? getProductByCategory(allProducts, currentcategory.name) : [];

    if (!currentcategory) {
        return <div>Loading...</div>;
    }

    return (
        <>
        {loading ? <Loader />
            :<div className="w-full flex flex-col py-[20px] px-[50px] lg:px-[150px]">
                {currentcategory.subcategories.length > 0 &&<SubHeading heading="Sub Categories" btn={false} section={'New'} />}
                {currentcategory.subcategories.length > 0 &&<div className="w-full px-[20px] h-auto flex flex-row pb-5 gap-2 lg:gap-3 overflow-auto mb-10">
                    {currentcategory.subcategories.map((item) => (
                        <SubCategory subcategory={item.name} values={item} key={item.id} />
                    ))}
                </div>}

                <div className="flex flex-col pb-[10px] lg:pb-[20px] pt-5 mb-20">
                    {categoryProducts.length === 0 &&<SubHeading heading={currentcategory.name} title="No Items" btn={true} btnText="See All" />}
                    {categoryProducts.length > 0 &&<SubHeading heading="Category" title={currentcategory.name} btn={true} btnText="See All" />}
                    {categoryProducts.length > 0 &&<div className="grid grid-cols-2 gap-10 sm:grid-cols-2 lg:flex lg:flex-wrap justify-start items-center">
                        {categoryProducts.map((item) => (
                            <Products item={item} key={item.id} />
                        ))}
                    </div>}
                </div>
            </div>}
        </>
    );
};

export default Category;
