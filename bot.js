const {Client, Attachment} = require('discord.js');
const bot = new Client();
const cheerio = require('cheerio');
 
const request = require('request');
repeat = new Boolean(true);
const token = process.env.token;
const PREFIX = '!';
bot.on('ready', () =>{
    console.log('This bot is online!');
})
bot.on('message', message=>{
 
  if(message.content==='ping')
  {
  message.reply('pong');
  }
 
 
 
 
}
bot.login(token);
