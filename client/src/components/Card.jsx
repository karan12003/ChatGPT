import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setChats } from '../store/chats'
import { useNavigate } from 'react-router-dom'

function Card({title,body}) {

  const [apiKey, setApiKey] = useState("")
  const dispatch=useDispatch()
const navigate=useNavigate()
  
  const chats = useSelector(state=>state.chats)

  const handleClick=()=>{
    axios.post("https://api.openai.com/v1/chat/completions",
      {
        model: "gpt-3.5-turbo-1106",
        messages: [{ role: "user", content: title +' ' + body }],
      },
      {
        headers: {
          'Content-type': 'application/json',
          'Authorization': `Bearer ${apiKey}`
        }
      }
    )
      .then(res => {
       
          axios.post(`http://localhost:5000/chat`, {
            "title":title
            ,"messages": [
              {
                "class": "user",
                "content": title +' ' + body
              },
              {
                "class": "assistant",
                "content": res.data.choices[0].message.content
              }
            ]
          })
            .then(res => {
              dispatch(setChats([...chats,res.data.chat]))
              navigate(`/chat/${res.data.chat.id}`)
            })
            .catch(err => console.log(err))
        
      })
      .catch(err => console.error(err))
}

useEffect(()=>{
  axios.get(`http://localhost:5000/apikey`)
      .then((res) => setApiKey(res.data.apiKey))
      .catch(err => console.error(err))
},[])

  return (
    <div onClick={handleClick} className="card hover:bg-[#ECECEC] flex w-full items-center justify-between gap-4 border-[0.05px] border-[#9ba29b77] px-4 py-3 text-sm rounded-lg cursor-pointer hover:border-[#bdbdbd]">
      <div className="text-left overflow-hidden">
            <p className="font-bold text-[0.85rem] whitespace-nowrap">{title}</p>
            <p className="text-[var(--span)] text-[0.85rem] font-medium  whitespace-nowrap">{body}</p>
      </div>
      <button className={`arrow px-[0.45rem] text-sm py-1 rounded-lg bg-white hidden`}><i className="fa-solid fa-arrow-up cursor-pointer"></i></button>

    </div>
  )
}

export default Card
