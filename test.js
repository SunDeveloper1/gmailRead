const inputString = "Nobisuki Nobita <nobitanobisuki2@gmail.com>";
const regex = /<([^>]+)>/;
const match = inputString.match(regex);

if (match) {
  const extractedString = match[1];
  console.log(extractedString);
} else {
  console.log("No string inside angle brackets found.");
}


let base64String="R21haWwgQVBJIHRlc3RpbmcNCg=="
const buffer = Buffer.from(base64String, 'base64');

// Convert the Buffer to a string
const decodedString = buffer.toString('utf8');

console.log(decodedString);