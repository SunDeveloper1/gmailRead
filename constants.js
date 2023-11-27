require("dotenv").config();

const auth = {
  type: "OAuth2",
  user: "walterwhitebr16@gmail.com",
  clientId: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET,
  refreshToken: process.env.REFRESH_TOKEN,
};

console.log("Auth Cred\n", auth)

const mailoptions = {
  from: "Vivek <walterwhitebr16@gmail.com>",
  to: "walterwhitebr16@gmail.com",
  subject: "Gmail API NodeJS",
};

module.exports = {
  auth,
  mailoptions,
};