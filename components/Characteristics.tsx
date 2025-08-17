'use client'
import React, { useState } from 'react'
import { OctagonX } from 'lucide-react'
import { JoinResults } from '@/types/types'
import { handleDelete } from '@/lib/apiRequests'
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { toast } from 'sonner'


function Characteristics({ data, callback }: { data: JoinResults, callback: any }) {


    const [deleteing, setDeleting] = useState(false)

    const deleteCharbot = async () => {
        if(deleteing) return
        setDeleting(true)
        const result = await handleDelete(`/api/mysql/assistly/chatbotcharacteristics/${data.characteristic_id}`)
        // const resJson = await result.json()
        console.log(result.status)
        if (result.status == 200) {
            callback(data.characteristic_id)
            setDeleting(false)
        }
        else if (result.status == 500) {
            toast.error("error occuered in the server! try again later")
        } else {
            toast.error("oops! it looks like some error occured ,let's try later")
        }
        setDeleting(false)

    }

    return (
        <li className='relative p-10 bg-white border rounded-md'>
            {data.content}


            <AlertDialog>
                <AlertDialogTrigger>
                    
                        <OctagonX
                            className='w-6 h-6 text-white fill-red-500 absolute top-1 right-1 cursor-pointer hover:opacity-50'

                        />
                   

                </AlertDialogTrigger>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Are you absolutely sure you want to delete this item?</AlertDialogTitle>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={deleteCharbot}>Continue</AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>

        </li>
    )
}

export default Characteristics