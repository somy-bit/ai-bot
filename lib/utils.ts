import { Message, SessionContent } from "@/types/types"
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export interface IDBSettings {
  host: string

  port: number 

  user: string

  password: string

  database: string
}

export const GetDBSettings = (): IDBSettings => {
 
    return {
      host: process.env.host!, //'58.84.143.251',

      port: parseInt(process.env.port!),

      user: process.env.user!,

      password: process.env.password!,

      database: process.env.database!,
    }
}

export const mergeObject = (arr: Record<string, unknown>[]): Record<string, unknown>=>{
  if(!arr.length)return{}

   const common: Record<string, unknown> = {}
  const merged: Record<string, unknown> = {}

  const keys = Object.keys(arr[0]);
  keys.forEach(key=>{

    const firstVal = arr[0][key];
    let isCommon = true
    for (let i = 1; i<arr.length;i++){
      if(arr[i][key] !== firstVal){
        isCommon = false;
        break;
      }
    }

    if(isCommon){
      common[key] = firstVal
    }
  })

  arr.forEach((obj)=>{
    Object.entries(obj).forEach(([key,value])=>{
      merged[key]=value
    })
  })

  return {...merged,...common}

}

export const extractMessage = (data:SessionContent[]) =>{

  const messages:Message[] = []
  data.map(item=>{
    messages.push({sender:item.sender,chat_session_id:item.chat_session_id,content:item.content,id:item.id,created_at:item.created_at})
  })

  return messages
}