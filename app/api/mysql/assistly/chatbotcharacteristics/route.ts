import {query} from '@/lib/db'
import { NextResponse, NextRequest } from 'next/server'




export async function POST(request: NextRequest) {
  try {

    const resJson =await request.json()

    const chatbot_id = resJson.chatbot_id
    const content = resJson.content

      const qry = `
      INSERT INTO chatbot_characteristics (chatbot_id, content)
      VALUES ($1, $2)
      RETURNING *
    `
      const result = await query(qry, [chatbot_id,content])

      console.log("chatbot characteristics saved...", result)
      return NextResponse.json(result,{status:200})
      
   
 

  } catch (error) {

    console.log('ERROR: API - ', (error as Error).message)

    const response = {
      error: (error as Error).message,

      returnedStatus: 500,
    }

    return NextResponse.json(response, { status: 500 })
  }
}

export async function GET(req:NextRequest){

  
  const reqUrl = req.nextUrl.searchParams
   
  const chatbot_id = reqUrl.get('id')

  if (!chatbot_id) {
    return NextResponse.json(
      { error: 'chatbot_id is required' },
      { status: 400 }
    )
  }

  try{

      const qry = `
      SELECT *
      FROM chatbot_characteristics
      WHERE chatbot_id = $1
    `
    const results = await query(qry,[chatbot_id!])

       const data = results.map((row) => ({
      ...row,
      created_at: row.created_at?.toISOString()
    }))

 
    return NextResponse.json(data, { status: 200 })

  } catch (error) {
    
    console.log('ERROR: GET characteristics -', error)
    return NextResponse.json(
      { error: (error as Error).message, returnedStatus: 500 },
      { status: 500 }
    )
  }

}


