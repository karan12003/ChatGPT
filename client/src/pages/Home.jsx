import React, { useState } from 'react';
import logo from '../assets/logo.svg'
import { useSelector } from 'react-redux';
import Card from '../components/Card';

export default function Home() {

    return (

        <div className="w-full max-w-[45rem] h-[76vh] 2xl:h-[85vh] flex flex-col gap-5 items-center justify-between relative">
            <div className="w-full max-w-[45rem] h-[50vh] flex flex-col gap-5 items-center justify-center">
                <div className="w-8">
                    <img src={logo} />
                </div>
                <p className="text-2xl font-bold">How can I help you today?</p>
            </div>

            <div className="grid grid-cols-1 xs:grid-cols-2 w-[94%] md:w-[85%] lg:w-[90%] 2xl:w-full gap-2 absolute bottom-1 xl:bottom-[46px]">
                <Card title="Explain options trading" body="in layman language" />
                <Card title="Create personal webpage for me" body="after asking three questions" />
                <Card title="Write a text" body="inviting relatives to barbecque" />
                <Card title="Help me study" body="vocabulary for a college exam" />
            </div>
        </div>
    )
}