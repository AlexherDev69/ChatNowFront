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
            <div className="flex-col grow overflow-y-auto p-2">
                <ChatList listMessages={props.listMessages} username={props.username} />
            </div>
            <ChatSend socket={props.socket} activeChaton={props.activeChaton} username={props.username} />
        </>
    )
}
