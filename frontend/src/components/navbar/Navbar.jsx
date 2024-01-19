import React from 'react';
import logo from '../../assets/logo.svg'
import user from '../../assets/user.png'

export default function Navbar({handleClick}) {

    return (
        <>
            <div className="flex items-center justify-between px-[2rem] sm:px-[3rem] py-[.75rem] bg-[#1E1F26]">
                <div className="w-[30%]" onClick={handleClick}>
                    <img src={logo} className='w-[1.4rem] text-[#B7B8B9]' />
                </div>
                <div className="w-[20rem] hidden sm:flex justify-between items-center border-[.15rem] border-[#414C5C] bg-[#1A2232] py-[.5rem] px-[1.5rem] rounded-[2rem]">
                    <input type="search" placeholder="Search anything..." className='text-[#414C5C] w-full bg-transparent outline-none border-none' />
                    <i className="fa-solid fa-magnifying-glass px-[0.5rem] text-[#5C6A78]"></i>
                </div>
                <div className="flex items-center justify-end gap-[2rem] w-auto sm:w-[30%]">
                    <i className="fa-regular fa-bell cursor-pointer"></i>
                    <div className="flex items-center gap-[.5rem] cursor-pointer">
                        <img src={user} className="w-[2.5rem] rounded-[50%] " />
                        <i className="fa-solid fa-chevron-down text-[1rem]"></i>
                    </div>
                </div>
            </div>
        </>
    )
}