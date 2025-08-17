'use client'

import { Message } from '@/types/types'
import React from 'react'
import Avatar from './Avatar';
import { UserCircle } from 'lucide-react';
import { useEffect, useRef } from "react"; 


function Messages({ contents }: { contents: Message[]  }) {

   
    
    const ref = useRef<HTMLDivElement>(null) 


 

    useEffect(()=>{

        if(ref.current){
            ref.current.scrollIntoView({behavior:'smooth'})
        }

    },[contents])
  


    return (
        <div className='flex flex-1 flex-col overflow-y-auto space-y-10 py-10 px-5 bg-white rounded-lg'>
            {
            contents.length! > 0 &&
            contents.map((mes, index) => {
                const isSenderBot = mes.sender == 'ai'

                return (
                    <div key={index}
                        className={`chat ${isSenderBot ? "chat-start" : "chat-end"} text-sm relative`}
                    >
                        <div className={`chat-image  avatar w-10 ${!isSenderBot && "-mr-4"}`}>

                            {isSenderBot ?
                                (<Avatar seed='sarah'
                                    className='h-12 w-12 bg-white rounded-full border-2 border-[#2991ee]' />)
                                :
                                (<UserCircle className='text-[#2991ee] ' />)}
                        </div>
                        <p
                            className={`chat-bubble ${isSenderBot ? "chat-bubble-primary text-white  bg-[#4d7dfb]"
                                : "chat-bubble-secondary bg-gray-200 text-gray-700"}`}>
                            {mes.content}
                        </p>
                    </div>)
            })
        }
        <div ref={ref}></div>
        </div>
    )
}

export default Messages