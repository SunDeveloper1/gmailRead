const axios = require("axios");
const { generateConfig } = require("./utils");
const nodemailer = require("nodemailer");
const CONSTANTS = require("./constants");
const { google } = require("googleapis");
const { getMessage}=require("./gclient")

require("dotenv").config();

const oAuth2Client = new google.auth.OAuth2(
  process.env.CLIENT_ID,
  process.env.CLIENT_SECRET,
  process.env.REDIRECT_URI
);

oAuth2Client.setCredentials({ refresh_token: process.env.REFRESH_TOKEN });

async function sendMail(req, res) {
  try {
  } catch (error) {
    console.log(error);
    res.send(error);
  }
}

async function getUser(req, res) {
  try {
    const url = `https://gmail.googleapis.com/gmail/v1/users/${req.params.email}/messages`;
    const { token } = await oAuth2Client.getAccessToken();
    const config = generateConfig(url, token);
    const response = await axios(config);
    res.json(response.data);
  } catch (error) {
    console.log(error);
    res.send(error);
  }
}

async function getMailDetailsUsingID(req, res) {
  try {
    const url = `https://gmail.googleapis.com/gmail/v1/users/${req.params.email}/messages/${req.params.id}`;
    const { token } = await oAuth2Client.getAccessToken();
    const config = generateConfig(url, token);
    const response = await axios(config);
    res.json(response.data);
  } catch (error) {
    console.log(error);
    res.send(error);
  }
}

async function getDrafts(req, res) {
  try {
  } catch (error) {
    console.log(error);
    return error;
  }
}

async function readMail(req, res) {
  try {
    // const emailId='walterwhitebr16@gmail.com';
    // const url = `https://gmail.googleapis.com/gmail/v1/users/${emailId}/messages/${req.params.messageId}`;
    // const { token } = await oAuth2Client.getAccessToken();
    // const config = generateConfig(url, token);
    // const response = await axios(config);

    let response= await getMessage();
    console.log(JSON.stringify(response));
    return res.status(200).json(response)


  } catch (error) {
    console.log(error);
    res.send(error);
  }
}

async function readAttachments(req, res) {
  try {
    const emailId='walterwhitebr16@gmail.com';
    const url = `https://gmail.googleapis.com/gmail/v1/users/${emailId}/messages/${req.params.messageId}/attachments/${req.params.attachmentId}`;
    const { token } = await oAuth2Client.getAccessToken();
    const config = generateConfig(url, token);
    const response = await axios(config);
    res.json(response.data);
  } catch (error) {
    console.log(error);
    res.send(error);
  }
}

module.exports = {
  readAttachments,
  getUser,
  sendMail,
  getDrafts,
  readMail,
  getMailDetailsUsingID
};