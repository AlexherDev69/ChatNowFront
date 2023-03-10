import React, { useEffect, useState } from 'react'
import Chat from './Chat/Chat'
import Header from './Header/Header'
import io from 'socket.io-client'
import { Message } from './Chat/ChatList/ChatList'

export default function HomePage() {
    const [error, setError] = useState<string>("");
    const [listMessages, setListMessages] = useState<Message[]>([])
    const [loading, setLoading] = useState<boolean>(false);
    const [messageQuantity, setMessageQuantity] = useState<number | null>(null);
    const [socket, setSocket] = useState<any>(null)

    const addOldMessages = (data: Message[]) => {
        setListMessages([...data, ...listMessages])
    }

    const getMoreMessages = async () => {
        if (loading) return true;

        try {
            if (typeof messageQuantity === "number" && messageQuantity === listMessages.length) {
                setError("Vous avez lu tous les messages");
                return true;
            }

            setLoading(true);
            const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/api/messages?take=${10}&skip=${listMessages.length}`)

            const responseParsed: {
                messageQuantity?: number,
                messages?: Message[],
                message?: string,
                ok: boolean
            } = await response.json();
            setLoading(false);

            if (response.ok) {
                addOldMessages(responseParsed.messages!);
                setMessageQuantity(responseParsed.messageQuantity!);
            } else {
                setError(responseParsed.message!)
            }
        } catch (error) {
            setLoading(false);
            console.error(error);
            setError("Erreur de récupération des messages")
        }
    }

    const refreshData = (data: Message[]) => {
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
        setListMessages([])
        const socket = io(process.env.REACT_APP_SOCKET_URL!, {
            transports: ['websocket'],
            secure: true,
            rejectUnauthorized: true, // Set to true if your SSL/TLS certificate is valid
        })
        setSocket(socket)
    }, [])

    return (
        <div className="bg-[#3d393e] h-screen flex flex-col overflow-hidden lg:flex-row">
            <Header />
            <Chat
                error={error}
                getMoreMessages={getMoreMessages}
                loading={loading}
                socket={socket}
                listMessages={listMessages}
            />
        </div>
    )
}
