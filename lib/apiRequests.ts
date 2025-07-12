import { NextResponse } from "next/server"

export const handleDelete = async(path:string)=>{
    try{

        const res =  await fetch(path,
            {method:"DELETE"}
        )
        
        console.log(res)
        return res

    }catch(error){
        
        console.log('delete error...............',error)
        return  NextResponse.json({'message':'error'})
    }
   
}