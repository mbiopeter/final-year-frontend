import React, { useState } from 'react';
import axios from 'axios';
import auth from '../../../assets/images/auth.png';
import { authUrl } from '../../../const';
import { useNavigate } from "react-router-dom";

const Authentication = ({setFetch, fetch}) => {

    const navigate = useNavigate();

    const[page, setPage] = useState('Login');
    const[loading,setLoading] = useState(false);
    const[message,setMesage] = useState();
    const[error, setError] = useState()
    const [details,setDetail]  = useState({
        name:'',
        email:'',
        password:'',
        conPassword:''
    });

    const handleOnChange = (key, value) => {
        setDetail(prev => ({
            ...prev,
            [key]: value
        }));
    };

    const handleOnSignUp = async () => {
        try{
            setLoading(true);
            const response = await axios.post(`${authUrl}/signUp`,details);
            setMesage(response.data.message);
            setError(null)
        }catch(error){
            setError(error.response.data.error);
            setMesage(null)
        }finally{
            setLoading(false)
        }
    }

    const handleOnLogin= async () => {
        try{
            setLoading(true);
            const response = await axios.post(`${authUrl}/login`,details);
            if(response.data.token){
                const token = response.data.token
                localStorage.setItem('authToken',token );
                setFetch(!fetch);
                navigate("/")
            }
        }catch(error){
            setMesage(null)
            setError(error.response.data.error);
        }finally{
            setLoading(false)
        }
    }
    return (
        <div className='w-full  flex items-center justify-center'>
            <div className='w-full flex flex-row my-20'>
                <div className='hidden w-[60%] bg-[#CBE4E8] lg:flex items-center justify-center'>
                    <img src={auth}  className='h-[500px] object-contain'/>
                </div>
                <div className='w-full lg:w-[40%] flex items-center justify-center'>
                    <div className='shadow-lg justify-center lg:shadow-none p-10 flex w-auto flex-col gap-7'>
                        <div className='flex flex-col'>
                            <span className='text-[30px] font-[500] text-[#0000000]'>
                                {page === 'Login' ? 'Log in to Exclusive' :'Create an account'}
                            </span>
                            <span className='text-[16px] font-[400] text-[#0000000]'>Enter your details below</span>
                        </div>
                        {page === 'signUp' &&
                            <input 
                                value={details.name}
                                onChange={(e) => handleOnChange('name',e.target.value)}
                                type="text" 
                                placeholder='Name' 
                                className='text-[16px] font-[400] text-[#0000000] border-0 border-b-[2px] border-b-[#ddd] outline-none ' />}
                        <input
                            value={details.email}
                            onChange={(e) => handleOnChange('email',e.target.value)} 
                            type="text" 
                            placeholder='Email Address' 
                            className='text-[16px] font-[400] text-[#0000000] border-0 border-b-[2px] border-b-[#ddd] outline-none ' />
                        <input 
                            value={details.password}
                            onChange={(e) => handleOnChange('password',e.target.value)}
                            type="text" 
                            placeholder='Password' 
                            className='text-[16px] font-[400] text-[#0000000] border-0 border-b-[2px] border-b-[#ddd] outline-none ' />
                        {page === 'signUp' && 
                            <input
                                value={details.conPassword}
                                onChange={(e) => handleOnChange('conPassword',e.target.value)}
                                type="text" 
                                placeholder='Confirm Password' 
                                className='text-[16px] font-[400] text-[#0000000] border-0 border-b-[2px] border-b-[#ddd] outline-none ' />}
                        {message && <span className='text-[13px] text-green-500 font-[600]'>{message}</span>}
                        {error && <span className='text-[13px] text-center text-[#DB4444] font-[600]'>{error}</span>}
                        <div className={`flex w-full flex-row gap-5 items-center`}>

                            <button
                                onClick={page === 'signUp' ? handleOnSignUp : handleOnLogin}
                                className='bg-[#DB4444] text-[#FAFAFA] cursor-pointer w-full rounded-[4px] py-2 text-[16px] font-[500]'>
                                    { page === 'Login' && loading === false ? 'Login':page === 'signUp' && loading === false ?'Sign Up': 'Loading...'}
                            </button>
                            {page === 'Login' && (
                                <span className='text-[11px] whitespace-nowrap font-[400] text-[#DB4444]'>Forget Password?</span>
                            )}
                        </div>
                        <div className='flex flex-row items-center gap-2 w-full justify-center'>
                            <span className='text-[16px] whitespace-nowrap font-[400] text-[#0000000]'>
                                {page === 'signUp' ? 'Already have account?' : "Don't have account?"}
                            </span>
                            <span
                                onClick={page === 'Login' ? () => setPage('signUp') : () => setPage('Login') }
                                className='text-[16px] font-[600] text-[#0000000] cursor-pointer'>
                                {page === 'signUp' ? 'Login' : 'Sign up'}
                            </span>
                        </div>
                        
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Authentication
