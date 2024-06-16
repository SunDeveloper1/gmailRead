const { google }=require('googleapis')


require("dotenv").config();
const oAuth2Client = new google.auth.OAuth2(
    process.env.CLIENT_ID,
    process.env.CLIENT_SECRET,
    process.env.REDIRECT_URI
  );
  
  oAuth2Client.setCredentials({ refresh_token: process.env.REFRESH_TOKEN });

const getTimestamp = (date) => {
    return Math.floor(new Date(date).getTime() / 1000);
}
const fetchInboxMessages=async ()=>{

   const gclient= google.gmail({
       auth:oAuth2Client,
       version:'v1'
    })

    try{

        // let startTimestamp=1718404256
        // let endTimestamp=1718406716
        // const query = `after:${startTimestamp} before:${startTimestamp}`;
        const secondsSinceEpoch = (date) => Math.floor(date.getTime() / 1000);
        const after = new Date();
        const before = new Date();
        after.setHours(22, 15, 0, 0);
        before.setHours(23, 15, 0, 0);
        const query = `after:${secondsSinceEpoch(after)} before:${secondsSinceEpoch(before)}`
        
        
        let messages=await gclient.users.messages.list({
            maxResults:10,
            userId:'me',
            q:query,
            

        })
      
        messages = messages.data.messages || [];
        console.log("messages", messages)
        if (messages.length) {
            console.log('Messages:');
            for (const message of messages) {
                const msg = await gclient.users.messages.get({ userId: 'me', id: message.id ,format:'full'});
                console.dir(msg.data);
            }
        } else {
            console.log('No messages found.');
        }
        return messages.data;

    }catch(e){
        console.log(e)
    }

}

fetchInboxMessages()

