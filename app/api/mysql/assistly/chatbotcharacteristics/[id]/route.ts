import { NextResponse, NextRequest } from 'next/server'
import { query } from '@/lib/db'


export async function DELETE(request: NextRequest) {
  if (request.method === "DELETE")
    try {


      const pathParts = request.url.split("/")
      const id = pathParts[pathParts.length - 1]

      console.log("deleting id would be..", id)

      const qry = 'DELETE FROM chatbot_characteristics WHERE id = $1 RETURNING *'
      const result = await query(qry, [id])

      console.log('Deleted row:', result)
      return NextResponse.json(result, { status: 200 })
      
    } catch (error) {
      console.log('ERROR: API -', (error as Error).message)
      return NextResponse.json(
        { error: (error as Error).message, returnedStatus: 500 },
        { status: 500 }
      )
    }
}


