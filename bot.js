const {Client, Attachment} = require('discord.js');
const bot = new Client();


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
bot.login(process.env.token);
