import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import logo from "../assets/greenlogo.svg"
import dp from '../assets/DP.jpg'

function Chat() {

    const { id } = useParams();
    const [messages, setMessages] = useState([])

    const getChat = () => {
        axios.get(`http://localhost:5000/chat/${id}`)
            .then(res => setMessages(res.data.chat.messages.reverse()))
            .catch(err => console.log(err))
    }

    const dislike = (index) => {
        const msg = document.getElementById(`dislike#${index}`)
        msg.classList.contains("fa-solid") ? msg.classList.remove("fa-solid") : msg.classList.add("fa-solid")
    }

    useEffect(() => {
        getChat()
    }, [id, messages])

    return (
        <div className="w-full max-w-[45rem] overflow-y-auto overflow-x-hidden h-[78vh] text-left p-4 flex flex-col-reverse gap-4">

            {
                messages.map((msg, index) => (
                    <div className={`${msg.class}`} key={index}>
                        <div className="flex items-center gap-3">
                            <div className="w-[1.625rem]">
                                <img src={msg.class === 'user' ? dp : logo} className={msg.class !== 'user' ? 'bg-[#19C37D] border-2 rounded-[50%] border-[var(--accent)] p-[0.125rem] ' : 'rounded-[50%]'} />
                            </div>
                            <div className="font-bold text-[0.9rem] ">{msg.class === 'user' ? 'You' : 'ChatGPT'}</div>
                        </div>
                        <div className="px-10 py-">
                            <p>{msg.content}</p>
                        </div>
                        {
                            msg.class === 'user' ?
                                <div className="px-10 py-1 user-content opacity-0">
                                    <p onClick={() => navigator.clipboard.writeText(msg.content)}><i className="text-sm cursor-pointer text-[var(--span)] hover:text-[#303030] fa-solid fa-pencil"></i></p>
                                </div> :
                                <div className="px-10 py-1 gap-3 flex assistant-content opacity-0">
                                    <p onClick={() => navigator.clipboard.writeText(msg.content)}><i className="text-sm cursor-pointer text-[var(--span)] hover:text-[#303030] fa-regular fa-clipboard"></i></p>
                                    <p onClick={() => { dislike(index) }}><i id={`dislike#${index}`} className="text-sm cursor-pointer text-[var(--span)] hover:text-[#303030] fa-regular fa-thumbs-down"></i></p>
                                </div>
                        }

                    </div>
                ))
            }

        </div>

    )
}

export default Chat
