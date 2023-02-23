import React, { useState } from 'react'
export interface Message{
    img:string;
    pseudo:string;
    message:string;
    dateCreated:string;
}
interface ChatListProps{listMessages:Message[]}

export default function ChatList(props:ChatListProps) {
   
    return (
    <div className='h-80 p-2 flex flex-col items-start'>
        {props.listMessages.map((msg, i) =>(
            <div key={i} className='' >
                <div className='ml-2 text-[#e8e8e8]'>
                    <p>{msg.pseudo}</p>
                </div>
                <div className='border p-2 pr-4 mb-1 rounded-3xl text-white bg-[#50248d] flex items-center'>
                    <img className='rounded-full h-7 w-7 mr-2' src={`img/${msg.img}`} alt='profil' />
                    <p>{msg.message}</p>
                </div>
            </div>
        ))}
    </div>
  )
}
