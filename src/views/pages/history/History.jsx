import React, { useEffect, useState } from 'react'
import { fetchProductsHelper } from '../../../model/products/products'
import Products from '../../components/products/Products'
import SubHeading from '../../components/subheading/Subheading'
import { getUserId } from '../../../model/auth/token'
import Loader from '../../components/loader/Loader'

const History = () => {
    const userId = getUserId();
    const[loading, setLoading] = useState(false);
    const[history, setHistory] = useState([]);
    const[historyRelated, setHistoryRelated] = useState([]);

    useEffect(() => {
        const handleHistory = async () => {
            try{
                setLoading(true)
                setHistory(await fetchProductsHelper('history', userId));
                setHistoryRelated(await fetchProductsHelper('history/recomend', userId));
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
            :<div className='w-full flex flex-col py-[20px] px-[50px] lg:px-[150px]'>
                {history.length === 0 &&<SubHeading heading="History" title={'No History Found'}/>}
                {history.length > 0 &&<SubHeading heading="History" title={'Your Previews'}/>}
                {history.length > 0 &&<div className='flex flex-row pb-10 gap-5 flex-nowrap justify-start items-center overflow-auto'>
                    {history.map((item,index) => (
                        <Products item={item} key={index}/>
                    ))}
                </div>}
                {historyRelated.length > 0 &&<div className='flex flex-col pb-[10px] lg:pb-[20px]  pt-15 mb-20'>
                    <SubHeading heading="Just for you" title='Related Products' btn={true} btnText='See All'/>
                    <div className='grid grid-cols-2 gap-10  lg:gap-12 lg:flex lg:flex-wrap  justify-start items-center'>
                        {historyRelated.map((item, index) => (
                            <Products item={item} key={index} />
                        ))}
                    </div>
                </div>}
            </div>}
        </>
    )
}

export default History
