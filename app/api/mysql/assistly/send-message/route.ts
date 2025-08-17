import { NextRequest, NextResponse } from "next/server";
import { OpenAI } from "openai"
import { query } from "@/lib/db"
import { ChatCompletionMessageParam } from "openai/resources/index.mjs";

const openAi = new OpenAI({
    apiKey: process.env.OPEN_AI_KEY
})



export async function POST(request: NextRequest) {

    const { content, name, chatbot_id, chat_session_id } = await request.json()

    console.log(`receive this on ai backend ${chatbot_id} name ${name} content ${content}`)


    try {

        const qry = `
      SELECT *
      FROM chatbot_characteristics
      WHERE chatbot_id = $1
    `
        const results = await query(qry, [chatbot_id!])

        const chatbot = results.map((row) => ({
            ...row,
            created_at: row.created_at?.toISOString()
        }))

        console.log("apenai chatbotdata ......", chatbot)

        if (!chatbot) {
            return NextResponse.json({ error: "no chat bot found" }, { status: 500 })
        }



        const qryMsg = 'SELECT * FROM messages WHERE chat_session_id = $1 ORDER BY created_at ASC'
      
        const messages = await query(qryMsg, [chat_session_id])

        const fromattedMessages: ChatCompletionMessageParam[] = messages.map((msg) => ({
            role: msg.sender === 'ai' ? 'system' : 'user',
            name: msg.sender === 'ai' ? 'ai' : name,
            content: msg.content
        }))

        const systemPropmt = chatbot.map((char) => char.content).join("+")

        console.log("system prompt", systemPropmt)

        const messagesForAi: ChatCompletionMessageParam[] = [
            {
                role: 'system',
                name: 'system',
                content: `You are a helpful assistant talking to ${name} .if a generic quetion is asked which is not relevant
                or in the same scope or domain as the points in mentioned in the key information section ,kindly inform user they are
                only allowed to search for the specified content.use emojies where possible.her is some key information that you need to be aware of
                these are elements you may be asked about:  ${systemPropmt}`
            }, ...fromattedMessages, {
                role: 'user',
                name: name,
                content: content
            }
        ]

        const openAiResponse = await openAi.chat.completions.create({
            messages: messagesForAi,
            model: 'gpt-3.5-turbo',
        })

        const aiMessage = openAiResponse.choices[0]?.message?.content?.trim();

        if (!aiMessage) {
            return NextResponse.json({ error: "No AI response generated" }, { status: 500 })
        }

        //insert user msg to db
        const qryInsert = `
      INSERT INTO messages (content, sender, chat_session_id)
      VALUES ($1, 'user', $2)
      RETURNING id, created_at
    `
         await query(qryInsert, [content, chat_session_id])

        //insert ai message to db
        const qryInsertAi = `
      INSERT INTO messages (content, sender, chat_session_id)
      VALUES ($1, 'ai', $2)
      RETURNING id, created_at
    `
        const resultai = await query(qryInsertAi, [aiMessage, chat_session_id])

        console.log("messages ai////////////", messages)

        return NextResponse.json({
            id: resultai[0].id,
            content: aiMessage,
        }, { status: 200 })

    } catch (error) {
        console.log("error in ai backend", error)
        return NextResponse.json({ error }, { status: 500 })
    }
}