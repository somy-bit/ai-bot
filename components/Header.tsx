import React from 'react'
import Link from 'next/link'
import Avatar from './Avatar'
import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/nextjs'

const Header = () => {
    return (
        <header className='bg-white flex  shadow-sm text-gray-700 justify-between p-5 max-w-7xl'>


            <Link href="/" className='flex items-center text-4xl font-thin space-x-2'>

                <Avatar
                    seed='Sara'
                   
                />
                <div>

                    <h1 >Assistly</h1>
                    <h2 className='text-sm '>your customable AI agent</h2>
                </div>

            </Link>

            <div className='flex items-center'>
                <SignedIn>
                    <UserButton showName/>
                </SignedIn>

                <SignedOut>
                    <SignInButton />
                </SignedOut>
            </div>


        </header>
    )
}

export default Header
