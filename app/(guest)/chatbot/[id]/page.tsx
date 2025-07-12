'use client'

import React, { FormEvent, useEffect, useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '../../../../components/ui/dialog'
import { Message } from '@/types/types'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import startNewChat from '@/lib/startNewChat'
import Avatar from '@/components/Avatar'
import { toast } from 'sonner'
import Messages from '@/components/Messages'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import {  useForm } from 'react-hook-form'
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form'
import { useParams } from 'next/navigation'

const formSchema = z.object({
  message: z.string().min(2, "your message is too short")
})


function ChatbotPage() {

  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [isOpen, setIsOpen] = useState(true)
  const [loading, setLoading] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [chatId, setChatId] = useState()
  //const [id, setId] = useState()

  const params = useParams()
  const id = params?.id
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      message: ""
    }
  })





  const onSubmit = async(values:z.infer<typeof formSchema>)=>{
    setLoading(true)
    const {message:formMessage} = values

    const message =formMessage 
    form.reset()

    if(!name || !email){
      setIsOpen(true)
      setLoading(false)
      return
    }

    if(!message.trim()){
      return
    }

    const userMessage:Message ={
      id:Date.now(),
      content:message,
      sender:'user',
      created_at:Date.now().toLocaleString(),
      chat_session_id:chatId!

    }

    const loadingMessage :Message ={
      id:Date.now(),
      content:"Thinking..",
      sender:'ai',
      created_at:Date.now().toLocaleString(),
      chat_session_id:chatId!
    }

    setMessages((prevMessages)=>[
      ...prevMessages,
      userMessage,
      loadingMessage
    ])

    try{

      const response = await fetch('/api/mysql/assistly/send-message',{
        method:"POST",
         headers:{
          "Content-Type":"application/json"
         },
         body:JSON.stringify({
          name:name,
          chat_session_id:chatId,
          chatbot_id:id,
          content:message
         })
      })

      const result = await response.json()
//replacing AI message with message thinking 
      setMessages((prevMessage)=>
        prevMessage.map(msg=>msg.id === loadingMessage.id ? {...msg,content:result.content,id:result.id}:msg)
  
      )
    }catch(error){
      console.log("error","couldent save data in messages")
    }
  }


  const handleInformationSubmit = async (e: FormEvent) => {
    e.preventDefault()

    setLoading(true)
    const chatId = await startNewChat(name, email, Number(id))

    console.log("guest inserted", chatId)
    setChatId(chatId)
    try {
      const res = await fetch(`http://localhost:3000/api/mysql/assistly/messages?id=${chatId}`)
      const data: Message[] = await res.json()
      setMessages(data)

    } catch (error) {
      toast.error("couldn't get messages for this bot")
    }
    setLoading(false)
    setIsOpen(false)
  }


  return (
    <div className='w-full flex bg-gray-100'>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className='sm:max-w-[425px]'>
          <form onSubmit={handleInformationSubmit}>
            <DialogHeader>
              <DialogTitle>Let's help you out</DialogTitle>
              <DialogDescription>I just need a few details to get started</DialogDescription>
            </DialogHeader>

            <div className=' grid gap-4 py-4'>
              <div className='grid grid-cols-4 gap-4 items-center'>
                <Label htmlFor='name' className='text-right'>Name</Label>
                <Input
                  id='name'
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder='John Doe'
                  className='col-span-3'
                />
              </div>

              <div className='grid grid-cols-4 gap-4 items-center'>
                <Label htmlFor='username' className='text-right'>Email</Label>
                <Input
                  id='username'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder='John@example.com'
                  className='col-span-3'
                />
              </div>
            </div>

            <DialogFooter >
              <Button type='submit' disabled={!name || !email || loading}>
                {!loading ? "continue.." : "loading.."}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>

      </Dialog>

      <div className='flex flex-col w-full max-w-3xl mx-auto bg-white md:rounded-t-lg shadow-2xl md:mty-10'>
        <div className='pb-4 sticky bg-[#4D7Dfb] top-0 z-50 border-b px-10 md:rounded-t-lg text-white flex items-center space-x-4 py-5'>
          <Avatar seed='fix it later' className='h-12 w-12 bg-white border-2 border-white rounded-full' />
          <div>
            <h1 className='truncate text-lg'>Bot name</h1>
            <p className='text-sm text-gray-300'>
              Typically responses instantly
            </p>
          </div>
        </div>

        <Messages contents={messages} />

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} action="" className='flex sticky bottom-0 items-start z-50 space-x-4 drop-shadow-lg p-4 bg-gray-100 rounded-md'>
            <FormField
              control={form.control}
              name='message'
              render={({ field }) => (
                <FormItem className='flex-1'>
                  <FormLabel hidden>Message</FormLabel>
                  <FormControl>
                    <Input
                      className='p-8'
                      {...field}
                      placeholder='Type a message'
                    />
                  </FormControl>
                </FormItem>
              )}
            ></FormField>
            <Button type='submit' className='h-full'>send</Button>
          </form>
        </Form>

      </div>
    </div>
  )
}

export default ChatbotPage