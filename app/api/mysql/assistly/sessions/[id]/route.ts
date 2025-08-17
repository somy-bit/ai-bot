
import { NextResponse, NextRequest } from 'next/server'
import {query} from '@/lib/db'



export async function GET(request: NextRequest) {


  try {

 
    
     const id = request.url.split('/').pop()

    if(!id){
      return NextResponse.json({ error: 'Session id is required' }, { status: 400 })
    }

    console.log("testing results",request.url.split('/')[request.url.split('/').length-1])
    
    console.log("session id in backend ",id)

      const qry = `
      SELECT chat_sessions.*, guests.*, messages.*
      FROM chat_sessions
      LEFT JOIN messages ON chat_sessions.id = messages.chat_session_id
      LEFT JOIN guests ON chat_sessions.guest_id = guests.id
      WHERE chat_sessions.id = $1
    `

     const result = await query(qry,[id!])


    console.log("session contents :",result)

    return NextResponse.json(result, { status: 200 })
  } catch (error) {
    console.log('ERROR: API - ', (error as Error).message)

    return NextResponse.json(
      { error: (error as Error).message },
      { status: 500 }
    )
  }
}