'use client'

import React, { useEffect, useState } from 'react';
import Navbar from '@/app/components/Navbar';
import axios from 'axios';
import { useSession } from 'next-auth/react';
import Link from 'next/link';


const Dashboard = () => {
  

  const { data: session } = useSession()
  const id = session?.user?.id
  const [user, setUser] = useState(null)
  
  useEffect(() => {
    if (id) { // Fetch user only if id is available
      fetchUser();
    }
  }, [id]); 

  const fetchUser = async () => {
    try{
      const res = await axios.get(`/api/test/${id}`)
      setUser(res.data)
    } catch (error){
      console.log(error)
    }
  }

  return (
    <div>
        <Navbar />
        <div className='py-[8rem] px-6 text-black w-full '>
          <div className='flex flex-col max-w-[500px] py-6 mx-auto justify-center items-center shadow-md shadow-stone-800 rounded-lg'>
            <h2 className='text-lg md:text-2xl uppercase mb-6 font-semibold'>
              15minute workout plan with AI
            </h2>
            <h4 className='capitalize text-sm mb-4 font-medium'>user name:  
              <span
                className='ml-2 text-sm font-normal'
              >
                {session?.user?.name}
              </span>
            </h4>
            {user && ( // Check if user data is available
            <table className='max-w-[300px] sm:min-w-[300px] capitalize mb-6 shadow-gray-500'>
              <tr className='bg-gray-50 border-b-2 border-gray-200'>
                <td className='p-3 text-sm text-gray-700'>plan name:</td> 
                <td className='p-3 text-sm text-gray-700'>{user.planName}</td>
              </tr>
              <tr className='bg-white'>
                <td className='p-3 text-sm text-gray-700'>Date of birth:</td> 
                <td className='p-3 text-sm text-gray-700'>{user.dob}</td>
              </tr>
              <tr className='bg-gray-50 border-b-2 border-gray-200'>
                <td className='p-3 text-sm text-gray-700'>height:</td> 
                <td className='p-3 text-sm text-gray-700'>{user.height}</td>
              </tr>
              <tr className='bg-white'>
                <td className='p-3 text-sm text-gray-700'>weight:</td> 
                <td className='p-3 text-sm text-gray-700'>{user.weight}</td>
              </tr>
              <tr className='bg-gray-50 border-b-2 border-gray-200'>
                <td className='p-3 text-sm text-gray-700'>weekly activity:</td> 
                <td className='p-3 text-sm text-gray-700'>{user.weekly}</td>
              </tr>
            </table>
            )}
            <button 
              className='text-white bg-stone-950 hover:bg-stone-800 px-4 py-1 rounded-lg'
              type='button'
            >
              <Link href={`/dashboard/form1`} >
              ADD
              </Link>
            </button>

          </div>
        </div>
    </div>
  )
}

export default Dashboard