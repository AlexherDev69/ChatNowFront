import { useRef, useState } from 'react'
import Spinner from '../../../Spinner'

export interface Message {
    img: string
    pseudo: string
    message: string
    dateCreated: string
}
interface ChatListProps {
    error: string
    getMoreMessages: () => void
    loading: boolean
    listMessages: Message[]
    username: string
}

export default function ChatList(props: ChatListProps) {
    const parentDivRef = useRef<HTMLDivElement>(null)

    const handleScroll = () => {
        // Check if the user has scrolled to the top of the div
        if (parentDivRef.current!.scrollTop === 0) {
            props.getMoreMessages()
        }
    }

    const [showFullMessage, setShowFullMessage] = useState<{[key: number]: boolean}>({})

    const MAX_MESSAGE_LENGTH = 100;

    const handleMessageDisplay = (message:string, i:number) => {
        if (message.length <= MAX_MESSAGE_LENGTH || showFullMessage[i]) {
            return message.trim()
        } else {
            return message.slice(0, MAX_MESSAGE_LENGTH).trim() + '...';
        }
    };

    const handleShowFullMessage = (i:number) => {
        setShowFullMessage({...showFullMessage, [i]: true})
    }

    return (
        <div className="overflow-y-scroll p-2 relative" onScroll={handleScroll} ref={parentDivRef}>
            {props.loading && <Spinner className="mx-auto w-min" />}
            {props.error && <p className="text-red-500">{props.error}</p>}
            {props.listMessages.map((msg, i) => (
                <div key={i}>
                    <div className="ml-2 text-[#e8e8e8]">
                        <p>{msg.pseudo}</p>
                    </div>
                    <div
                        className={`border p-2 pr-4 mb-1 rounded-3xl text-white flex items-center ${
                            props.username === msg.pseudo ? 'bg-black' : 'bg-[#50248d]'
                        }`}
                    >
                        <img className="rounded-full h-7 w-7 mr-2" src={`img/${msg.img}`} alt="profil" />
                        <pre className="whitespace-pre-wrap">{handleMessageDisplay(msg.message, i)}</pre>
                        {msg.message.length > MAX_MESSAGE_LENGTH && !showFullMessage[i] &&
                            <button className='ml-2 hover:underline text-blue-400 focus:outline-none' onClick={() => handleShowFullMessage(i)}>Voir plus</button>
                        }
                    </div>
                </div>
            ))}
            <div className="absolute bottom-0"></div>
        </div>
    )
}
