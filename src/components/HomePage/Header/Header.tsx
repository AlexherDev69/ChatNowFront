import React, { useState } from 'react'

import { BsThreeDots } from 'react-icons/bs'
interface HeaderProps{
  activeChaton: string;
  setActiveChaton: (activeChaton:string)=>void;
  username: string;
  setUsername: (username:string)=>void;
}
export default function Header(props:HeaderProps) {
    const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false)
    const [listChatons, setListChatons] = useState(['cat1.jpg', 'cat2.jpg', 'cat3.jpg', 'cat4.jpg'])
    

    function handleMenuClick() {
        setIsMenuOpen(!isMenuOpen)
    }

    const handleImgClick = (e: any) => {
        const imageSrc = e.target.getAttribute('src')
        const imageName = imageSrc.substring(imageSrc.lastIndexOf('/') + 1)
        props.setActiveChaton(imageName)
    }

    const handleChangeUsername = (e: any) => {
        const newUsername = e.target.value
        props.setUsername(newUsername)
    }

    return (
        <div className="text-white">
            <div className="nav flex justify-between items-center px-3">
                <div className="nav-logo  flex-1">
                    <img className="w-10" src="img/logo.png" alt="logo" />
                </div>
                <div className="nav-username flex-1">
                    <input className='bg-[#59535a] text-white' defaultValue={props.username} onChange={handleChangeUsername}></input>
                    {/* <h1 className="font-bold text-3xl text-center pt-1">AGOUHA</h1> */}
                </div>
                <div className="nav-settings flex-1 justify-end flex-row">
                    <BsThreeDots className="ml-auto" onClick={handleMenuClick} />
                </div>
                {isMenuOpen && (
                    <div className="absolute top-10 right-0 mt- w-32 rounded-md shadow-lg bg-[#3d393e] ring-1 ring-black ring-opacity-5">
                        <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                            {listChatons.map((chat, i) => (
                                <img
                                    key={i}
                                    src={`img/${chat}`}
                                    alt="cat"
                                    className="transition ease-in-out hover:-translate-y-1 hover:scale-110 duration-300 w-full"
                                    onClick={handleImgClick}
                                />
                                //<a href="#" className="block px-4 py-2 text-sm  hover:bg-gray-100 hover:text-black" role="menuitem">Option 1</a>
                            ))}
                        </div>
                    </div>
                )}
            </div>
            <div className="border-t-4 border-b-4 border-[#59535a]">
                <img src={`img/${props.activeChaton}`} alt="cat" />
            </div>
        </div>
    )
}