import { NextRequest, NextResponse } from "next/server";
import { query } from '@/lib/db'

export async function POST(request: NextRequest) {

    try {

        const body = await request.json()
        const chat_session_id = body.chatSessionId
        const content = body.content
        const sender = body.sender

        const qry = `
      INSERT INTO messages (chat_session_id, content, sender)
      VALUES ($1, $2, $3)
      RETURNING *
    `
        const res = await query(qry, [chat_session_id, content, sender])

        return NextResponse.json(res, { status: 200 })
    } catch (error) {
        console.log('ERROR creating message:', error)
        return NextResponse.json(
            { error: (error as Error).message },
            { status: 500 }
        )
    }
}

export async function GET(request: NextRequest) {

    try {
        const { searchParams } = new URL(request.url)
        const id = searchParams.get('id')

        if (!id) {
            return NextResponse.json({ error: 'chat_session_id is required' }, { status: 400 })
        }

        const qry = 'SELECT * FROM messages WHERE chat_session_id = $1 ORDER BY created_at ASC'
        const results = await query(qry, [id])

        console.log('Messages:', results)
        return NextResponse.json(results, { status: 200 })
    } catch (error) {
        console.log('ERROR fetching messages:', error)
        return NextResponse.json(
            { error: (error as Error).message },
            { status: 500 }
        )
    }
}