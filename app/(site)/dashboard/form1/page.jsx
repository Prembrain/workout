'use client'

import React from 'react'
import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import Link from 'next/link';

export default function Form1(){
    const { data: session } = useSession()
    const id = session?.user?.id
    const router = useRouter()
    const [formData, setFormData] = useState({
        planName: '',
        dob: '',
        height: null,
        weight: null,
        weekly: null,
    });
    
    const fetchUser = async () => {
      try{
        const res = await axios.get(`/api/test/${id}`)
        setFormData(res.data)
      } catch (error){
        console.log(error)
      }
    }

    useEffect(() => {
        if (id) { // Fetch user only if id is available
          fetchUser();
        }
      }, [id]); 
    

    const handleSubmit = async (e) => {
        e.preventDefault();
        try{
            await axios.put(`/api/test/${id}`, formData)
            router.push('/dashboard')
        } catch (error){
            console.log('error', error)
            alert('something went wrong')
        }
    }

    return(
        <>
            <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
                <h1 className='mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900'>Information</h1>
                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    <form className='space-y-6' onSubmit={handleSubmit}>
                        <div>
                            <label htmlFor="planName">
                                Plan Name
                            </label>
                            <div>
                                <input
                                    id='planName'
                                    name='planName'
                                    type="text" 
                                    autoComplete='off'
                                    value={formData.planName}
                                    onChange={e => setFormData({ ...formData, planName: e.target.value })}
                                    required
                                    className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6' 
                                />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="dob">
                                Date of birth
                            </label>
                            <div>
                                <input 
                                    id='dob'
                                    name='dob'
                                    type="date" 
                                    autoComplete='off'
                                    value={formData.dob}
                                    onChange={e => setFormData({ ...formData, dob: e.target.value })}
                                    required
                                    className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6' 
                                />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="height">
                                Height
                            </label>
                            <div>
                                <input 
                                    id='height'
                                    name='height'
                                    type="number" 
                                    autoComplete='off'
                                    value={formData.height}
                                    onChange={e => setFormData({ ...formData, height: e.target.value })}
                                    required
                                    className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6' 
                                />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="weight">
                                Weight
                            </label>
                            <div>
                                <input 
                                    id='weight'
                                    name='weight'
                                    type="number" 
                                    autoComplete='off'
                                    value={formData.weight}
                                    onChange={e => setFormData({ ...formData, weight: e.target.value })}
                                    required
                                    className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6' 
                                />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="weekly">
                                Weekly activities
                            </label>
                            <div>
                                <input 
                                    id='weekly'
                                    name='weekly'
                                    type="number" 
                                    autoComplete='off'
                                    value={formData.weekly}
                                    onChange={e => setFormData({ ...formData, weekly: e.target.value })}
                                    required
                                    className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6' 
                                />
                            </div>
                        </div>

                        <div className='flex'>
                            <button
                                type="submit"
                                className="flex w-20 justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 mr-3"
                                >
                                Submit
                            </button>
                            <button
                                type="button"
                                className="flex w-20 justify-center rounded-md bg-stone-950 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-stone-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                >
                                <Link href={`/dashboard`} >
                                    Back
                                </Link>
                            </button>
                        </div>
                    </form>
                </div>
            </div>    
        </>
        
    )
}