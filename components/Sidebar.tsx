import React from 'react'
import Link from 'next/link'
import { BotMessageSquare, PencilLine, SearchIcon } from 'lucide-react'

function Sidebar() {
    return (
        <div className='bg-white text-white p-5'>
            <ul className='gap-5 flex lg:flex-col'>
                <li className='flex-1'>
                    <Link
                        className='hover:opacity-50 flex flex-col text-center lg:text-left lg:flex-row
                items-center gap-2 p-5 bg-[#2991ee] rounded-md'
                        href="/create-chatbot">
                        <BotMessageSquare className='h-6 w-6 lg:h-8 lg:w-8' />
                        <div className='hidden md:inline-block'>
                            <p className='text-lg'>Create</p>
                            <p className='text-sm font-extralight'>New ChatBot</p>
                        </div>
                    </Link>
                </li>
                <li className='flex-1'>
                    <Link
                        className='hover:opacity-50 flex flex-col text-center lg:text-left lg:flex-row
                    items-center gap-2 p-5 bg-[#2991ee] rounded-md'
                        href="/view-chatbots">
                        <PencilLine className='h-6 w-6 lg:h-8 lg:w-8' />
                        <div className='hidden md:inline-block'>
                            <p className='text-lg'>Edit</p>
                            <p className='text-sm font-extralight'>ChatBots</p>
                        </div>
                    </Link>
                </li>
                <li className='flex-1'>
                    <Link
                        className='hover:opacity-50 flex flex-col text-center lg:text-left lg:flex-row
                items-center gap-2 p-5 bg-[#2991ee] rounded-md'
                        href="/review-sessions">
                        <SearchIcon className='h-6 w-6 lg:h-8 lg:w-8' />
                        <div className='hidden md:inline-block'>
                            <p className='text-lg'>View</p>
                            <p className='text-sm font-extralight'>Sessions</p>
                        </div>
                    </Link>
                </li>
            </ul>
        </div>
    )
}

export default Sidebar