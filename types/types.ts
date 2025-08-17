export interface Chatbot{
    id:number;
    clerk_user_id:string;
    created_at:string;
    chatbot_characteristics:ChatbotCharacteristic[];
    chat_session :ChatSession[]
    name:string;
    content:string;
    chatbot_id:number;
}

export interface JoinChatbot extends Chatbot{
    chars:string[]
}

export interface ChatSession{
    id:number;
    chatbot_id:number;
    guest_id:number|null;
    created_at:string;
    messages:Message[];
    guests:Guest[]

}
export interface SessionContent extends Message{
    id:number;
    chatbot_id:number;
    guest_id:number;
    created_at:string;
    guest_name:string;
    email:string;
 
  }
export interface AllSessionInfo{
    id:number;
    clerk_user_id:string;
    created_at:string;
    chatbot_id:number;
    guest_id:number;
    guest_name:string;
    email:string;
    name:string;
    cb_id:number;
    chs_id :number;

}

export interface SortSession extends AllSessionInfo{
    session:[]
}

export interface ChatbotCharacteristic{
    id:number;
    chatbot_id:number;
    content : string;
    created_at:string;
}

export interface Guest{
    id:number;
    name:string;
    email:string;
    created_at:string;
}

export interface Message{
    id:number;
    chat_session_id:number;
    content:string;
    created_at:string;
    sender:"ai"|"user"
}

export interface JoinResults{
    chatbot_id:string;
    clerk_user_id:string;
    name: string;
    chatbot_created_at: string;
    characteristic_id: string;
    characteristic_chatbot_id: string;
    content: string;
}