const { Client, Attachment } = require('discord.js');
const Discord = require('discord.js');
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
    if (err) throw err;
    console.log("Connected to database!");

});

bot.on('ready', () => {
    console.log('This bot is online!');
});
bot.on('message', message => {



    let args = message.content.substring(PREFIX.length).split(" ");
    switch (args[0]) {
        case 'oblicz':
            function OOblicz(x) {
                var zmienna = x * x * x - x * x + 3;

                return zmienna.toFixed(20);
            }

            ///Kod ZZP
            var eps = 0.0000001;
            var a = 0.0, b = 0.0, c = 0.0;
            a = parseFloat(args[1]);
            b = parseFloat(args[2]);

            console.log("a: " + a.toFixed(20) + " b: " + b.toFixed(20));

            console.log("a: " + a.toFixed(20) + " b: " + b.toFixed(20));
            console.log("parseFloat a: " + parseFloat(OOblicz(a.toFixed(20))));
            console.log("parseFloat b: " + parseFloat(OOblicz(b.toFixed(20))));
            if (parseFloat(OOblicz(a.toFixed(20))) == 0)
                message.channel.sendMessage(parseFloat(a.toFixed(20)));
            if (parseFloat(OOblicz(b.toFixed(20))) == 0)
                message.channel.sendMessage(parseFloat(b.toFixed(20)));
            if (parseFloat(OOblicz(a.toFixed(20))) * parseFloat(OOblicz(b.toFixed(20))) >= 0) {
                message.channel.sendMessage(`W zakresie <${args[1]}:${args[2]}> nie istnieje przecięcie.`);
                break;
            }


            while (Math.abs(a - b) > eps) {
                c = (a + b) / 2.0;

                console.log("c:  " + c.toFixed(20));
                if (parseFloat(OOblicz(c.toFixed(20))) == 0) {
                    message.channel.sendMessage(parseFloat(c.toFixed(20)));
                    break;
                }
                if (parseFloat(OOblicz(a.toFixed(20))) * parseFloat(OOblicz(c.toFixed(20))) < 0) {
                    b = c;

                }
                else {
                    a = c;

                }
            }
            if (isNaN(parseFloat(c.toFixed(20)))) {
                message.channel.sendMessage(`W zakresie <${args[1]}:${args[2]}> nie istnieje przecięcie.`);
            } else {
                message.channel.sendMessage(parseFloat(c.toFixed(20)));
            }
            break;
        case 'ccc':
            message.channel.bulkDelete(3, true)
                .then(m => m.delete(3000));
            break;

        case 'suspect':

            //    !suspect Gitara520 D02, D03, D04, D05 imgur.com/
            //           0      1      2                    3
            var lastelement = args.length;
            var reasons = "";
            var proof = 0;
            var pproof = "";
            for (var i = 2; i <= lastelement - 2; i++) {
                if (args[i] != "[ATAK]") {
                    reasons = reasons + " " + args[i];
                } else {
                    proof = i;
                    break;
                }
            }
            if (proof == 0) {
                proof = lastelement - 1;
            }
            for (var i = proof; i <= lastelement - 1; i++) {
                pproof = pproof + " " + args[i];
            }
            let stmt = `INSERT INTO Wanted (Nick, Reasons, Proof, Data, Reporter)
            VALUES(?,?,?,?,?)`;

            const now = new Date();
            var czasomierz = ``;

            if (now.getDate() >= 10) {
                czasomierz = `${now.getDate()}`;
            } else {
                czasomierz = `0${now.getDate()}`;
            }
            if ((now.getMonth() + 1) >= 10) {
                czasomierz = czasomierz + `.${now.getMonth() + 1}.${now.getFullYear()} ${now.getHours()}:`;
            } else {
                czasomierz = czasomierz + `.0${now.getMonth() + 1}.${now.getFullYear()} ${now.getHours()}:`
            }
            if ((now.getMinutes()) >= 10) {
                czasomierz = czasomierz + `${now.getMinutes()}`;
            } else {
                czasomierz = czasomierz + `0${now.getMinutes()}`;
            }

            let todo = [args[1], reasons, pproof, czasomierz, message.author.username];
            con.query(stmt, todo, (err) => {
                if (err) throw err;
                console.log("Successfully added to the database!");
            });


            message.channel.bulkDelete(50, true)
                .then(m => m.delete(3000));
            con.query("SELECT Nick, Reasons, Proof, Data, Reporter FROM Wanted", function (err, result, fields) {
                if (err) throw err;
                for (var i = 0; i < result.length; i++) {
                    var exampleEmbed = new Discord.RichEmbed()
                        .setColor('#A40000')
                        .setTitle('Wanted:  ' + result[i].Nick)
                        .setDescription(` ** Reasons: ** ${result[i].Reasons} \n ** Proof: **  ${result[i].Proof}  `)
                        .addField(`** Date: ** `, ` *${result[i].Data}*`)
                        .addField(`** Reporter: **`, `*${result[i].Reporter}*`);

                    message.channel.sendMessage(exampleEmbed);

                }
            });

            break;
        case 'caught':
            if (args.length > 2) {
                message.delete(1);
                message.channel.sendMessage('> Wpisz poprawnie komendę: !caught nick')
                    .then(m => m.delete(3000));
                break;
            } else {
                con.query(`DELETE FROM Wanted WHERE Nick = '${args[1]}'`, err => {
                    if (err) throw err;
                    console.log(`${args[1]} has been cought!`);
                });


            }
            message.channel.bulkDelete(50, true)
                .then(m => m.delete(3000));
            con.query("SELECT Nick, Reasons, Proof, Data, Reporter FROM Wanted", function (err, result, fields) {
                if (err) throw err;
                for (var i = 0; i < result.length; i++) {
                    var exampleEmbed = new Discord.RichEmbed()
                        .setColor('#A40000')
                        .setTitle('Wanted:  ' + result[i].Nick)
                        .setDescription(` ** Reasons: ** ${result[i].Reasons} \n ** Proof: **  ${result[i].Proof}  `)
                        .addField(`** Date: ** `, ` *${result[i].Data}*`)
                        .addField(`** Reporter: **`, `*${result[i].Reporter}*`);

                    message.channel.sendMessage(exampleEmbed);

                }
            });
            break;
        case 'amnesia':
            if (args.length > 1) {
                message.delete(1);
                message.channel.sendMessage('> Wpisz poprawnie komendę: !amnesia')
                    .then(m => m.delete(3000));
                message.channel.bulkDelete(50, true)
                    .then(m => m.delete(3000));
                con.query("SELECT Nick, Reasons, Proof, Data, Reporter FROM Wanted", function (err, result, fields) {
                    if (err) throw err;
                    for (var i = 0; i < result.length; i++) {
                        var exampleEmbed = new Discord.RichEmbed()
                            .setColor('#A40000')
                            .setTitle('Wanted:  ' + result[i].Nick)
                            .setDescription(` ** Reasons: ** ${result[i].Reasons} \n ** Proof: **  ${result[i].Proof}  `)
                            .addField(`** Date: ** `, ` *${result[i].Data}*`)
                            .addField(`** Reporter: **`, `*${result[i].Reporter}*`);

                        message.channel.sendMessage(exampleEmbed);

                    }
                });
                message.channel.bulkDelete(50, true)
                .then(m => m.delete(3000));
                break;
            }
            con.query(`DELETE FROM Wanted WHERE ID != 0`, err => {
                if (err) throw err;
                console.log('Amnesia has been done correctly!');
            });
            message.delete(1);

            break;
        case 'ddd':
            con.query("SELECT Nick, Reasons, Proof, Data, Reporter FROM Wanted", function (err, result, fields) {
                if (err) throw err;
                for (var i = 0; i < result.length; i++) {
                    var exampleEmbed = new Discord.RichEmbed()
                        .setColor('#A40000')
                        .setTitle('Wanted:  ' + result[i].Nick)
                        .setDescription(` **Reasons:** ${result[i].Reasons}\n** Proof: **${result[i].Proof}`)
                        .addField(`** Date: ** `, ` *${result[i].Data}*`)
                        .addField(`** Reporter: **`, `*${result[i].Reporter}*`);

                    message.channel.sendMessage(exampleEmbed);

                }
            });
            break;
            case 'embeds':
            let channel = Client.channels.cache.get("745367107310715020");
            const embed = new Discord.MessageEmbed()
                .setColor(0xffffff)
                .setTitle("Pick your roles!")
                .setDescription(`🤣 Cry boy \n\n 😉 Hello There `)
                channel.send(embed).then(async msg=> {
                    await msg.react("🤣");
                    await msg.react("😉");
                })
            break;
    }

});


bot.login(process.env.token);
