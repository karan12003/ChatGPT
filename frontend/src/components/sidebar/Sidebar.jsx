import React from 'react'
import logo from '../../assets/logo.png'

function Sidebar() {



  return (
    <div className="hidden md:flex bg-[#1A2232] flex-col items-center gap-[6rem] fixed w-[6rem] h-full">
      <div className="">
        <img src={logo} className="w-[6rem]" />
      </div>
      <div className="side flex flex-col gap-[2rem]">
        <i className="fa-solid fa-border-all"></i>
        <i className="fa-solid fa-arrow-trend-up"></i>
        <i className="fa-regular fa-message text-[#3E7952]"></i>
        <i className="fa-regular fa-image"></i>
        <i className="fa-solid fa-music"></i>
        <i className="fa-regular fa-bookmark"></i>
        <i className="fa-solid fa-arrow-right-from-bracket"></i>
      </div>
    </div>
  )
}

export default Sidebar
