import Avatar from '@/components/Avatar'
import { SignIn } from '@clerk/nextjs'
import React from 'react'


function LoginPage() {
    return (
        <div className='flex py-10 flex-col md:py-0 flex-1 justify-center items-center bg-[#64b5f5]'>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-5'>
                <div className='flex flex-col items-center justify-center space-y-5 text-white'>
                    <div className='rounded-full bg-white p-5'>
                        <Avatar seed="PAPAFAM support agent" className="h-60 w-60"/>
                    </div>
                    <div className='text-center'>
                        <h1 className='text-4xl'>Assistly </h1>
                        <h2 className='text-base font-light'> Your Customizable AI chatbot</h2>
                        <h3 className='my-5 font-bold'>Sign in to get started</h3>
                    </div>
                </div>

                <SignIn routing='hash' fallbackRedirectUrl='/'/>
            </div>
        </div>
    )
}

export default LoginPage