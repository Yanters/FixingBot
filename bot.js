const {Client, Attachment} = require('discord.js');
const bot = new Client();



bot.on('ready', () =>{
    console.log('This bot is online!');
});
bot.on('message', message=>{
 
  if(message.content==='ping')
  {
  message.reply('pong');
  }
 let args = message.content.substring(PREFIX.length).split(" ");
 let arg = message.content.toLowerCase();
  /* if(repeat) 
    {
    for (var i=0;i<arg.length;i++)
        {
    if(arg[i]=== 'x' && arg[i+1]==='d')
            {
            message.channel.sendMessage('XD');
            repeat = false;
            }   
        }
    }else
    {
        repeat=true;
    }
 */
  for (var i=0;i<arg.length;i++)
        {
    if(arg[i]=== 'c' && arg[i+1]==='r'&& arg[i+1]==='a'&& arg[i+1]==='z'&& arg[i+1]==='e'&& arg[i+1]==='q')
            {
            message.channel.sendMessage('stulejarz');
            
            }   
        }
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
        case 'norberto':
            var attachment = new Attachment ('https://media.discordapp.net/attachments/572769012551778304/632685975725670421/unknown.png');
            message.channel.sendMessage(attachment);
            break;
        case 'graph':
            if(args[1]=='sin'){
                var attachment = new Attachment ('https://www.matemaks.pl/grafika/g0068.png');
            }
            if(args[1]=='cos'){
                var attachment = new Attachment ('https://www.matemaks.pl/grafika/g0069.png');
            }
            if(args[1]=='tg'){
                var attachment = new Attachment ('https://www.matemaks.pl/grafika/g0070.png');
            }
            if(args[1]=='ctg'){
                var attachment = new Attachment ('https://www.matemaks.pl/grafika/g0071.png');
            }
            message.channel.sendMessage(attachment);
            break;
        case 'img':
            var allargs="";
              var step;
                for (step = 1; step < args.length; step++) 
                {
                        allargs+=args[step]+" ";
                }
             image(message,allargs);
            break;
        case 'help':
            message.channel.sendMessage(args.length)
            break;
        case 'clear':
            // Member doesn't have permissions
            if (!message.member.hasPermission("MANAGE_MESSAGES")) {
                return message.reply("You can't delete messages....").then(m => m.delete(3000));
            }
    
            // Check if args[1] is a number
            if (isNaN(args[1]) || parseInt(args[1]) <= 0) {
                return message.reply("Yeah.... That's not a numer? I also can't delete 0 messages by the way.").then(m => m.delete(3000));
            }
    
            // Maybe the bot can't delete messages
            if (!message.guild.me.hasPermission("MANAGE_MESSAGES")) {
                return message.reply("Sorryy... I can't delete messages.").then(m => m.delete(3000));
            }
    
            let deleteAmount;
    
            if (parseInt(args[1]) > 100) {
                deleteAmount = 100;
            } else {
                deleteAmount = parseInt(args[1]);
            }
    
            message.channel.bulkDelete(deleteAmount, true)
                .then(deleted => message.channel.send(`I deleted \`${deleted.size}\` messages.`))
                .then(m => m.delete(3000));
            break;                
        
    }
 
 
 
});

function image(message,search){
 
    var options = {
        url: "http://results.dogpile.com/serp?qc=images&q=" + search,
        method: "GET",
        headers: {
            "Accept": "text/html",
            "User-Agent": "Chrome"
        }
    };
 
 
 
 
 
    request(options, function(error, response, responseBody) {
        if (error) {
            return;
        }
 
 
        $ = cheerio.load(responseBody);
 
 
        var links = $(".image a.link");
 
        var urls = new Array(links.length).fill(0).map((v, i) => links.eq(i).attr("href"));
       
        console.log(urls);
 
        if (!urls.length) {
           
            return;
        }
 
        // Send result
        message.channel.send( urls[Math.floor(Math.random() * urls.length)]);
    });
 
 
}

bot.login(process.env.token);
