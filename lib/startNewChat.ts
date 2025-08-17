export default async function startNewChat(guestName:string,guestEmail:string,chatbotId:number){

    try{

        const res= await fetch("/api/mysql/assistly/guests",{
            method:"POST",
            body:JSON.stringify({
                name:guestName,
                email:guestEmail,

            })
        })

        const {id} =await res.json()

        const sessionres = await fetch("/api/mysql/assistly/sessions",{
            method:"POST",
            body:JSON.stringify({
                guestId :id,
                chatbotId:chatbotId
            })
        })

        const {sessionId} = await sessionres.json()

        const messsgeRes = await fetch("/api/mysql/assistly/messages",{
            method:"POST",
            body:JSON.stringify({
                chatSessionId:sessionId,
                sender:"ai",
                content : `hello ${guestName} how can I help you today?`
            })
        })


        return sessionId

    }catch(error){
       console.log("error",error)
    }
}