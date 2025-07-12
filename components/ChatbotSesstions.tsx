'use client'

import React, { useEffect, useState } from 'react'
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import { AllSessionInfo } from '@/types/types'
import Avatar from './Avatar'
import Link from 'next/link'

interface Grouped {
    id: number,
    session: AllSessionInfo[]
}

function ChatbotSesstions({ data }: { data: AllSessionInfo[] }) {

    var grouped: Record<number, Grouped> = [];
    const [result, setResult] = useState<Grouped[]>([])


    useEffect(() => {

        grouped = data.reduce<Record<number, Grouped>>((acc, item) => {
            if (!acc[item.cb_id]) {
                acc[item.cb_id] = { id: item.cb_id, session: [] }
            }
            acc[item.cb_id].session.push({ ...item })

            return acc
        }, {} as Record<number, Grouped>)

        setResult(Object.values(grouped))
        console.log("grpouping sessions ", result)

    }, [])

    return (
        <div>

            <Accordion type="single" collapsible>
                {result.map((info: Grouped, index) => {

                    return <AccordionItem
                        value={`item-${info.id}`}
                        key={index}
                        className='px-10 py-5'
                    >
                        {
                            info.session.length > 0 && info.session[0].chs_id ?
                                (<>
                                    <AccordionTrigger>
                                        <div className='flex text-left w-full items-center'>
                                            <Avatar seed={info.session[0].name} className='h-10 w-10 mr-4' />
                                            <div className='flex flex-1 justify-between space-x-4'>
                                                <p>{info.session[0].name}</p>
                                                <p className='pr-4 text-right font-bold'>
                                                    {info.session.length} sessions
                                                </p>
                                            </div>


                                        </div>
                                    </AccordionTrigger>
                                    <AccordionContent className='bg-gray-100 space-y-5 p-5 rounded-md'>
                                        {info.session.map((item, index) => (
                                            <Link
                                                key={index}
                                                href={`/review-sessions/${item.chs_id}`}
                                                className='relative p-10 bg-[#2991ee] text-white rounded-md block'
                                            >
                                                <p className='text-lg font-bold'>{item.guest_name || "Anonymous"}</p>
                                                <p className='text-sm font-light'>{item.email || "No email provided"}</p>
                                                <p></p>

                                            </Link>
                                        ))}
                                    </AccordionContent>
                                </>)
                                :
                                (
                                    <div className='flex flex-col text-left w-full items-center'>
                                        <div className='flex w-full items-center justify-between'>
                                            <Avatar seed={info.session[0].name} className='h-10 w-10 mr-4' />

                                            <p className='flex-1 text-left '>{info.session[0].name}</p>
                                        </div>
                                        <p className='block text-xs text-gray-400'>there is no session for this bot</p>
                                    </div>)

                        }
                    </AccordionItem>
                }

                )}
            </Accordion>

        </div>
    )
}

export default ChatbotSesstions