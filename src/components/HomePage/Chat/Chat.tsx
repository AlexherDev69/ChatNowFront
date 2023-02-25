import React from 'react'
import ChatList, { Message } from './ChatList/ChatList'
import ChatSend from './ChatSend/ChatSend'

interface ChatProps {
    socket: any
    listMessages: Message[]
    activeChaton: string
    username: string
}

export default function Chat(props: ChatProps) {
    return (
        <>
            <div className="flex flex-col overflow-y-hidden p-2 lg:w-[20vw]">
                <ChatList listMessages={props.listMessages} username={props.username} />
                <ChatSend socket={props.socket} activeChaton={props.activeChaton} username={props.username} />
            </div>
        </>
    )
}

