
import { NextResponse, NextRequest } from 'next/server'
import {query} from '@/lib/db'




export async function POST(request: Request) {

    try{

        const body = await request.json();
        const name = body.name
        const email = body.email

        console.log('Inserting guest:', name, email)

    const qry = `
      INSERT INTO guests (name, email)
      VALUES ($1, $2)
      RETURNING id
    `

    const result = await query(qry, [name, email])
        
   return NextResponse.json({ id: result[0].id }, { status: 200 })

  } catch (error) {
    console.error('ERROR inserting guest:', error)
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 500 }
    )
  }

 
}