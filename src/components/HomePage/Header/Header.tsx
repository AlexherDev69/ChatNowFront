import React from 'react'

import { BsThreeDots } from 'react-icons/bs';


export default function Header() {
  return (
    <div className='text-white' >
      <div className='nav flex justify-between items-center px-3'>
        <div className='nav-logo  flex-1'>
          <img className='w-10' src='img/logo.png' alt='logo' />
        </div>
        <div className='nav-username flex-1'>
          <h1 className='font-bold text-3xl text-center pt-1'>AGOUHAa</h1>
        </div>
        <div className='nav-settings flex-1 justify-end flex-row'>
          <BsThreeDots className='ml-auto' />
        </div>
      </div>
      <div className='border-t-4 border-b-4 border-[#59535a]'>
        <img src='img/cat1.jpg' alt='cat' />
      </div>
    </div>
  )
}
