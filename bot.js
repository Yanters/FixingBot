const {Client, Attachment} = require('discord.js');
const bot = new Client();
const PREFIX = '!';
const mysql = require("mysql");


var con = mysql.createConnection({
    host: "https://www.mkwk019.cba.pl/mysql/index.php?token=e20cb33a50b88d78a28885d12222b279#",
    user: "konradoslaw",
    password: "zaq1@WSX",
    database: "konradowo",

});

con.connect(err => {
    if(err) throw err;
   console.log("Connected to database");
});

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
        case 'cos':
            var a = parseFloat(args[1]);
            a = Math.cos(a* Math.PI / 180);
            message.channel.sendMessage(a.toFixed(4));
            break;
        case 'tg':
            var a = parseFloat(args[1]);
            a = Math.tan(a* Math.PI / 180);
            message.channel.sendMessage(a.toFixed(4));
            break;
        case 'ctg':
            var a = parseFloat(args[1]);
            a = Math.tan(a* Math.PI / 180);
            a = Math.pow(a,-1);
            message.channel.sendMessage(a.toFixed(4));
            break;
       
    }
 
});


bot.login(process.env.token);
