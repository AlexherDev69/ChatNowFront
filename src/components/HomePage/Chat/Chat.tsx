import ChatList, { Message } from './ChatList/ChatList'
import ChatSend from './ChatSend/ChatSend'

interface ChatProps {
    error: string;
    getMoreMessages: () => void;
    loading: boolean;
    socket: any
    listMessages: Message[]
    activeChaton: string
    username: string
}

export default function Chat(props: ChatProps) {
    return (
        <>
            <div className="flex flex-col overflow-y-hidden p-2 lg:w-[30vw]">
                <ChatList getMoreMessages={props.getMoreMessages} error={props.error} listMessages={props.listMessages} loading={props.loading} username={props.username} />
                <ChatSend socket={props.socket} activeChaton={props.activeChaton} username={props.username} />
            </div>
        </>
    )
}

