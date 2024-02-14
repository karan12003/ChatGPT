import React from 'react'
import toggle from '../assets/sidebar.svg'
import '../App.css'

function Navbar() {
  return (
    <div className="flex justify-between items-center px-5 py-2">
      <div className="toggle w-6 block md:hidden">
        <img src={toggle} />
      </div>
        <p className="font-bold text-lg flex items-center gap-1">ChatGPT <span className="text-[#676767] ">3.5 </span><i className='text-[var(--text-sec)] text-[0.6rem] fa-solid fa-chevron-down'></i></p>   
        <p onClick={()=>navigator.clipboard.writeText(window.location.href)} className='border-[0.05px] border-[#bdbdbd] px-3 p-2 text-sm rounded-xl cursor-pointer hover:border-[#676767] '><i className="fa-solid fa-upload"></i></p>   
    </div>
  )
}

export default Navbar
