const {Client, Attachment} = require('discord.js');
const bot = new Client();
const PREFIX = '!';
const mysql = require("mysql");


var con = mysql.createConnection({
    host: "db4free.net",
    port: "3306",
    user: "konradoslaw",
    password: "Acocieto?",
    database: "projekty",

});

con.connect(err => {
    if(err) throw err;
   console.log("Connected to database!");
   con.query("SHOW TABLES", console.log);
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
        case 'suspect':

            //    !suspect Gitara520 D02, D03, D04, D05 imgur.com/
            //           0      1                           n-1
            var lastelement = args.length;
            for (var i = 2; i <= lastelement - 1; i++) {
                var reasons = reasons + args[i];
            }
            message.channel.sendMessage("Wanted: ", args[1], " Reasons: ", reasons, " Proof: ", args[lastelement]);
            break;
    }
 
});


bot.login(process.env.token);
