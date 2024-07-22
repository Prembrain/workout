'use client'

import React from 'react'
import { useState } from 'react'
import { useSession } from 'next-auth/react'
import axios from 'axios'
import { useRouter } from 'next/navigation'

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
    


    const handleSubmit = async (e) => {
        e.preventDefault();
        try{
            await axios.put(`/api/test/${id}`, formData)
            router.push('/')
        } catch (error){
            console.log('error', error)
            alert('something went wrong')
        }
    }

    return(
        <div>
            <h1 className='text-3xl text-red-500'>Form1{id}</h1>
            <form className='space-y-1' onSubmit={handleSubmit}>
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
                        />
                    </div>
                </div>

                <div>
                <button
                  type="submit"
                  className="flex w-20 justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Submit
                </button>
              </div>
            </form>
        </div>
    )
}