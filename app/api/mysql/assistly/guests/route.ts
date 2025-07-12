
import { NextResponse, NextRequest } from 'next/server'
import mysql from 'mysql2/promise'
import { GetDBSettings} from '../../../../../lib/utils'
import { ResultSetHeader } from 'mysql2'

// define and export the GET handler function
let connectionParams = GetDBSettings()

export async function POST(request: Request) {

    try{

        const body = await request.json();
        const name = body.name
        const email = body.email

        let query = "INSERT INTO guests (guest_name,email) VALUES (?,?)"

        
            const db =await mysql.createConnection(connectionParams)
        
            const [result] = await db.execute<ResultSetHeader>(query,[name,email])
        
            await db.end()
        
            return NextResponse.json({id:result.insertId},{status:200})
    
    
    }catch(error){

        throw error

    }

 
}