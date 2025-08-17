
import { NextResponse, NextRequest } from 'next/server'
import { query } from '../../../../../../lib/db'
import {pool} from '@/lib/db'

export async function GET(request: NextRequest) {


  try {


    const id = request.url.split('/')[request.url.split('/').length - 1]

    console.log("testing results", request.url.split('/')[request.url.split('/').length - 1])

    const qry = `
    SELECT 
  ch.id AS chatbot_id,
  ch.clerk_user_id,
  ch.name,
  ch.created_at AS chatbot_created_at,
  chc.id AS characteristic_id,
  chc.chatbot_id AS characteristic_chatbot_id,
  chc.content
FROM chatbots ch
LEFT JOIN chatbot_characteristics chc
ON ch.id = chc.chatbot_id
WHERE ch.id = $1
    `
    const result = await query(qry, [id])
    console.error('res', result)

    const data = result.map((row: any) => ({
      ...row,
      chatbot_created_at: row.chatbot_created_at.toISOString(),
    }))

    console.log("name", result)
    return NextResponse.json(data)

  } catch (error) {

    console.log('ERROR: API - ', (error as Error).message)

    const response = {
      error: (error as Error).message,

      returnedStatus: 200,
    }

    return NextResponse.json(response, { status: 500 })
  }
}





export async function DELETE(request: NextRequest) {
  const pathParts = request.url.split('/')
  const id = pathParts[pathParts.length - 1]

  console.log('Deleting chatbot id:', id)

  const client = await pool.connect()
  try {
    await client.query('BEGIN')

    // delete characteristics first
    await client.query(
      'DELETE FROM chatbot_characteristics WHERE chatbot_id = $1',
      [id]
    )

    // delete chatbot
    const result = await client.query(
      'DELETE FROM chatbots WHERE id = $1 RETURNING *',
      [id]
    )

    await client.query('COMMIT')

    console.log('Deleted chatbot:', result.rows)
    return NextResponse.json(result.rows, { status: 200 })
  } catch (error) {
    
    await client.query('ROLLBACK')
    console.log('Error deleting chatbot:', error)
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 500 }
    )
  } finally {
    client.release()
  }
}


export async function PUT(request: NextRequest) {

  try {

    const resJson = await request.json()
    const newName = resJson.name
    const id = resJson.id

    const updateQuery = `UPDATE chatbots SET name = $1 WHERE id = $2 RETURNING *`
    const result = await query(updateQuery, [newName, id])

    const data = result.map((row: any) => ({
      ...row,
      created_at: row.created_at.toISOString(),
    }))

    console.log('Updated data:', data)
    return NextResponse.json(data, { status: 200 })


  } catch (error) {

    console.log('ERROR PUT:', error)
    return NextResponse.json({ message: 'Error in server' }, { status: 500 })

  }
}




