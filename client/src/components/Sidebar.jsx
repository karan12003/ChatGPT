import React from 'react'
import logo from '../assets/logo.svg'
import stars from '../assets/stars.svg'
import user from '../assets/dp.jpg'
import { useDispatch, useSelector } from 'react-redux';
import '../App.css'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { setChats } from '../store/chats';

function Sidebar() {

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const chats = useSelector(state => state.chats)

  const handleClick = (id) => {
    navigate(`/chat/${id}`)
  }

  const removeChat = (id) => {
    axios.delete(`http://localhost:5000/chat/${id}`)
      .then(res => {
        navigate("/")
        dispatch(setChats(chats.filter(chat => chat.id !== id)))
      })
      .catch(err => console.log(err))
  }

  const copyURL = () => {
    navigator.clipboard.writeText(window.location.href)
  }

  const close = () => {
    const sidebar = document.querySelector(".sidebar")
    sidebar.classList.remove('active')
    document.querySelector(".fa-xmark").style.display='none'

  }

  return (
    <div className="sidebar fixed md:relative z-50 bg-[var(--side-bg)] text-[var(--text)] font-semibold text-sm w-[16.25rem] flex flex-col py-[12px] px-2 h-screen">

      <div onClick={() => navigate("/")} className="flex items-center justify-between cursor-pointer hover:bg-[#202123] py-2 px-4 rounded-xl">
        <div className="flex gap-2 items-center">
          <div className="w-[1.75rem] bg-white rounded-[50%] p-[0.35rem] overflow-hidden ">
            <img src={logo} />
          </div>
          <p>New chat</p>
        </div>
        <i className="fa-regular fa-pen-to-square"></i>
      </div>

      <div className="text-white h-[75vh] overflow-y-auto overflow-x-hidden font-medium flex flex-col py-3" >

        <div className="py-2 px-4 text-[var(--text-sec)] text-[0.75rem]">Previous 30 Days</div>

        {
          chats?.map((chat, index) => (
            <div onClick={() => handleClick(chat.id)} className="cursor-pointer hover:bg-[#202123] rounded-xl py-2 px-4 flex items-center justify-between side-bar" key={index} id={chat.id}>
              <p className='whitespace-nowrap overflow-hidden w-[80%] '>{chat.title}</p>
              <div className="items-center side-chat hidden">
                <div className="bg-transparent side-menu">
                  <i className="text-[1rem] fa-solid fa-ellipsis bg-transparent px-2" />
                  <div className="absolute z-50 bg-[var(--side-bg)] p-2 w-[10rem] flex-col rounded-xl side-list hidden ">
                    <p onClick={() => copyURL(chat.id)} className="flex items-center gap-2 hover:bg-[#202123] p-2 rounded-xl"><i className="fa-solid fa-upload"></i> Share</p>
                    <p className="flex items-center gap-2 hover:bg-[#202123] p-2 rounded-xl"><i className="fa-solid fa-pencil"></i> Rename</p>
                    <p onClick={() => removeChat(chat.id)} className="flex items-center gap-2 hover:bg-[#202123] p-2 rounded-xl"><i className="fa-regular fa-trash-can" /> Delete Chat</p>
                  </div>
                </div>
                <div onClick={() => removeChat(chat.id)} className="bg-transparent"><i className="text-[0.8rem] fa-solid fa-box-archive bg-transparent"></i></div>
              </div>
            </div>
          ))
        }

      </div>

      <div className="flex gap-2 items-center py-2 px-4 cursor-pointer hover:bg-[#202123] rounded-xl">
        <div className="w-8 rounded-[50%] overflow-hidden p-[0.5rem] bg-black ">
          <img src={stars} />
        </div>

        <div className="">
          <p>Upgrade plan</p>
          <p className="text-[var(--text-sec)] text-[0.7rem] font-medium " >Get GPT-4, DALL·E, and more</p>
        </div>
      </div>

      <div className="flex gap-2 items-center py-2 px-4 cursor-pointer hover:bg-[#202123] rounded-xl">
        <div className="w-8 rounded-[50%] overflow-hidden ">
          <img src={user} />
        </div>
        <p>Karan Jot Singh</p>
      </div>

      <i onClick={close} className="hidden fa-solid fa-xmark border-2 border-black px-3 py-1 absolute right-0 text-base translate-x-11 cursor-pointer translate-y-1 text-black"></i>

    </div>
  )
}

export default Sidebar
