
import { NextResponse, NextRequest } from 'next/server'
import mysqlQuery from '../mysqlQuery'
import { ResultSetHeader } from 'mysql2'
import { GetDBSettings } from '@/lib/utils'
import mysql from 'mysql2/promise'
// define and export the GET handler function
let connectionParams = GetDBSettings()



// export async function GET(request: Request) {


//   try{

//     const id = request.url.split('/')[request.url.split('/').length-1]

//     console.log("userid is ...",id)
//     let query = "SELECT chatbots.* , chat_sessions.* , guests.* , messages.*  FROM chatbots LEFT JOIN chat_sessions ON chatbots.id=chat_sessions.chatbot_id LEFT JOIN guests ON chat_sessions.guest_id = guests.id LEFT JOIN messages ON chat_sessions.id = messages.chat_session_id where chatbots.clerk_user_id =?"
//      let query2= `SELECT * FROM chatbots where clerk_user_id=${id}`
//     const results = await mysqlQuery(query2,[id])


//     console.log("too many queries results...............",results)
    
//   return NextResponse.json(results )

//   }catch(error){
    
//   return NextResponse.json({"error":""},{status:500})

//   }


// }

export async function GET(request: NextRequest) {

  // if(request.method == 'get')

  try {


    
    const reqUrl = request.nextUrl.searchParams
   
    const userId = reqUrl.get('id')
    
    console.log("testing results",userId)

     let query = `SELECT chatbots.*,chatbots.id AS cb_id , chat_sessions.*, chat_sessions.id AS chs_id ,
      guests.*  FROM chatbots LEFT JOIN chat_sessions ON chatbots.id=chat_sessions.chatbot_id
       LEFT JOIN guests ON chat_sessions.guest_id = guests.id  WHERE chatbots.clerk_user_id=?`

     const result = await mysqlQuery(query,[userId!])


    console.log("joined results :",result)
    return NextResponse.json(result)

  } catch (error) {

    console.log('ERROR: API - ', (error as Error).message)

    const response = {
      error: (error as Error).message,

      returnedStatus: 200,
    }

    return NextResponse.json(response, { status: 200 })
  }
}

export async function POST(request:NextRequest){

  try{

    const body =await request.json()
    const guest_id = body.guestId
    const chatbot_id = body.chatbotId



    let query = "INSERT INTO chat_sessions (guest_id,chatbot_id) VALUES (?,?)"

    
        const db =await mysql.createConnection(connectionParams)
    
        const [result] = await db.execute<ResultSetHeader>(query,[guest_id,chatbot_id])
    
        await db.end()
    
        return NextResponse.json({sessionId:result.insertId},{status:200})

  }catch(error){
    throw error
  }
}