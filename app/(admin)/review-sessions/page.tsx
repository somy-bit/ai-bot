
import ChatbotSesstions from '@/components/ChatbotSesstions'
import { AllSessionInfo } from '@/types/types'
import { auth } from '@clerk/nextjs/server'
import React from 'react'


async function ReviewSessions() {

    
      const { userId, redirectToSignIn } = await auth()
      if(!userId) redirectToSignIn()

     const data = await fetch(`http://localhost:3000/api/mysql/assistly/sessions?id=${userId}`,{method:"GET"})
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
