
import { NextResponse, NextRequest } from 'next/server'
import {query } from '@/lib/db'
import { auth } from '@clerk/nextjs/server'



export async function GET(request: NextRequest) {


  try {

    const reqUrl = request.nextUrl.searchParams
    console.log("request url",reqUrl)
   
    const userId = reqUrl.get('id')

      if (!userId) {
      return NextResponse.json({ error: 'userId is required' }, { status: 400 })
    }

    
    console.log("testing results",userId)

 const qry = `
      SELECT 
        chatbots.*, 
        chatbots.id AS cb_id, 
        chat_sessions.*, 
        chat_sessions.id AS chs_id,
        guests.*
      FROM chatbots
      LEFT JOIN chat_sessions ON chatbots.id = chat_sessions.chatbot_id
      LEFT JOIN guests ON chat_sessions.guest_id = guests.id
      WHERE chatbots.clerk_user_id = $1
    `

     const result = await query(qry,[userId!])

    console.log("joined results :",result)


    return NextResponse.json(result)

  } catch (error) {

    console.log('ERROR: API - ', (error as Error).message)

    const response = {
      error: (error as Error).message,

      returnedStatus: 500,
    }

    return NextResponse.json(response, { status: 500 })
  }
}

export async function POST(request:NextRequest){

  try{

    const body =await request.json()
    const guest_id = body.guestId
    const chatbot_id = body.chatbotId

    console.log("guest id",guest_id)


     const qry = `
      INSERT INTO chat_sessions (guest_id, chatbot_id)
      VALUES ($1, $2)
      RETURNING id
    `

    const res = await query(qry,[guest_id,chatbot_id])
    
     return NextResponse.json({ sessionId: res[0].id }, { status: 200 })
  } catch (error) {
    console.log('ERROR creating chat session:', error)
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 500 }
    )
  }
}