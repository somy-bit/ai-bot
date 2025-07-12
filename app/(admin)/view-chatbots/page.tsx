export const dynamic = "force-dynamic"

import Avatar from '@/components/Avatar'
import { Button } from '@/components/ui/button'
import { Chatbot, JoinChatbot } from '@/types/types'
import { auth } from '@clerk/nextjs/server'
import Link from 'next/link'
import React from 'react'
import { toast } from 'sonner'

async function page() {

    console.log("view page")
    const { userId } = await auth()
    if (!userId) return;

    console.log("view send req")
    const results = await fetch(`http://localhost:3000/api/mysql/assistly/chatbots?id=${userId}`, { method: "GET" })

    const chatbots = await results?.json() as Record<string, JoinChatbot>
    console.log('data fetched from composed', chatbots)


    if (results.status == 500) return


    return (
        <div className='flex-1 pb-20 p-10'>
            <h1 className='text-xl lg:text-3xl font-semibold mb-5'>
                Active Chatbots

            </h1>
            {
                chatbots == null && (
                    <div>
                        <p>
                            you have not created any chatbots yet
                            click the kink below to create one
                        </p>
                        <Link href="/create-chatbot">
                            <Button className='bg-[#64b5f5] text-white p-3 rounded-md mt-5'>
                                create chatbot
                            </Button>
                        </Link>
                    </div>
                )
            }

            <ul className='flex flex-col space-y-5'>
                {chatbots && Array.from(Object.entries(chatbots)).map(([key, value]) => (

                    <Link key={key} href={`/edit-chatbot/${value.id}`}>
                        <li className='relative p-10 border rounded-md bg-white max-w-3xl'>
                            <div className='flex justify-between items-center'>
                                <div className='flex items-center space-x-4'>
                                    <Avatar seed={value.name} />
                                    <h2 className='text-lg font-bold'>{value.name}</h2>
                                </div>
                                <p className='absolute top-5 right-5 text-sm text-gray-400'>
                                    Created: {new Date(value.created_at).toLocaleString()}
                                </p>
                            </div>

                            <hr className='mt-2' />
                            <div className='grid grid-cols-2 gap-10 md:gap-5 p-5'>
                                <h3 className='italic'>Characteristics:</h3>

                                {!value.chars[0] &&
                                    <p className='text-gray-700 font-extralight'>This bot has no characteristics yet</p>
                                }
                                <ul className='text-xs'>
                                    {value.chars[0] && value.chars?.map((char, index) => (
                                        <li
                                            className='list-disc break-words'
                                            key={index}>{char}</li>
                                    ))}
                                </ul>

                            </div>

                        </li>
                    </Link>
                    
                ))}
            </ul>
        </div>
    )
}

export default page