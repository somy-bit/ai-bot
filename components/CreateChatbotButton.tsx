'use client'

import React, { FormEvent, useState } from 'react'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import { useUser } from '@clerk/nextjs'
import Avatar from './Avatar'
import { toast } from 'sonner'

type Bot = {
  id: string;
  clerk_user_id: string;
  name: string;
  created_at: string;

}

function CreateChatbotButton() {



  const { user } = useUser();
  const router = useRouter();
  const [chatbotName, setChatbotName] = useState("")
  const [inserting, setInserting] = useState(false)

  if (!user) return null

  if (inserting) return (
    <Avatar seed='chatbot' className='w-40 h-40 animate-spin' />
  )
  const createCb = async (e: FormEvent) => {

    e.preventDefault()
    console.log("form submitted", chatbotName)
    setInserting(true)


    try {
      const result = await fetch(`/api/mysql/assistly/chatbots`, {
        headers: { 'Content-Type': 'application/json' },
        method: "post",
        body: JSON.stringify({
          "userId": user?.id,
          "name": chatbotName,

        })
      })

      console.log('results', result)
      const text = await result.text(); // always read text first
      console.log('Response text:', text);
      const data = JSON.parse(text.trim());
      console.log('response got in rout', data.id)
      setChatbotName("")
      setInserting(false)
      router.push(`/edit-chatbot/${data.id}`)

    }
    catch (error) {

      setInserting(false)
      toast.error("oops we are sorry! something went wrong")
    }


  }
  return (
    <form onSubmit={createCb} className='flex flex-col md:flex-row gap-5 mt-5'>
      <input
        type="text"
        placeholder='create chatbot ...'
        className='max-w-lg px-2'
        required
        onChange={(e) => setChatbotName(e.target.value)}
      />
      <Button type='submit'>Create ChatBot</Button>
    </form>
  )
}

export default CreateChatbotButton