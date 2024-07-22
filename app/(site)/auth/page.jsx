'use client'

import React, {useState} from 'react'
import Register from './register/page';
import Login from './login/page';

export default function Auth(){
    const [auth , setAuth] = useState(false)

    const toggleAuthForm = () => {
        setAuth( prevAuth => !prevAuth);
    }

    return(
        <>
            <section className='w-full h-full'>
                <div className='absolute top-0 bottom-0 left-0 right-0'>
                    <div className='max-w-[900px] h-[100vh] mx-auto'>
                            {auth ? <Register toggleAuthForm = {toggleAuthForm}/> 
                                  : <Login toggleAuthForm = {toggleAuthForm}/>}
                    </div> 
                </div>
            </section>
        </>
    )
}