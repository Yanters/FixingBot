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
           var proof = "";
           var pproof= "";
            for (var i = 2; i <= lastelement - 2; i++) {
                if(args[i]!="[ATAK]"){
                reasons = reasons +" "+ args[i];
                }else
                {
                    proof=i;
                    break;
                }
            }
            for (var i = proof; i <= lastelement - 1; i++) {
                pproof= pproof +" "+ args[i];
            }
            let stmt = `INSERT INTO Wanted (Nick, Reasons, Proof, Data, Reporter)
            VALUES(?,?,?,?,?)`;
           
            const now = new Date();
            var czasomierz= ``;
                               
             if(now.getDate() >=10)
             {
                czasomierz = `${now.getDate()}`;
             }else
             {
                czasomierz = `0${now.getDate()}`;
             }
             if((now.getMonth()+1) >= 10)
             {
                 czasomierz = czasomierz + `.${now.getMonth()+1}.${now.getFullYear()} ${now.getHours()}:`;
            }else
            {
               czasomierz = czasomierz + `.0${now.getMonth()+1}.${now.getFullYear()} ${now.getHours()}:`
            }
            if((now.getMinutes()) >= 10)
            {
                czasomierz = czasomierz + `${now.getMinutes()}`;
            }else
            {
                czasomierz = czasomierz + `0${now.getMinutes()}`;
            }

            let todo = [args[1] , reasons , pproof, czasomierz, message.author.username];
            con.query(stmt, todo, (err)=> {
                if(err) throw err;
                console.log("Successfully added to the database!");
            });
            message.channel.sendMessage("> Wanted: " + args[1] + " Reasons: " + reasons + " Proof: " + pproof);
            message.channel.bulkDelete(2, true)
                .then(m => m.delete(3000));
          
           break;
           case 'caught':
            if(args.length>2)
            {
               message.channel.sendMessage('Wpisz poprawnie komendę: !caught nick');
               message.channel.bulkDelete(2, true)
                .then(m => m.delete(3000));
               break;
            }
            con.query(`DELETE FROM Wanted WHERE Nick = '${args[1]}'`, err => {
                if(err) throw err;
                console.log(args[1]+ ' has been cought!');
            });
            message.channel.sendMessage(args[1]+ ' has been cought!');
            message.channel.bulkDelete(2, true)
                .then(m => m.delete(3000));
          break;
      case 'amnestia':
         if(args.length>1)
         {
            message.channel.sendMessage('Wpisz poprawnie komendę: !amnestia');
            message.channel.bulkDelete(2, true)
                .then(m => m.delete(3000));
            break;
         }
        con.query(`DELETE FROM Wanted WHERE ID != 0`, err => {
            if(err) throw err;
            console.log('Amnesia has been done correctly!');
        });
        message.channel.sendMessage('Amnesia has been done correctly!');
        message.channel.bulkDelete(2, true)
                .then(m => m.delete(3000));
          break;
    }
 
});


bot.login(process.env.token);
