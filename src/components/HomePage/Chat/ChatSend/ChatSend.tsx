import React, { useState } from 'react'
interface chatSendprops {
    socket: any
    activeChaton: string
    username: string
}

export default function ChatSend({ socket, activeChaton, username }: chatSendprops) {
    const [msg, setMsg] = useState<string>('')

    const messageHandler = (e: any) => {
        setError(false)
        setMsg(e.target.value)
    }

    const [error, setError] = useState<boolean>(false)

    const sendMessageHandler = () => {
        const reelMsg = msg.trim()
        if(reelMsg !== ''){
            setError(false)
            socket.emit('message', JSON.stringify({ img: activeChaton, pseudo: username, message: reelMsg }))
            setMsg('')
        } else {
            setError(true)
        }
    }

    const handleEnterKeyPress = (e: any) => {
        if (e.key === 'Enter') {
            sendMessageHandler()
        }
    }
    return (
        <div className="h-14 flex flex-row items-center p-2">
            <div className="flex flex-row items-center w-full border rounded-3xl h-12 px-2">
                <div className="w-full relative">
                    {error&&
                    <div className="bg-red-500 text-white rounded-md py-1 px-2 absolute top-0 transform -translate-y-full">
                       Veuillez mettre un message        
                    </div>}
                    <input
                        type="text" required
                        className="border border-transparent w-full focus:outline-none text-sm h-10 flex items-center bg-[#3d393e]"
                        placeholder="Type your message...."
                        value={msg}
                        onChange={messageHandler}
                        onKeyDown={handleEnterKeyPress}
                    />
                    
                </div>
            </div>
            <div className="ml-6">
                <button
                    className="flex items-center justify-center h-10 w-10 rounded-full bg-gray-200 hover:bg-gray-300 text-indigo-800"
                    onClick={sendMessageHandler}
                >
                    <svg
                        className="w-5 h-5 transform rotate-90 -mr-px"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                        ></path>
                    </svg>
                </button>
            </div>
        </div>
    )
}
