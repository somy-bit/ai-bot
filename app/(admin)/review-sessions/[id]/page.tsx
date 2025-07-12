import Messages from "@/components/Messages";
import { extractMessage } from "@/lib/utils";
import { SessionContent } from "@/types/types";


export const dynamic = "force-dynamic";


async function ReviewSession({ params }:{params:any}) {

  const {id} = await params;



  const data  = await fetch(`http://localhost:3000/api/mysql/assistly/sessions/${id}`, { method: "GET" })
  const contents : SessionContent[] = await data.json() 
  const messages = extractMessage(contents)
 

  return (
    <div
      className="flex-1 p-10 pb-24"
    >
      <h1 className="text-lg lg:text-3xl font-semibold">Sission Review</h1>
      <p className="font-light text-xs text-gray-400 mt-2">
        Started At:
      </p>
      <h2 className="font-light mt-2">
        Between {contents[0].chatbot_id} and {" "}{contents[0].guest_name || ""}{"  "}
        <span className="font-extrabold ml-2">{contents[0].email||""}</span> 
      </h2>

      <hr className="my-10"/>

      <Messages 
      contents={messages}
      
      />
      
    </div>
  )
}

export default ReviewSession