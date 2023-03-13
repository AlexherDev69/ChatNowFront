import { useContext, useRef, useState, useEffect } from 'react'
import { UserContext } from '../../../../context/UserContext'
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
}

export default function ChatList(props: ChatListProps) {

    const {user} = useContext(UserContext)

    const [firstMessageRender, setFirstMessageRender] = useState<boolean>(false)

    const parentDivRef = useRef<HTMLDivElement>(null)

    const handleScroll = () => {
        // Check if the user has scrolled to the top of the div
        if (parentDivRef.current!.scrollTop === 0) {
            props.getMoreMessages()
        }
    }

    const scrollDown = () => {
        const div = parentDivRef.current;
        if (div) {
            div?.scrollTo({ top: div?.scrollHeight ?? 0, behavior: 'smooth' });
        }
    }

    const listMessageChanged = () =>{
        //si un message user, on scroll en bas
        //si un message autre user, deux comportement : si on est tout en bas, ça scroll down, si on l'est pas ça scroll down pas et on alerte l'user d'un new message
        const lastMessage = props.listMessages[props.listMessages.length - 1];
        if (lastMessage){
            if(user.username === lastMessage.pseudo) {
                scrollDown()
            } else {

            }
        }   
    }

    useEffect(listMessageChanged, [props.listMessages])
    useEffect(scrollDown, []);

    
    
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
                            user.username === msg.pseudo ? 'bg-black' : 'bg-[#50248d]'
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
