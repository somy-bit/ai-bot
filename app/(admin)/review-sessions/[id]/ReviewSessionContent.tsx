'use client'
import { SessionContent } from "@/types/types";
import Messages from "@/components/Messages";
import { extractMessage } from "@/lib/utils";
import { useParams } from "next/navigation";



export default async function ReviewSessionContent() {

  const params = useParams();
  const sessionId = params.id as string;
  if (!sessionId) {
    return <div className="flex-1 p-10 pb-24">Session ID is missing.</div>;
  }
  const BaseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
  const res = await fetch(`${BaseUrl}/api/mysql/assistly/sessions/${sessionId}`);
  const contents: SessionContent[] = await res.json();
  const messages = extractMessage(contents);

  return (
    <div className="flex-1 p-10 pb-24">
      <h1 className="text-lg lg:text-3xl font-semibold">Session Review</h1>
      <Messages contents={messages} />
    </div>
  );
}
