const { default: axios } = require("axios");
const { google } = require("googleapis");


require("dotenv").config();

const oauth2Client = new google.auth.OAuth2(
  process.env.CLIENT_ID,
  process.env.CLIENT_SECRET,
  process.env.REDIRECT_URI
);

oauth2Client.refreshAccessToken((err,tokens)=>{
  console.log("Inside refreshAccessToken")
  console.log(tokens)

})
const scopes=[
    'https://www.googleapis.com/auth/gmail.readonly'
]




function getGoogleAuthUrl(){
  return oauth2Client.generateAuthUrl({
    access_type:'offline',
    prompt:'consent',
    scope:scopes
  })
}


async function getGoogleUser(){
  const {tokens}= await oauth2Client.getAccessToken();
  const url='https://gmail.googleapis.com/gmail/v1/users/walterwhitebr16@gmail.com/messages'
  const googleUser= await axios(url,{
    headers:{
      Authorization:`Berer ${tokens.id_token}`
    }
  }).then(res=>{
    console.log(res.data)
   return res.data
  }).catch(err0r=>{
    console.log(error.message)
    throw new Error(error.message)
  })

  return  googleUser
}


// getGoogleUser()

