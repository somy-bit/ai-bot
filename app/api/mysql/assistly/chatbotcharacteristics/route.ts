import mysql from 'mysql2/promise';
import { NextResponse, NextRequest } from 'next/server'
import mysqlQuery from '../mysqlQuery';



export async function POST(request: NextRequest) {
  try {

    const resJson =await request.json()

    const chatbot_id = resJson.chatbot_id
    const content = resJson.content

      let query = "INSERT INTO chatbot_characteristics (chatbot_id,content) VALUES (?,?)"
      const result = await mysqlQuery(query, [chatbot_id,content])

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

  try{

    let query = "SELECT * FROM chatbot_characteristics WHERE chatbot_id=?"
    const results = await mysqlQuery(query,[chatbot_id!])

    return NextResponse.json(results,{status:200})
  }catch(error){
    throw error
  }

}


