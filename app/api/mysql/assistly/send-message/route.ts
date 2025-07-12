import { NextRequest, NextResponse } from "next/server";
import {OpenAI} from "openai"

const openAi = new OpenAI({
    apiKey:process.env.OPEN_AI_KEY
})
export async function POST(request:NextRequest){

    const {content,name,chatbot_id,chat_session_id} = await request.json()

    console.log(`receive this on ai backend ${chatbot_id} name ${name} content ${content}`)


    try{

        const chatbotData = await fetch(`http://localhost:3000/api/mysql/assistly/chatbotcharacteristics?id=${chatbot_id}`)
        const botData = await chatbotData.json()
        console.log("apenai chatbotdata ......",botData)

        if(!botData){
            return NextResponse.json({error:"no chat bot found"},{status:500})
        }


        const messages = await fetch(`http://localhost:3000/api/mysql/assistly/messages?id=${chat_session_id}`)
        const msgJson = await messages.json()

        console.log("messages ai////////////",msgJson)

        return NextResponse.json({},{status:200})

    }catch(error){

        return NextResponse.json({error},{status:500})
    }
}