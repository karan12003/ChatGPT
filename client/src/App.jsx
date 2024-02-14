import { useDispatch, useSelector } from 'react-redux'
import Home from './pages/Home'
import axios from 'axios'
import { setChats } from './store/chats';
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';
import { Outlet, useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

export default function App() {

  const [input, setInput] = useState("")
  const [apiKey, setApiKey] = useState("")

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { id } = useParams()

  const chats = useSelector(state=>state.chats)

  const getChats = () => {
    axios.get('http://localhost:5000/chat')
      .then(res => dispatch(setChats(res.data.chats)))
      .catch(err => console.log(err))
  }

  const handleClick = () => {

    axios.post("https://api.openai.com/v1/chat/completions",
      {
        model: "gpt-3.5-turbo-1106",
        messages: [{ role: "user", content: input }],
      },
      {
        headers: {
          'Content-type': 'application/json',
          'Authorization': `Bearer ${apiKey}`
        }
      }
    )
      .then(res => {
        if (id) {
          axios.patch(`http://localhost:5000/chat/${id}`, {
            "messages": [
              {
                "class": "user",
                "content": input
              },
              {
                "class": "assistant",
                "content": res.data.choices[0].message.content
              }
            ]
          })
            .then(res => {
              setInput("")
            })
            .catch(err => console.log(err))
        }
        else{
          axios.post(`http://localhost:5000/chat`, {
            "title":"New Chat"
            ,"messages": [
              {
                "class": "user",
                "content": input
              },
              {
                "class": "assistant",
                "content": res.data.choices[0].message.content
              }
            ]
          })
            .then(res => {
              setInput("")
              dispatch(setChats([...chats,res.data.chat]))
              navigate(`/chat/${res.data.chat.id}`)
            })
            .catch(err => console.log(err))
        }
      })
      .catch(err => console.error(err))
  }

  const getApiKey = () => {
    axios.get(`http://localhost:5000/apikey`)
      .then((res) => setApiKey(res.data.apiKey))
      .catch(err => console.error(err))
  }

  useEffect(() => {
    getChats()
    getApiKey()

    const btn = document.querySelector(".sendBtn")
    window.addEventListener('keydown',(e)=>{
      if (e.key==='Enter'){
        btn.click()
      }
    })

  }, [setInput])

  return (
    <>
      <div className="flex max-h-screen overflow-hidden">
        <Sidebar />
        <div className="w-[calc(100vw-16.25rem)] flex flex-col">
          <Navbar />
          <div className='h-full text-center flex flex-col items-center w-full relative'>
            <Outlet />
            <div className="fixed flex flex-col items-center w-full bottom-2">
              <div className="flex items-center gap-2 border-[0.05px] border-[#9ba29b77] bg-white px-4 py-3 rounded-xl w-full max-w-[47.5rem]">
                <textarea rows="1" className=" w-[97.5%] resize-none outline-none" type="text" onChange={e => setInput(e.target.value)} value={input} placeholder="Message ChatGPT..." />
                <button onClick={handleClick} className={`sendBtn text-white px-[0.57rem] text-[0.95rem] py-1 rounded-lg ${input !== "" ? "bg-black" : "bg-[#e5e5e5]"}`} disabled={input !== "" ? false : true}><i className="fa-solid fa-arrow-up cursor-pointer"></i></button>
              </div>
              <p className="text-[#676767] text-xs font-normal pt-2">ChatGPT can make mistakes. Consider checking important information.</p>
            </div>
          </div>
        </div>
      </div>

    </>
  )
}
