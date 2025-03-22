import React, { useEffect, useState } from 'react'
import Categories from '../../components/categories/Categories';
import Slider from '../../components/slider/Slider';
import BlockCategory from '../../components/categories/Block';
import New from '../../components/new/New';
import Service from '../../components/service/Service';
import { services } from '../../../model/services/services';
import SubHeading from '../../components/subheading/Subheading';
import Products from '../../components/products/Products';
import Button from '../../components/button/Button';
import Banner from '../../components/banner/Banner';
import { fetchProductsHelper } from '../../../model/products/products';
import { fetchCategories } from '../../../model/categories/category';
import Loader from '../../components/loader/Loader';

const Home = () => {
    const [activeCategory, setActiveCategory] = useState('Camera');
    const [loading,setLoading] = useState(false);

    const[bestSellings, setBestSellings] = useState([]);
    const[explore, setExplore] = useState([]);
    const[scrollList, setScrollList] = useState([]);
    const[moreCategories, setMoreCategories] = useState([]);

    useEffect(() => {
        const handleFetch = async () => {
            try{
                setLoading(true);
                setScrollList(await fetchProductsHelper('scrolllist'));
                setBestSellings(await fetchProductsHelper('bestsellings'));
                setExplore(await fetchProductsHelper('explore'));
                setMoreCategories(await fetchCategories('others'));
            }catch(error){
                return;
            }finally{
                setTimeout(() => {
                    setLoading(false);
                }, 1000);
            }
        }
        handleFetch();
    },[]);

    return (
        <>
            {loading ? <Loader />
            :<div className=' w-full flex flex-col py-[20px] px-[50px] lg:px-[130px]'>
                <div className='flex flex-col gap-[20px] lg:flex-row justify-between'>
                    <Categories />
                    <Slider />
                </div>
                <div className='my-10'>
                    <SubHeading heading="Today's" title={'Flash Sales'} timer={true}/>
                </div>
                <div className='flex flex-row pb-10 gap-5 flex-nowrap justify-start items-center overflow-auto'>
                    {scrollList.map((item,index) => (
                        <Products item={item} key={index}/>
                    ))}
                </div>
                <div className='w-full my-10 flex items-center justify-center'>
                    <Button value='View All Products' />
                </div>
                {moreCategories. length > 0 &&<div className='flex flex-col pb-[10px] lg:pb-[20px]  pt-15 border-t-[1px] border-t-[#ddd]'>
                    <SubHeading heading="Category" title={'Browse By Category'}/>
                    <div className='flex flex-row overflow-x-auto gap-5 pb-10 lg:gap-10'>
                        {moreCategories.map((item,index) => (
                            <BlockCategory values={item} key={index} activeCategory={activeCategory} setActiveCategory={setActiveCategory}/>
                        ))}
                    </div>
                </div>}

                {bestSellings.length > 0 &&<div className='flex flex-col pb-[10px] lg:pb-[20px] justify-center  pt-15 border-t-[1px] border-t-[#ddd]'>
                    <SubHeading heading="This Month" title={'Best Selling Products'} btn={true} btnText='View All'/>
                    <div className='grid grid-cols-2 gap-10 sm:grid-cols-2 lg:flex lg:flex-wrap  justify-start items-start'>
                        {bestSellings.map((item, index) => (
                            <Products item={item} key={index} />
                        ))}
                    </div>
                </div>}

                <div className='my-10'>
                    <Banner />
                </div>

                {explore.length >0 &&<div className='flex flex-col pb-[10px] lg:pb-[20px]  pt-15 border-t-[1px] border-t-[#ddd]'>
                    <SubHeading heading="Our Products" title={'Explore Our Products'}/>
                    <div className='grid grid-cols-2 gap-10 sm:grid-cols-2 lg:flex lg:flex-wrap  justify-start items-center'>
                        {explore.map((item, index) => (
                            <Products item={item} key={index} />
                        ))}
                    </div>
                </div>}

                {explore.length >0 &&<div className='w-full my-10 flex items-center justify-center'>
                    <Button value='View All Products' />
                </div>}

                <div className='py-10 h-auto flex flex-col gap-5'>
                    <SubHeading heading="Featured" title={'New Arrival'} btn={false} section={'New'}/>
                    <New />
                </div>
                <div className='flex flex-col lg:flex-row gap-15 mt-10 items-center justify-center'>
                    {services.map((item,index) => (
                        <Service values={item} key={index}/>
                    ))}
                </div>
            </div>}
        </>
    )
}

export default Home
