import React, { useEffect, useState } from 'react';
import { TextField, Radio, Button } from '@mui/material';
import { CreditCard, LocalShipping } from '@mui/icons-material';
import { getUserDetails, getUserId } from '../../../model/auth/token';
import axios from 'axios';
import { customerUrl, orderUrl, stripeUrl } from '../../../const';
import Loader from '../../components/loader/Loader';
const Billing = ({ billedItems, setFetch, fetch }) => {
    const userId = getUserId();
    const[loading, setLoading] = useState(false);

    const [billingInfo, setBillingInfo] = useState({
        firstName: '',
        streetAdress: '',
        apartment: '',
        town: '',
        phoneNumber: '',
        email: '',
    });

    let total = 0;
    let shipping = 0;
    billedItems.map((item) => {
        total += item.quantity * item.price;
    });


    useEffect(() => {
        const handleFetch = async () => {
            try{
                setLoading(true);
                if(userId){
                    const userDetails = await getUserDetails(userId);
                    setBillingInfo({
                        firstName: userDetails?.firstName || "",
                        streetAdress: userDetails?.streetAddress || "",
                        apartment: userDetails?.apartment || "",
                        town: userDetails?.town || "",
                        phoneNumber: userDetails?.phoneNumber || "",
                        email: userDetails?.email || "",
                    });
                }
            }catch(error){
                return
            }finally{
                setTimeout(() => {
                    setLoading(false);
                }, 1000);
            }
        }
        handleFetch();
    },[userId]);


    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('cashOnDelivery');

    const handleOnChange = (key, value) => {
        setBillingInfo((prev) => ({
        ...prev,
        [key]: value,
        }));
    };

    const handleBillingDetails = async () => {
        try{
            await axios.post(`${customerUrl}/billing`,billingInfo, {params:{userId}} );
        }catch(error){
            console.log(error)
            return;
        }
    }

    const handlePaymentMethodChange = (event) => {
        setSelectedPaymentMethod(event.target.value);
    };

    const[paymentLoading, setPaymentLoading] = useState(false);
    const [orderStatus, setOrderStatus] = useState(false);

    const handlePaymentRequests = async () => {
        try {
            handleBillingDetails()
            setPaymentLoading(true);
            if (selectedPaymentMethod === 'bank') {
                const stripeData = {
                    email: billingInfo.email,
                    userId:userId,
                    cartItems: billedItems.map((item) => ({
                        productId:item.productId,
                        img: item.img,
                        price: Number(item.price).toFixed(2),
                        product: item.product,
                        quantity: Number.parseInt(item.quantity, 10)
                    }))
                };

                const response = await axios.post(`${stripeUrl}/checkout`, stripeData);

                if (response.data?.url) {
                    window.location.href = response.data.url;
                }
            }
            if(selectedPaymentMethod === "cashOnDelivery"){
                const cashData = {
                    userId:userId,
                    cartItems: billedItems.map((item) => ({
                        productId:item.productId,
                    }))
                };
                const response = await axios.post(`${orderUrl}/new`,cashData);
                setOrderStatus(response.data.message);
                setFetch(!fetch);
            }
        } catch (error) {
            console.error(error);
        } finally {
            setPaymentLoading(false);
        }
    };

    return (
        loading ? <Loader />
        :<div className="w-full flex flex-col px-[50px] justify-start lg:px-[150px]">
            <div className="flex justify-start items-center py-5">
                <div className="flex flex-row gap-1">
                <span className="text-[14px] text-[#696868] font-[400]">Account</span>/
                <span className="text-[14px] text-[#696868] font-[400]">Product</span>/
                <span className="text-[14px] text-[#000000] font-[400]">Billing</span>
                </div>
            </div>
            <div className="w-full flex flex-col lg:flex-row py-5 justify-between gap-10">
                <div className="w-full lg:w-[40%]">
                <h2 className="text-2xl font-semibold mb-5">Billing Details</h2>
                <form className="flex flex-col gap-4">
                    <TextField
                        label="First Name*"
                        value={billingInfo.firstName}
                        onChange={(e) => handleOnChange('firstName', e.target.value)}
                        variant="outlined"
                    fullWidth
                    />
                    <TextField
                        label="Street Address*"
                        value={billingInfo.streetAdress}
                        onChange={(e) => handleOnChange('streetAdress', e.target.value)}
                        variant="outlined"
                        fullWidth
                    />
                    <TextField
                        label="Apartment, floor, etc. (optional)"
                        value={billingInfo.apartment}
                        onChange={(e) => handleOnChange('apartment', e.target.value)}
                        variant="outlined"
                        fullWidth
                    />
                    <TextField
                        label="Town/City*"
                        variant="outlined"
                        value={billingInfo.town}
                        onChange={(e) => handleOnChange('town', e.target.value)}
                        fullWidth
                    />
                    <TextField
                        label="Phone Number*"
                        variant="outlined"
                        value={billingInfo.phoneNumber}
                        onChange={(e) => handleOnChange('phoneNumber', e.target.value)}
                        fullWidth
                    />
                    <TextField
                        label="Email Address*"
                        variant="outlined"
                        value={billingInfo.email}
                        onChange={(e) => handleOnChange('email', e.target.value)}
                        fullWidth
                        InputProps={{ readOnly: true }}  
                    />
                </form>
                </div>

                <div className="w-full lg:w-[60%] border-[#ddd] rounded-lg p-6 bg-gray-50">
                <div className="space-y-4 overflow-auto">
                    <table className="text-nowrap">
                    <thead className="border-b-[1px] border-b-[#f5f4f4]">
                        <tr>
                            <td>Name</td>
                            <td>Count</td>
                            <td>Amount</td>
                            <td>Subtotal</td>
                        </tr>
                    </thead>
                    <tbody>
                        {billedItems.map((item, index) => (
                        <tr key={index}>
                            <td className="flex justify-start flex-row gap-5 items-center py-5 min-w-[150px]">
                                <img src={item.img} className="object-fit h-[30px] w-[30px] overflow-hidden" />
                                <span>{item.product}</span>
                            </td>
                            <td className=" min-w-[100px]">{item.quantity}</td>
                            <td className=" min-w-[200px]">ksh.{item.price}</td>
                            <td className=" min-w-[200px]">ksh.{item.quantity * item.price}</td>
                        </tr>
                        ))}
                        <tr>
                            <td colSpan={3} className="py-5">Subtotal</td>
                            <td colSpan={1}>ksh.{total}</td>
                        </tr>
                        <tr>
                            <td colSpan={3} className="py-5">Shipping</td>
                            <td colSpan={1}>{shipping > 0 ? 'ksh.' + shipping : 'Free'}</td>
                        </tr>
                        <tr>
                            <td colSpan={3} className="py-5">Total</td>
                            <td colSpan={1}>ksh.{total + shipping}</td>
                        </tr>
                    </tbody>
                    </table>

                    {/* Payment Methods */}
                    <div>
                    <div className="flex items-center gap-2">
                        <Radio
                            value="bank"
                            name="payment"
                            color="primary"
                            checked={selectedPaymentMethod === 'bank'}
                            onChange={handlePaymentMethodChange}
                        />
                        <p>Bank</p>
                        <CreditCard className="text-blue-500" />
                    </div>
                    <div className="flex items-center gap-2">
                        <Radio
                        value="mpesa"
                        name="payment"
                        color="primary"
                        checked={selectedPaymentMethod === 'mpesa'}
                        onChange={handlePaymentMethodChange}
                        />
                        <p>Mpesa</p>
                        <CreditCard className="text-blue-500" />
                    </div>
                    <div className="flex items-center gap-2">
                        <Radio
                        value="cashOnDelivery"
                        name="payment"
                        color="primary"
                        checked={selectedPaymentMethod === 'cashOnDelivery'}
                        onChange={handlePaymentMethodChange}
                        />
                        <p>Cash on delivery</p>
                        <LocalShipping className="text-blue-500" />
                    </div>
                    </div>

                    <div className="flex flex-wrap lg:flex-nowrap gap-2">
                    <TextField label="Coupon Code" variant="outlined" size="small" className="w-full lg:min-w-[65%]" />
                    <Button variant="contained" color="error" className="w-full lg:w-auto text-nowrap">
                        Apply Coupon
                    </Button>
                    </div>
                    {billedItems.length > 0 &&<button onClick={orderStatus === false ?handlePaymentRequests: null} className={`${orderStatus ? 'bg-green-600 cursor-not-allowed': 'bg-red-600 cursor-pointer'} mt-4 w-full text-white rounded-sm  py-2`}>
                        {paymentLoading ? 'Redirecting...': orderStatus ? 'OrderPlaced' :'Place Order'}
                    </button>}
                </div>
                </div>
            </div>
        </div>
    );
};

export default Billing;
