import mysql from 'mysql2/promise';
import { NextResponse, NextRequest } from 'next/server'
import mysqlQuery from '../mysqlQuery';
import { Chatbot } from '@/types/types';
import { mergeObject } from '@/lib/utils';
import { useAuth } from '@clerk/nextjs';


export async function POST(request: NextRequest) {

  try {


    const req = await request.json()
    const id = req.userId
    const name = req.name

    let query = "INSERT INTO chatbots (clerk_user_id,name) VALUES (?,?)"

    const result = await mysqlQuery(query , [id,name])



    return NextResponse.json(result,{status:200})

  } catch (error) {

    console.log('ERROR: API - ', (error as Error).message)

    const response = {
      error: (error as Error).message,

      returnedStatus: 200,
    }

    return NextResponse.json(response, { status: 200 })
  }
}


export  async function GET(request:NextRequest){



  try{

    const reqUrl = request.nextUrl.searchParams
   
    const userId = reqUrl.get('id')
    console.log(reqUrl)
    console.log(userId)

    if(userId){
       
    let query =
    "SELECT chatbots.* , chatbot_characteristics.content , chatbot_characteristics.chatbot_id FROM  chatbots LEFT JOIN  chatbot_characteristics  ON chatbots.id= chatbot_characteristics.chatbot_id where chatbots.clerk_user_id=? ORDER BY chatbots.id "

    const result:any = await mysqlQuery(query,[userId])

    const grouped:any ={}

    result.forEach((row:any)=>{
      const id = row.id

      if(!grouped[id]){

        grouped[id] = {
          ...row,
          chars:[]
        }
      }

        grouped[id]={
          ...grouped[id],
          chars: [...grouped[id].chars,row.content]
        
      }

     
     })
    

 console.log("chatbot chars,,,,,,,,,,,,",grouped)



    return NextResponse.json(grouped,{status:200})

  

    }else{

      return NextResponse.json({"error":"error occured"},{status:500})
    }


  }catch(error){

    return NextResponse.json({"error":"error occured"},{status:500})
  }
}