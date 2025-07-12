import React from 'react'
import mysql from 'mysql2/promise'
import { GetDBSettings, IDBSettings } from '../../../../lib/utils'

// define and export the GET handler function
let connectionParams = GetDBSettings()

const mysqlQuery= async(query:string,data:string[]) =>{

    const db =await mysql.createConnection(connectionParams)

    const [result] = await db.execute(query,data)

    await db.end()

    return result
 
}

export default mysqlQuery