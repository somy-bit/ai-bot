'use client'
import { SessionContent } from "@/types/types";
import Messages from "@/components/Messages";
import { extractMessage } from "@/lib/utils";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

 const BaseUrl = process.env.NEXT_PUBLIC_BASE_URL ;

export default function ReviewSessionContent() {

  alert(BaseUrl)

  const params = useParams();
  const [messages, setMessages] = useState<SessionContent[]>([]);
  const sessionId = params.id as string;
 
console.log('base url',BaseUrl)
  useEffect(() => {

    async function getData() {
     
      const res = await fetch(`/api/mysql/assistly/sessions/${sessionId}`);
      const contents: SessionContent[] = await res.json();
      const sessionmessages = extractMessage(contents) as SessionContent[];
      setMessages(sessionmessages)
    }

    if (!sessionId) {
      return;
    }

    getData()

  }, [sessionId])

 if (!sessionId) {
    return <div className="flex-1 p-10 pb-24">Session ID is missing.</div>;
  }

  return (
    <div className="flex-1 p-10 pb-24">
      <h1 className="text-lg lg:text-3xl font-semibold">Session Review</h1>
      <Messages contents={messages} />
    </div>
  );
}
