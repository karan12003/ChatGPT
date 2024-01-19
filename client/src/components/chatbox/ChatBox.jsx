import React, { useEffect, useState } from 'react';
import axios from 'axios'

export default function ChatBox() {

    const [chats, setChats] = useState([])
    const [chat, setChat] = useState([])
    const [message, setMessage] = useState("")
    const [apiKey,setApiKey] = useState("")

    const getApiKey = async () => {
        axios.get("http://localhost:5000/apikey")
             .then((res) => setApiKey(res.data.apiKey))
    }

    const url = "https://api.openai.com/v1/chat/completions";

    const headers = {
        'Content-type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
    };

    const data = {
        model: "gpt-3.5-turbo-1106",
        messages: [{ role: "user", content: message }],
    }

    const getChats = () => {
        axios.get("http://localhost:5000/chat")
            .then((res) => setChats(res.data.chats))
            .catch(err => console.log(err))
    }

    const getChat = (id) => {
        axios.get(`http://localhost:5000/chat/${id}`)
            .then((res) => setChat(res.data.chat.messages))
            .catch(err => console.log(err));

        const activeChats = document.querySelectorAll(".chats div.active")

        activeChats.forEach((chat) => {
            chat.classList.remove("active")
        })

        document.getElementById(id).classList.add("active")
    }

    const sendMessage = () => {

        let response = "";
        let id = "";

        axios.post(url, data, { headers: headers })
            .then((res) => {
                response = res.data.choices[0].message.content
            })
            .then(() => {

                const activeChat = document.querySelector(".chats div.active")

                if (activeChat) {
                    axios.patch(`http://localhost:5000/chat/${activeChat.id}`, {
                        "title": chat.title,
                        "messages": [
                            {
                                "class": "user",
                                "content": message
                            }
                        ]
                    })
                        .then(() => {
                            axios.patch(`http://localhost:5000/chat/${activeChat.id}`, {
                                "title": chat.title,
                                "messages": [
                                    {
                                        "class": "assistant",
                                        "content": response
                                    }
                                ]
                            }).then((res) => setChat(res.data.chat.messages))
                        })
                }
                else {
                    axios.post(`http://localhost:5000/chat`, {
                        "title": "New Chat",
                        "messages": [
                            {
                                "class": "user",
                                "content": message
                            }
                        ]
                    })
                        .then((res) => {
                            id = res.data.chat._id
                        })
                        .then((res) => {
                            axios.patch(`http://localhost:5000/chat/${id}`, {
                                "title": "New Chat",
                                "messages": [
                                    {
                                        "class": "assistant",
                                        "content": response
                                    }
                                ]
                            })
                                .then((res) => setChat(res.data.chat.messages))
                                .then(() => document.querySelector(".chats div:nth-last-child(1)").classList.add("active"))
                        })
                }
            })
            .catch(err => console.log(err));

        setMessage("")
        setChats((prev) => [...prev])
    }

    const addChat = () => {
        const activeChats = document.querySelectorAll(".chats div.active")

        activeChats.forEach((chat) => {
            chat.classList.remove("active")
        })

        setChat([])
    }

    const deleteChat = () => {
        const activeChat = document.querySelector(".chats div.active");
        activeChat.classList.remove("active")

        axios.delete(`http://localhost:5000/chat/${activeChat.id}`)
            .then((res) => setChats([...chats]))
            .then(() => setChat([]))
            .catch(err => console.log(err));


    }

    useEffect(() => {
        getChats();
    }, [chats])
    
    useEffect(() => {
        getApiKey()
    }, [])

    return (
        <div className="flex ml-0 md:ml-[5rem] transition-all px-0 sm:px-[1rem] h-[90vh]">
            <div className="historyBar fixed md:relative w-[25rem] translate-x-[-100%] md:translate-x-0 px-[2rem] py-[1rem] border-0 md:border-r-[.1rem] border-[#1A2232] flex flex-col">
                <div className="">
                    <h1 className="font-bold text-[2rem] text-white">Text Generator</h1>
                    <div className="chats flex flex-col-reverse justify-end gap-[.4rem] my-[1rem] font-bold text-[.9rem]">
                        {chats.map((chat, index) => (
                            <div key={index} id={chat._id} onClick={() => getChat(chat._id)} className="cursor-pointer flex gap-[1rem] bg-[#1A2232] py-[.8rem] px-[1.6rem] rounded-[2rem]">
                                <i className="fa-regular fa-message"></i>
                                <p>{chat.title}</p>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="flex flex-col w-full px-[2rem] translate-x-[-2rem] absolute bottom-[0%] gap-[.5rem] my-[1rem] ">
                    <div onClick={addChat} className="cursor-pointer flex items-center gap-[1rem] border-[.1rem] rounded-[3rem] p-[.8rem] font-bold border-[#3E7952] text-[#3E7952]">
                        <i className="text-[#3E7952] fa-solid fa-circle-plus"></i>
                        <p>New Chat</p>
                    </div>
                    <div onClick={deleteChat} className="cursor-pointer flex items-center gap-[1rem] border-[.1rem] rounded-[3rem] p-[.8rem] font-bold border-[#A6342F] text-[#A6342F]">
                        <i className="text-[#A6342F] fa-solid fa-delete-left"></i>
                        <p>Clear Conversation</p>
                    </div>
                </div>
            </div>
            <div className="relative w-full md:w-[74%] max-h-[90vh] m-[1rem] flex flex-col">
                <div className="messages w-full h-[80%] p-[1rem] flex flex-col overflow-y-auto gap-[1rem] m-0 md:m-[1rem]">
                    {chat.map((messages, index) => (
                        <div key={index} className={messages.class}>
                            {messages.content}
                        </div>
                    ))}
                </div>
                <div className="w-full flex items-center absolute bottom-[0%] justify-between p-[1rem] border-[.1rem] border-[#AFB0B3] rounded-[1rem]">
                    <i className="active:bg-[#5C6A78] p-[0.5rem] rounded-[50%] fa-solid fa-paperclip cursor-pointer"></i>
                    <input type="text" placeholder="Send a message" id="inputBox" className="w-[100%] text-[#AFB0B3] outline-none border-none bg-transparent" onChange={(e) => setMessage(e.target.value)} value={message} />
                    <i className="active:bg-[#5C6A78] p-[0.5rem] rounded-[50%] fa-solid fa-microphone cursor-pointer"></i>
                    <i className="active:bg-[#5C6A78] text-[#3E7952] p-[0.5rem] rounded-[50%] fa-solid fa-paper-plane cursor-pointer" onClick={sendMessage}></i>
                </div>
            </div>
        </div>
    )
}