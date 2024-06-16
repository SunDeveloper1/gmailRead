
// const data=require('./payload.json')
const data=require('./gattachment.json')



function extractEmails(headers,headerName) {
    const header = headers.find(header => header.name === headerName);
    if (header) {
        const emails = header.value.match(/\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}\b/gi);
        return emails ? emails : [];
    }
    return [];
}

function extractName(headers,headerName) {
    const header = headers.find(header => header.name === headerName);
    if (header) {
        const match = header.value.match(/^(.*?)\s*<.*?>$/);
        return match ? match[1] : null;
    }
    return null;
}

function extractBody(parts, mimeType) {
    // Find the part with matching mimeType
    const part = parts.find(part => part.mimeType === mimeType && part.filename === "" && part.body.data);


    if (part) {
        // Decode base64-encoded data
        const base64Data = part.body.data;
        const decodedData = Buffer.from(base64Data, 'base64').toString('utf-8');
        
        return decodedData;
    }
    else if(parts.find(part=>part.parts)){
        const data=parts.find(part=>part.parts)
        return extractBody(data.parts,mimeType)
    }
    else{
        return null; // Return null if no matching part is found
    }
}

function extractAttachmentIds(parts) {
    let attachmentIds = [];
    if (!data) return attachmentIds;
    const attachments= parts.filter(part => part.body && part.body.attachmentId)
   .map(part => part.body.attachmentId)
    return attachments;
  
}

const newStandardpayload=data.map(payload=>{
    let cx_mail
    let cx_name
    let message_id
    let toRecipients
    let ccReceipients
    let htmlContent
    let subject;
    let bodyPreview;
    let bodyContent
    let dateRecieved
    let attachmentIds=[]
    let attachmentFlag=false
    let parts=payload.payload.parts
    let headers=payload.payload.headers
    toRecipients=extractEmails(headers,'To').toString()
    ccReceipients=extractEmails(headers,'Cc').toString()
    cx_mail=extractEmails(headers,'From').toString()
    cx_name=extractName(headers,'From')
    subject=headers.find(header => header.name === 'Subject').value
    dateRecieved=headers.find(header => header.name === 'Date').value
    dateRecieved=new Date(dateRecieved).toISOString()
    bodyPreview=extractBody(parts,'text/plain')
    attachmentIds=extractAttachmentIds(parts)
    attachmentFlag=attachmentIds.length >0 ? true:false
    

    // headers.forEach(element=>{
    //     if(element.name === "FROM"){
    //         const inputString = "Nobisuki Nobita <nobitanobisuki2@gmail.com>";
    //         const regex = /<([^>]+)>/;
    //         const match = inputString.match(regex);
    //         if (match) {
    //             const extractedString = match[1];
    //             cx_mail=extractedString
    //           }

    //           const inputString2 = "Nobisuki Nobita <nobitanobisuki2@gmail.com>";
    //           const regex2 = /^([^<]+) /;
    //           const match2 = inputString2.match(regex2);
              
    //           if (match2) {
    //             const extractedString = match[1];
    //             cx_name=extractedString
    //           }   
    //     }
    //     if(element.name === "Subject"){
    //         subject = element.value
    //     }
        
    // })
    

    return{

        id:payload.id,
        threadId:payload.threadId,
        bodyPreview:bodyPreview,
        cx_mail:cx_mail,
        cx_name:cx_name,
        subject:subject,
        bodyPreview:bodyPreview,
        toRecipients,
        ccReceipients,
        dateRecieved,
        attachmentIds,
        attachmentFlag
        

    }
})


console.log(newStandardpayload)