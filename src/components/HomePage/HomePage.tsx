import React, { useEffect, useState } from 'react'
import Chat from './Chat/Chat'
import Header from './Header/Header'
import io from 'socket.io-client'
import { Message } from './Chat/ChatList/ChatList'

export default function HomePage() {
    const [listMessages, setListMessages] = useState<Message[]>([])
    const [socket, setSocket] = useState<any>(null)
    const [activeChaton, setActiveChaton] = useState<string>('cat1.jpg')
    const [username, setUsername] = useState<string>('Anonymous')

    const refreshData = (data: any) => {
        setListMessages([...listMessages, ...data])
    }
    if (socket) {
        socket.on('init-data', (data: any) => {
            refreshData(data)
        })
        socket.on('message', (data: any) => {
            refreshData([data])
        })
    }
    useEffect(() => {
        const socket = io('http://localhost:3001')
        setSocket(socket)
    }, [])
    console.log(listMessages)
    return (
        <div className="bg-[#3d393e] h-screen">
            <div className="homepage-header">
                <Header activeChaton={activeChaton} 
                        setActiveChaton={setActiveChaton}
                        username={username}
                        setUsername={setUsername}/>
            </div>
            <div>
                <Chat socket={socket} listMessages={listMessages} activeChaton={activeChaton} username={username}/>
            </div>
        </div>
    )
}
