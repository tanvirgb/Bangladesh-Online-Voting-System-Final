import Link from 'next/link'
import React from 'react'

function Nav() {
  return (
    <div className='px-5 text-bold text-xl my-10'>
        <div className='flex flex-col gap-3'>
            <Link
            className='border-b-[1px] border-gray-50 hover:bg-yellow-500 ' href='/'>
                Home
            </Link>
            <Link
            className='border-b-[1px] border-gray-50 hover:bg-cyan-400' href="/candidate_details">
                Profile
            </Link>
            <Link
            className='border-b-[1px] border-gray-50 hover:bg-blue-400' href='/settings'>
                Settings
            </Link>
            <Link
            className='border-b-[1px] border-gray-50 hover:bg-green-500' href='/dash'>
                Dashboard
            </Link>
            <Link
            className='border-b-[1px] border-gray-50 hover:bg-orange-300' href='/about'>
                About Us
            </Link>
            <Link
            className='border-b-[1px] border-gray-50 hover:bg-blue-800' href='/details'>
                Details
            </Link>

        </div>
      
    </div>
  )
}

export default Nav
