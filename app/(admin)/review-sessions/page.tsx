
import ChatbotSesstions from '@/components/ChatbotSesstions'
import { AllSessionInfo } from '@/types/types'
import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import React from 'react'

const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"

async function ReviewSessions() {

    
      const { userId } = await auth()
     if (!userId) redirect("/login")

     const data = await fetch(`${baseUrl}/api/mysql/assistly/sessions?id=${userId}`,{method:"GET"})
     const info:AllSessionInfo[] = await data.json()

  return (
    <div className='flex-1 px-10'>
        <h1 className='text-lg lg:text-3xl font-semibold mt-10'>Chat Sessions : </h1>
        <h2 className='mb-5'>
            Review all the chat sessions that your bot has have with customers
        </h2>

        <ChatbotSesstions data={info}/>
    </div>
  )
}

export default ReviewSessions
