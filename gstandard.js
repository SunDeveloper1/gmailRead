
const data=require('./payload.json')

console.log(data)

const newStandardpayload=data.map(payload=>{
    let cx_mail
    let cx_name
    let subject;
    let bodyPreview;
    let bodyContent
    let headers=payload.payload.headers
    headers.forEach(element=>{
        if(element.name === "FROM"){
            const inputString = "Nobisuki Nobita <nobitanobisuki2@gmail.com>";
            const regex = /<([^>]+)>/;
            const match = inputString.match(regex);
            if (match) {
                const extractedString = match[1];
                cx_mail=extractedString
              }

              const inputString2 = "Nobisuki Nobita <nobitanobisuki2@gmail.com>";
              const regex2 = /^([^<]+) /;
              const match2 = inputString2.match(regex2);
              
              if (match2) {
                const extractedString = match[1];
                cx_name=extractedString
              }   
        }
        if(element.name === "Subject"){
            subject = element.value
        }
        
    })
    let body=payload.payload.parts[0].body.data
    const buffer = Buffer.from(body, 'base64');
    bodyPreview = buffer.toString('utf8');

    return{

        id:payload.id,
        threadId:payload.threadId,
        bodyPreview:payload.snippet,
        cx_mail:cx_mail,
        cx_name:cx_name,
        subject:subject,
        bodyPreview:bodyPreview
        

    }
})


console.log(newStandardpayload)