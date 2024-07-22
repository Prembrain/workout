'use client'

import { useSession, signOut } from 'next-auth/react'


export default function Navbar() {
    const { data: session } = useSession()
  return (
    <nav className="fixed w-full bg-stone-950 py-4 px-6 z-10 shadow-md shadow-stone-300">
        <div className='flex justify-between items-center'>
          <div className='bg-white max-w-[170px] p-2 rounded-lg'>
            <img 
              className='bg-white'
              src="./logo.webp"  
              alt="smalllogo" 
            />
          </div>
            <button 
              className='text-sm text-white hover:bg-indigo-500 hover:text-white rounded-lg px-2 py-1' 
              onClick={() => signOut({ callbackUrl: '/' })}
            >
              Sign Out
            </button>
        </div>
    </nav>
  )
}
