import { NextResponse, NextRequest } from 'next/server'
import { query } from '@/lib/db'

// POST: Insert a chatbot
export async function POST(request: NextRequest) {
  try {
    const req = await request.json()
    const id = req.userId
    const name = req.name

    // ✅ Use $1, $2 for Postgres placeholders
    const qry = "INSERT INTO chatbots (clerk_user_id, name) VALUES ($1, $2) RETURNING *"
    const result = await query(qry, [id, name])

   
    const bot = result[0];
    bot.created_at = bot.created_at.toISOString();  
     console.log(bot)  
    return NextResponse.json(bot, { status: 200 })
  } catch (error) {
    console.log('ERROR: API - ', (error as Error).message)

    return NextResponse.json(
      { error: (error as Error).message, returnedStatus: 500 },
      { status: 500 }
    )
  }
}




// GET: Fetch chatbots + characteristics
export async function GET(request: NextRequest) {
  try {
    const reqUrl = request.nextUrl.searchParams
    const userId = reqUrl.get('id')

    if (userId) {
      const qry = `
        SELECT chatbots.*, 
               chatbot_characteristics.content, 
               chatbot_characteristics.chatbot_id
        FROM chatbots
        LEFT JOIN chatbot_characteristics 
        ON chatbots.id = chatbot_characteristics.chatbot_id
        WHERE chatbots.clerk_user_id = $1
        ORDER BY chatbots.id
      `

      // ✅ Explicitly type the result as array of objects
      type RowType = {
        id: number
        clerk_user_id: string
        name: string
        content: string | null
        chatbot_id: number | null
      }

      const rows:RowType[] = await query(qry, [userId])

      const grouped: Record<number, any> = {}

      rows.forEach((row: RowType) => {
        const id = row.id
        if (!grouped[id]) {
          grouped[id] = {
            ...row,
            chars: []
          }
        }
        grouped[id] = {
          ...grouped[id],
          chars: [...grouped[id].chars, row.content]
        }
      })

      return NextResponse.json(grouped, { status: 200 })
    } else {
      return NextResponse.json({ error: 'error occurred' }, { status: 500 })
    }
  } catch (error) {
    return NextResponse.json({ error: 'error occurred' }, { status: 500 })
  }
}

