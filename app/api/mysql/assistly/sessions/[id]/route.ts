
import { NextResponse, NextRequest } from 'next/server'
import mysqlQuery from '../../mysqlQuery'



export async function GET(request: NextRequest) {

  // if(request.method == 'get')

  try {


    
    const id = request.url.split('/')[request.url.split('/').length-1]
    
    console.log("testing results",request.url.split('/')[request.url.split('/').length-1])
    
    console.log("session id in backend ",id)

     let query = `SELECT chat_sessions.*,guests.*,messages.* FROM chat_sessions 
     LEFT JOIN messages ON chat_sessions.id=messages.chat_session_id LEFT JOIN
      guests ON chat_sessions.guest_id=guests.id where chat_sessions.id=?`

     const result = await mysqlQuery(query,[id!])


    console.log("session contents :",result)
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