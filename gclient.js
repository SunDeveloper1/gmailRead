require("dotenv").config();

const { google }=require('googleapis')


const scopes = ['https://www.googleapis.com/auth/gmail.readonly','https://www.googleapis.com/auth/gmail.modify',
'https://www.googleapis.com/auth/gmail.compose','https://www.googleapis.com/auth/gmail.send'];

//------Authentication-----------------
const oAuth2Client = new google.auth.OAuth2(
    process.env.CLIENT_ID,
    process.env.CLIENT_SECRET,
    process.env.REDIRECT_URI
  );

oAuth2Client.setCredentials({
    refresh_token:process.env.REFRESH_TOKEN
})

const authorizationUrl = oAuth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: scopes,
    include_granted_scopes: true
  });

  console.log('Authorize this app by visiting this url:', authorizationUrl);

//   oAuth2Client.on('tokens', (tokens) => {
//     if (tokens.refresh_token) {
//       // store the refresh_token in your secure persistent database
//       console.log(tokens.refresh_token);
//     }
//     console.log(tokens.access_token);
//   });



const gmailservice=new google.gmail({
    version:'v1',
    auth:oAuth2Client
})

//-----Authentication-----


async function listMessages(userId){

    const messages=await gmailservice.users.messages.list({
        userId:userId,
        format: 'full',
        q:'from:nobitanobisuki2@gmail.com'
    })
    return messages
  
    
}

async function getMessageDetails(userId,id){

    const fullMessage=await gmailservice.users.messages.get({
        userId:userId,
        id:id,
        format:'full'
        
    })

    return fullMessage.data;
}



async function getAllDetailsMessages(){

    let response;
    let promiseArray=[];

    let userId ='walterwhitebr16@gmail.com'

    let res=await listMessages(userId)
    let messages=res.data.messages ?? [];
    console.log("Messages--------\n",messages)



    messages.forEach(element => {
        promiseArray.push(getMessageDetails(userId,element.id))
        
    });

    response=await Promise.all(promiseArray);
    console.log("Promise Array", response)
    return response;



}

getAllDetailsMessages()


module.exports={
    getMessage:getAllDetailsMessages
}

