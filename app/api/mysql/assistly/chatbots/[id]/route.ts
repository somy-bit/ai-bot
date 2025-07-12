import mysql from 'mysql2/promise';
import { NextResponse, NextRequest } from 'next/server'
import mysqlQuery from '../../mysqlQuery';


export async function GET(request: NextRequest) {


  try {


    const id = request.url.split('/')[request.url.split('/').length-1]
    
    console.log("testing results",request.url.split('/')[request.url.split('/').length-1])

     let query = `SELECT * from chatbots ch INNER JOIN  chatbot_characteristics chc ON ch.id = chc.chatbot_id where ch.id=?`

     const result = await mysqlQuery(query,[id])


    console.log("name",result)
    return NextResponse.json(result)

  } catch (error) {

    console.log('ERROR: API - ', (error as Error).message)

    const response = {
      error: (error as Error).message,

      returnedStatus: 200,
    }

    return NextResponse.json(response, { status: 200 })
  }
}



export async function DELETE(request:NextRequest) {

  // if(request.method == "delete")
    try{
   

      const pathParts = request.url.split("/")
      const id = pathParts[pathParts.length - 1]

      console.log("deleting id would be..", id)

      let query = "DELETE chatbots,chatbot_characteristics FROM chatbots JOIN chatbot_characteristics ON chatbots.id=chatbot_characteristics.chatbot_id  where chatbots.id=?"
      const result = await mysqlQuery(query, [id])

      console.log("name", result)
      return NextResponse.json(result,{status:200})


  }catch(error){

    console.log(error)
    return NextResponse.json({"message":"error in server"},{status:500})
  }
  
}

export async function PUT(request:NextRequest){

  try {

    const resJson = await request.json()
    const newName = resJson.name
    const id = resJson.id

    let query = "UPDATE chatbots SET name = ? where id =?"

    const result  =  await mysqlQuery(query,[newName,id])

    console.log("altered data", result)
    
    return NextResponse.json(result,{status:200})


  }catch(error){

    
    console.log(error)
    return NextResponse.json({"message":"error in server"},{status:500})

  }
}




