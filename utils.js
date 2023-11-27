const generateConfig = (url, accessToken) => {
  console.log("Access tokens: " + accessToken)
    return {
      method: "get",
      url: url,
      headers: {
        Authorization: `Bearer ${accessToken} `,
        "Content-type": "application/json",
      },
      params:{
        q:"after:2023/07/28 before:2023/08/01"
      }
      
    };
  };
  
  module.exports = { generateConfig };