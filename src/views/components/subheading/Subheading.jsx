import React, { useState, useEffect } from 'react';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import EastIcon from '@mui/icons-material/East';
import Button from '../button/Button';
import { countDown } from '../../../model/countDown/countDown';
const SubHeading = ({heading, title, timer, btn, btnText, section}) => {
    const calculateTimeLeft = () => {
        const targetDate = new Date();
        targetDate.setDate(targetDate.getDate() + countDown.days);
        targetDate.setHours(countDown.hours, countDown.minutes, countDown.seconds);

        const difference = targetDate - new Date();
        let timeLeft = {};

        if (difference > 0) {
        timeLeft = {
            days: Math.floor(difference / (1000 * 60 * 60 * 24)),
            hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
            minutes: Math.floor((difference / 1000 / 60) % 60),
            seconds: Math.floor((difference / 1000) % 60),
        };
        }
        return timeLeft;
    };

    const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

    useEffect(() => {
        const timer = setInterval(() => {
        setTimeLeft(calculateTimeLeft());
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    return (
        <div className="flex  flex-col gap-2 p-4">
            <div className="flex items-center gap-2">
                <div className="w-[10px] lg:w-[20px] h-[30px] lg:h-[40px] rounded-[4px] bg-[#DB4444]"></div>
                <p className="text-[14px] text-[#DB4444] lg:text-[16px] font-[600]">{heading}</p>
            </div>
            <div className='w-full flex flex-row items-center justify-between'>
                <div className=' flex flex-col items-start gap-3 md:flex-row md:items-end md:gap-10'>
                    <h2 className="text-[22px] lg:text-[36px] font-[700]">{title}</h2>
                    {timer && <div className="flex gap-7 text-lg font-semibold">
                        <div className='flex flex-col items-center'>
                            <span className='text-[12px] font-[500]'>Days</span> 
                            <span className="text-black text-[20px] lg:text-[32px] font-[700]">{String(timeLeft.days).padStart(2, '0')}:</span>
                        </div>
                        <div className='flex flex-col items-center'>
                            <span className='text-[12px] font-[500]'>Hours</span> 
                            <span className="text-black text-[20px] lg:text-[32px] font-[700]">{String(timeLeft.hours).padStart(2, '0')}:</span>
                        </div>
                        <div className='flex flex-col items-center'>
                            <span className='text-[12px] font-[500]'>Minutes</span> 
                            <span className="text-black text-[20px] lg:text-[32px] font-[700]">{String(timeLeft.minutes).padStart(2, '0')}:</span>
                        </div>
                        <div className='flex flex-col items-center'>
                            <span className='text-[12px] font-[500]'>Seconds</span> 
                            <span className="text-black text-[20px] lg:text-[32px] font-[700]">{String(timeLeft.seconds).padStart(2, '0')}</span>
                        </div>
                    </div>}
                </div>
                <div className='hidden lg:flex flex-row gap-3'>
                    {section === 'New' ? (
                        <></>
                    ): !btn ? (
                        <>
                            <span className='flex cursor-pointer items-center justify-center h-[46px] w-[46px] rounded-full bg-[#f5f3f3]'>
                                <KeyboardBackspaceIcon fontSize='small' className='text-[#000000]' />
                            </span>
                            <span className='flex cursor-pointer items-center justify-center h-[46px] w-[46px] rounded-full bg-[#f5f3f3]'>
                                <EastIcon fontSize='small' className='text-[#000000]' />
                            </span>
                        </>
                    ):(
                        <Button value={btnText} />
                    )}
                </div>
            </div>
        </div>
    );
};

export default SubHeading;