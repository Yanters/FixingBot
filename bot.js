const {Client, Attachment} = require('discord.js');
const bot = new Client();
const PREFIX = '!';


bot.on('ready', () =>{
    console.log('This bot is online!');
});
bot.on('message', message=>{
 
 
 
 let args = message.content.substring(PREFIX.length).split(" ");

  
  
 switch(args[0]){
    
        case 'sin':
            var a = parseFloat(args[1]);
            a = Math.sin(a* Math.PI / 180);
            message.channel.sendMessage(a.toFixed(4));
            break;
        
    }
 
});

 


bot.login(process.env.token);
