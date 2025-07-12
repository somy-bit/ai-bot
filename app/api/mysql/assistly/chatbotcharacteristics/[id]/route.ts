import mysql from 'mysql2/promise';
import { NextResponse, NextRequest } from 'next/server'
import mysqlQuery from '../../mysqlQuery';


export async function DELETE(request: NextRequest) {
  if (request.method === "DELETE") 
  try {

    console.log('enterd delete route .....')

    

      const pathParts = request.url.split("/")
      const id = pathParts[pathParts.length - 1]

      console.log("deleting id would be..", id)

      let query = "DELETE FROM chatbot_characteristics where id=?"
      const result = await mysqlQuery(query, [id])

      console.log("name", result)
      return NextResponse.json(result,{status:200})
      
   
 

  } catch (error) {

    console.log('ERROR: API - ', (error as Error).message)

    const response = {
      error: (error as Error).message,

      returnedStatus: 200,
    }

    return NextResponse.json(response, { status: 500 })
  }
}


