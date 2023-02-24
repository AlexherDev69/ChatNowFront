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
        <div>
            <div>
                <ChatList listMessages={props.listMessages} />
            </div>
            <div>
                <ChatSend socket={props.socket} activeChaton={props.activeChaton} username={props.username} />
            </div>
        </div>
    )
}
