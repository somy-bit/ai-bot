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
  // const env = process.env.NODE_ENV

  // if (env == 'development')
  //   return {
  //     host: process.env.host_dev!, //'58.84.143.251',

  //     port: parseInt(process.env.port_dev!),

  //     user: process.env.user_dev!,

  //     password: process.env.password_dev!,

  //     database: process.env.database_dev!,
  //   }
  // else
    return {
      host: process.env.host!, //'58.84.143.251',

      port: parseInt(process.env.port!),

      user: process.env.user!,

      password: process.env.password!,

      database: process.env.database!,
    }
}

export const mergeObject = (arr:any)=>{
  if(!arr.length)return{}

  const common:any={}
  const merged:any = {}

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

  arr.forEach((obj:any)=>{
    Object.entries(obj).forEach(([key,value])=>{
      merged[key]=value
    })
  })

  return {...merged,...common}

}

export const extractMessage = (data:SessionContent[]) =>{

  let messages:Message[] = []
  data.map(item=>{
    messages.push({sender:item.sender,chat_session_id:item.chat_session_id,content:item.content,id:item.id,created_at:item.created_at})
  })

  return messages
}