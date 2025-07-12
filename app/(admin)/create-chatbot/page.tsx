

import React from 'react'
import Avatar from '@/components/Avatar'
import { auth } from '@clerk/nextjs/server'
import CreateChatbotButton from '@/components/CreateChatbotButton'



async function CreateChatBot() {



  const { userId, redirectToSignIn } = await auth()

  if (!userId) return redirectToSignIn()
  


  return (
    <div className='p-10 flex flex-col md:flex-row flex-1 items-center
     justify-center space-y-2 md:space-x-10 bg-white m-10 rounded-md'>
      <Avatar className='' seed='create-cahtbot' />
      <div className='flex flex-col justify-center items-center p-2 '>
        <p className='text-xl lg:text-3xl font-semibold '>Create</p>
        <p className='text-gray-800 text-center font-extralight'>create new chatbot to assist you in your conversation with your customer</p>
      </div>
      <CreateChatbotButton />
     
    </div>
  )
}

export default CreateChatBot