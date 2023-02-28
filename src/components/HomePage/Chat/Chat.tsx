import ChatList, { Message } from './ChatList/ChatList'
import ChatSend from './ChatSend/ChatSend'

interface ChatProps {
    error: string;
    getMoreMessages: () => void;
    loading: boolean;
    socket: any
    listMessages: Message[]
}

export default function Chat(props: ChatProps) {
    return (
        <>
            <div className="flex flex-col overflow-y-hidden p-2 lg:w-[30vw]">
                <ChatList getMoreMessages={props.getMoreMessages} error={props.error} listMessages={props.listMessages} loading={props.loading} />
                <ChatSend socket={props.socket} />
            </div>
        </>
    )
}

