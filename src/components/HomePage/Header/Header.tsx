import React, { useState, useContext } from 'react'

import { BsThreeDots } from 'react-icons/bs'
import { FiEdit2 } from 'react-icons/fi'
import { AiOutlineCheck } from 'react-icons/ai'
import { UserContext } from '../../../context/UserContext'

const listChatons = ['cat1.jpg', 'cat2.jpg', 'cat3.jpg', 'cat4.jpg']

export default function Header() {
    const {user, setUserImage, setUserUsername} = useContext(UserContext)
    const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false)
    const [isEditable, setIsEditable] = useState<boolean>(false)
    const [inputValue, setInputValue] = useState<string>(user.username)

    function handleMenuClick() {
        setIsMenuOpen(!isMenuOpen)
    }

    function handleEditClick() {
        setIsEditable(true)
    }

    function handleConfirmClick() {
        setIsEditable(false)
        setUserUsername(inputValue)
    }

    const handleChangeInputValue = (e: any) => {
        const newUsername = e.target.value
        setInputValue(newUsername)
    }

    const handleImgClick = (e: any) => {
        const imageSrc = e.target.getAttribute('src')
        const imageName = imageSrc.substring(imageSrc.lastIndexOf('/') + 1)
        setUserImage(imageName)
    }

    

    return (
        <div className="text-white flex flex-col flex-1 lg:order-3">
            <div className="nav flex justify-between items-center px-3">
                <div className="nav-logo flex-1">
                    <img className="w-10" src="img/logo.png" alt="logo" />
                </div>
                <div className="nav-username flex justify-between">
                    {isEditable ?
                        <input
                            className="bg-[#59535a] text-white text-center"
                            value={inputValue}
                            onChange={handleChangeInputValue}
                        ></input> 
                        : <h1 className="bg-[#3d393e] text-white text-center text-xl">{user.username}</h1>         
                    }
                    {isEditable ? <AiOutlineCheck className="ml-2 mt-1" onClick={handleConfirmClick} /> : <FiEdit2 className="ml-2 mt-1" onClick={handleEditClick} />}
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

            <div className={`border-t-4 border-b-4 border-[#59535a] bg-center bg-cover h-[40vh] lg:flex-1`} style={{ backgroundImage: `url(/img/${user.image})` }}>
            </div>
        </div>
    )
}
