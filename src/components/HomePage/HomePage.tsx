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
        setListMessages([...data, ...listMessages])
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
        const socket = io(process.env.REACT_APP_SOCKET_URL!, {
            transports: ['websocket'],
            secure: true,
            rejectUnauthorized: true, // Set to true if your SSL/TLS certificate is valid
        })
        setSocket(socket)
    }, [])

    return (
        <div className="bg-[#3d393e] h-screen">
            <div className="homepage-header">
                <Header activeChaton={activeChaton}
                    setActiveChaton={setActiveChaton}
                    username={username}
                    setUsername={setUsername} />
            </div>
            <div>
                <Chat socket={socket} listMessages={listMessages} activeChaton={activeChaton} username={username} />
            </div>
        </div>
    )
}
