'use client';

import { useState } from "react";
import { Message } from "@/app/interfaces/Message";
import axios from "axios";

export default function Home() {
    const [inputMessage, setInputMessage] = useState<string>('');
    const [messages, setMessages] = useState<Message[]>([]);

    const changeMessageHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        // デバック用
        console.log(e.target.value);
        // テキストボックスのデータを inputMessage に設定
        setInputMessage(e.target.value);
    };

    const sendHandler = async () => {
        if (inputMessage.trim() === '') return;

        const message: Message = { sender: 'user', content: inputMessage };
        setMessages(prevMessages => [message, ...prevMessages]);

        const uri = "/api/chat";
        const response = await axios.post(uri, message);
        console.log(response)
        const botMessage: Message = response.data.bot;
        setMessages(prevMessages => [botMessage, ...prevMessages]);

        setInputMessage('');
    };

    return (
        <main className="flex flex-col justify-center">
            <div className="bg-white shadow-md p-4 z-10">
                <h1 className="text-2xl p-5">Gemini Chatbot</h1>
                <div className="flex">
                    <input
                        onChange={changeMessageHandler}
                        value={inputMessage}
                        type="text"
                        className="w-full p-2 border border-gray-300 rounded-l mr-0"
                        placeholder="Type your message..."
                    />
                    <button className="w-1/6 bg-blue-500 text-white p-2 rounded-r"
                        onClick={sendHandler}
                    >
                        Send
                    </button>
                </div>
            </div>

            {/* メッセージ繰り返し　 */}
            <div className="p-4 mt-50 mb-4 overflow-y-scroll">
                {messages && messages.map((message, index) => (
                    <div
                        key={index}
                        className="m-3 p-5 border border-gray-100 rounded">
                        <span className={
                            `inline-block mb-2 me-3 px-3 py-1
                                rounded-full text-white
                                text-sm font-semibold
                                ${message.sender === 'user' ? 'bg-blue-600' : 'bg-gray-600'}
                            `}>
                            {message.sender === 'user' ? 'あなた' : 'ボット'}
                        </span>
                        <span>{message.content}</span>
                    </div>
                ))}
            </div>
        </main>
    );
}