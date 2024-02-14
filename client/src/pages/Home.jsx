import React, { useState } from 'react';
import logo from '../assets/logo.svg'
import { useSelector } from 'react-redux';
import Card from '../components/Card';

export default function Home() {

    return (

        <div className="w-full max-w-[45rem] h-[78vh] flex flex-col gap-5 items-center justify-between">
            <div className="w-full max-w-[45rem] h-[50vh] flex flex-col gap-5 items-center justify-center">
                <div className="w-8">
                    <img src={logo} />
                </div>
                <p className="text-2xl font-bold">How can I help you today?</p>
            </div>

            <div className="grid grid-cols-2 w-full gap-2">
                <Card title="Explain options trading" body="in layman language" />
                <Card title="Create personal webpage for me" body="after asking three questions" />
                <Card title="Write a text" body="inviting relatives to barbecque" />
                <Card title="Help me study" body="vocabulary for a college exam" />
            </div>
        </div>
    )
}