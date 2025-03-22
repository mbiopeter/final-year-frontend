import React from 'react'

const Button = ({value, handleBtnClick}) => {
    return (
        <button className='rounded-[4px] bg-[#DB4444] py-2 px-6 cursor-pointer text-[16px] text-[#FAFAFA]'>{value}</button>
    )
}

export default Button
