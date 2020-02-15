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

});

bot.on('ready', () =>{
    console.log('This bot is online!');
});
bot.on('message', message=>{
 
 
 
 let args = message.content.substring(PREFIX.length).split(" ");
  switch(args[0]){
    
      
         case 'suspect':

            //    !suspect Gitara520 D02, D03, D04, D05 imgur.com/
            //           0      1                           n-1
            var lastelement = args.length;
           var reasons = "";
            for (var i = 2; i <= lastelement - 2; i++) {
                reasons = reasons +" "+ args[i];
            }
            let stmt = `INSERT INTO Wanted (Nick, Reasons, Proof, Data)
            VALUES(?,?,?,?)`;
           
            const now = new Date();
            var czasomierz= ``;
            if(now.getMonth >= 10 && now.getDate >=10)
            {
                czasomierz = `${now.getDate()}.${now.getMonth()+1}.${now.getFullYear()} ${now.getHours()}:${now.getMinutes()}`;
            }else if(now.getMonth < 10 && now.getDate >=10)
            {
                czasomierz = `${now.getDate()}.0${now.getMonth()+1}.${now.getFullYear()} ${now.getHours()}:${now.getMinutes()}`;
            }else if(now.getMonth >= 10 && now.getDate <10)
            {
                czasomierz = `0${now.getDate()}.0${now.getMonth()+1}.${now.getFullYear()} ${now.getHours()}:${now.getMinutes()}`;
            }else
            {
                czasomierz = 'Blad';
            }
let todo = [args[1] , reasons , args[lastelement-1], czasomierz];
            con.query(stmt, todo, (err)=> {
                if(err) throw err;
                console.log("Successfully added to the database!");
            });
            message.channel.sendMessage("> Wanted: " + args[1] + " Reasons: " + reasons + " Proof: " + args[lastelement-1]);
          
           break;
           case 'caught':
            con.query(`DELETE FROM Wanted WHERE Nick = '${args[1]}'`, err => {
                if(err) throw err;
                console.log(args[1]+ ' has been cought!');
            });
            message.channel.sendMessage(args[1]+ ' has been cought!');
          break;
      case 'amnestia':
        con.query(`DELETE FROM Wanted WHERE ID != 0`, err => {
            if(err) throw err;
            console.log('Amnesia has been done correctly!');
        });
        message.channel.sendMessage('Amnesia has been done correctly!');
          break;
    }
 
});


bot.login(process.env.token);
