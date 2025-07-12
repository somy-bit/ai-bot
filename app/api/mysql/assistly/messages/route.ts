import { NextRequest, NextResponse } from "next/server";
import mysqlQuery from "../mysqlQuery";

export async function POST(request:NextRequest){

    try{

        const body = await request.json()
        const chat_session_id= body.chatSessionId
        const content = body.content
        const sender = body.sender

        let query = 'INSERT INTO messages (chat_session_id,content,sender) VALUES (?,?,?)'
        const res = await mysqlQuery(query,[chat_session_id,content,sender])

        return NextResponse.json(res,{status:200})

    }catch(error){
        throw error
    }
}

export async function GET(request:NextRequest){

    try{
        const {searchParams} = new URL(request.url)
        const id = searchParams.get('id') 

        let query ='SELECT * FROM messages where chat_session_id=?'
        const results  = await mysqlQuery(query,[id!])

        console.log("messages" ,results)
        return NextResponse.json(results,{status:200})

    }catch(error){
        throw error
    }
}