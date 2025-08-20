'use client'

import { Input } from '@/components/ui/input'
import Link from 'next/link'
import React, { FormEvent, useEffect, useState } from 'react'
import {  useParams, useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Copy } from 'lucide-react'
import { toast } from 'sonner'
import Avatar from '@/components/Avatar'
import { JoinResults } from '@/types/types'
import Characteristics from '@/components/Characteristics'
import { handleDelete } from '@/lib/apiRequests'



function Page() {

  const { id } = useParams<{ id: string }>()

  const [url, setUrl] = useState("")
 
  const [chatbotName, setChatbotName] = useState<string>("")
  const [newCharacteristic, setNewCharacterisitic] = useState<string>("")
  const [chatbotData, setChatbotData] = useState<JoinResults[]>([])
  const router = useRouter()

  const[loading,setLoading] = useState(false)
  const [addingChars,setAddingChars] = useState(false)
  const [fetchTrigger,setFetchTrigger] = useState(1)

const BaseUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"

  const refreshData = (id:string)=>{

    const currentData = [...chatbotData]
    const newDataset = currentData.filter(data=>(data.characteristic_id!==id))
    setChatbotData(newDataset)
  }

  useEffect(() => {
    const fetchName = async () => {

      const data = await fetch(`${BaseUrl}/api/mysql/assistly/chatbots/${id}`, {
        method: "get",

      })

      const res = await data?.json() 
      console.log('result ...........',res)
     
      if (res[0]) {
       
        
        setChatbotName(res[0].name)
        setChatbotData(res)
       
      }


    }

    fetchName()

  }, [fetchTrigger,id])

  useEffect(() => {


    const url = `${process.env.NEXT_PUBLIC_APP_URL}/chatbot/${id}`
    setUrl(url)

  }, [id])


  const handleAddCharacteristics = async(content:string)=>{

    try{

      setAddingChars(true)
      const result = await fetch(`${BaseUrl}/api/mysql/assistly/chatbotcharacteristics`,{
        method:"POST",
        body:JSON.stringify({
          "chatbot_id":id,
          "content":content
        })
      })
      setAddingChars(false)

      console.log('res',result)
      if(result?.status == 200){

        setFetchTrigger(fetchTrigger+1)
        toast.success("new characteristic added!")

      }else if(result?.status == 500){

        toast.error("something went wrong try again later!")

      }

    }catch(error){
      console.log(error)
      toast.error("unfortunately some error occured in the server,please try again later")
    }
  }

  const handleUpdate = async(e:FormEvent<HTMLFormElement>)=>{

    e.preventDefault()

    try{

       await fetch(`${BaseUrl}/api/mysql/assistly/chatbots/${id}`,{
        method:"PUT",
        body:JSON.stringify({
          id:id,
          name:chatbotName
        })
      })
    }catch(error){

      console.log(error)
      toast.error("something went wrong try again later")
    }


  }


  const handleDeleteBot = async(id:string)=>{

    const isConfirmed = window.confirm("Are you sure you want to delete this chatbot permenently")
    if(!isConfirmed) return

    try{

      setLoading(true)
      const result = await handleDelete(`${BaseUrl}/api/mysql/assistly/chatbots/${id}`)
     
      if(result.status == 200){

        router.replace("/view-chatbots")

      }else if(result.status == 500){
        setLoading(false)
        toast.error('there is a problem with server now,lets try again later')
      }

    }catch(error){
      console.log(error)
      setLoading(false)
      toast.error("oops something went wrong , please try later")
    }

  }

  if(loading) return (
    <div className='mx-auto p-10'>
      <Avatar className='animate-spin ' seed="PAPAFAM support agent" />
    </div>
  )


  return (
    <div className='px-0 md:p-10'>
      <div className='md:sticky md:top-0 z-50 sm:max-w-sm ml-auto space-y-2
      md:border p-5 rounded-b-lg md:rounded-lg bg-[#2991ee]'>
        <h2 className='text-white text-sm font-bold'>Link To Chat</h2>
        <p className='text-sm text-white italic'>
          share this link with your customers to let them chat with your bot
        </p>

        <div className='flex items-center space-x-2'>
          <Link href={url} className='w-full hover:opacity-50 cursor-pointer'>
            <Input className='cursor-pointer bg-white' value={url} readOnly />
          </Link>

          <Button
            type='submit'
            size="sm"
            className='px-3 cursor-pointer'
            onClick={() => {
              navigator.clipboard.writeText(url)
              toast.success("copied to tha clipboard")
            }}
          >
            <span className='sr-only'>Copy</span>
            <Copy className='h-4 w-4 ' />
          </Button>
        </div>

      </div>
      <section className='relative mt-5 bg-white p-5 md:p-10 rounded-lg'>
        <Button variant="destructive"
          className='absolute top-2 right-2 h-8 w-2'
          onClick={()=>handleDeleteBot(id)}
        >
          X
        </Button>
        <div className='flex space-x-3'>
          <Avatar seed={chatbotName} />
          <form 
           onSubmit={handleUpdate}
          className='flex flex-1 items-center space-x-2 mt-2'>
            <Input
              value={chatbotName}
              onChange={(e) => setChatbotName(e.target.value)}
              placeholder={chatbotName}
              required
              className='w-full border-none bg-transparent font-bold text-xl'
            />
            <Button type='submit' disabled={!chatbotName}>Update</Button>
          </form>
        </div>

        <h2 className='text-xl font-bold mt-6'>
          here is what your AI knows</h2>
        <p>your chatbot is equiped with the fallowing information to help you with your customer</p>

        <div className='bg-gray-200 rounded-md mt-5 p-5 '>
          <form 
          onSubmit={e=>{
            e.preventDefault();
            handleAddCharacteristics(newCharacteristic)
            setNewCharacterisitic("")
          }}
          className='flex space-x-2 mb-5'
          >

            <Input
              value={newCharacteristic}
              type="text"
              placeholder='for example:if customer asks for prices give the prices page ww/me/prices'
              onChange={e => setNewCharacterisitic(e.target.value)}
            />
            <Button type='submit' disabled={!newCharacteristic}>
              ADD
            </Button>

          </form>
          {
            addingChars && (
              <div className='bg-white flex items-center justify-center p-10'>
                <Avatar className='w-10 h-10 animate-spin' seed="PAPAFAM support group"/>
              </div>
            )
          }

          <ul className='flex flex-wrap-reverse gap-5'>
            {
              chatbotData?.map((data)=>(  
                <Characteristics
                key={data.characteristic_id} 
                data={data}
                callback={refreshData}
                />
              ))
            }
          </ul>
        </div>
      </section>
    </div>
  )
}

export default Page