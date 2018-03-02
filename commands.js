'use strict';
const config = [process.env.TOKEN, process.env.YTAPIKEY, process.env.MENTION, process.env.RIOTAPIKEY, process.env.WEATHERAPIKEY]
const translate = require('google-translate-api');
const Forecast = require('forecast');
const commandCookie = require('./cookie.js');
const commandHelp = require('./help.js');
const morpionFile = require('./morpion.js');
const tool = require('./tools.js');
const rpFile = require('./rp_file.js');
const commandDefine = require('./define.js');
const rpro = require('request-promise');
var riot = require('riot-games-api-nodejs');
const stripIndent = require('strip-indent');
const os = require('os');
var fs = require('fs');
var prefix = "!";

module.exports = {
    'ban': ban,
    'hug': hug,
    'flip': flip,
    'obvious': obvious,
    'rp': rp,
    'kiss': kiss,
    'meteo': meteo,
    'cookie': cookie,
    'trad': trad,
    'chifumi': chifumi,
    'morpion': morpion,
    'color': color,
    'choose': choose,
    'debug': debug,
    'help': help,
    'kick': kick,
    'prune': prune
}
/*
function ping(msg) {
  msg.channel.send("pong " + new Date().getTime() - msg.createdTimestamp + " ms");
}

function morpion(msg) {
  morpionFile.morpionGame(msg);
  console.log("test");
}

function cookie(msg, cookies) {
      if (!cookies.get(msg.author.id))
      cookies.set(msg.author.id, {nombre:0, ratelimit:new Date().getTime()+1, bank:0});
      let cookieCmd = msg.content.split(/\s+/).slice(1);
      if (cookieCmd[0] == 'daily') {
        if ((cookies.get(msg.author.id).ratelimit > Date.now()) && (cookies.get(msg.author.id).ratelimit !== 0)) {
             var now = new Date().getTime();
             var distance = cookies.get(msg.author.id).ratelimit - now;
             var days = Math.floor(distance / (1000 * 60 * 60 * 24));
             var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
             var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
             var seconds = Math.floor((distance % (1000 * 60)) / 1000);
             var cookiesGet = cookies.get(msg.author.id);
             console.log("fonction cookie exécutée");
             return msg.channel.send(":x: Vous ne pouvez utiliser cette commande qu'une fois toutes les 24h, temps restant: " + days + " jours " + hours + "h " + minutes + "m " + seconds + "s");
         }
        else {
        var cookiesGet = cookies.get(msg.author.id);
        console.log("fonction cookie exécutée");
        cookiesGet.ratelimit = Date.now() + 86400000;
        cookiesGet.nombre = cookiesGet.nombre + 50;
        cookies.set(msg.author.id, cookiesGet)
        msg.channel.send("Yeah 50 cookies en plus");
        }
      }
      if (cookieCmd[0] == 'me') {
      msg.channel.send(":cookie: Vous avez **" + cookies.get(msg.author.id).nombre + "** cookies et " + cookies.get(msg.author.id).bank + " dans la banque :cookie:");
    }
      console.log(cookies.get(msg.author.id));
  }
function color(msg) {
  msg.channel.send("wip désolé");
}
*/
function debug(msg, bot){

 let upTime = Math.round(os.uptime());
 let upTime1 = Math.round(process.uptime());
    console.log(`up Time : ${upTime}`);
     let upTimeSeconds2 = upTime1;
        let upTimeOutput2 = "";
        if (upTime<60) {
            upTimeOutput2 = `${upTime1}s`;
        } else if (upTime1<3600) {
            upTimeOutput2 = `${Math.floor(upTime1/60)}m ${upTime1%60}s`;
        } else if (upTime1<86400) {
            upTimeOutput2 = `${Math.floor(upTime1/3600)}h ${Math.floor(upTime1%3600/60)}m ${upTime1%3600%60}s`;
        } else if (upTime1<604800) {
            upTimeOutput2 = `${Math.floor(upTime1/86400)}d ${Math.floor(upTime1%86400/3600)}h ${Math.floor(upTime1%86400%3600/60)}m ${upTime%86400%3600%60}s`;
        }
         let upTimeSeconds = upTime;
        let upTimeOutput = "";

        if (upTime<60) {
            upTimeOutput = `${upTime}s`;
        } else if (upTime<3600) {
            upTimeOutput = `${Math.floor(upTime/60)}m ${upTime%60}s`;
        } else if (upTime<86400) {
            upTimeOutput = `${Math.floor(upTime/3600)}h ${Math.floor(upTime%3600/60)}m ${upTime%3600%60}s`;
        } else if (upTime<604800) {
            upTimeOutput = `${Math.floor(upTime/86400)}d ${Math.floor(upTime%86400/3600)}h ${Math.floor(upTime%86400%3600/60)}m ${upTime%86400%3600%60}s`;
        }
let embed_fields = [{
                name: "System info:",
                value: `${process.platform}-${process.arch} with ${process.release.name} version ${process.version.slice(1)}`,
                inline: true
            },
            {
                name: "Process info: PID",
                value: `${process.pid}`,
                inline: true
            },
            {
                name: "Process memory usage:",
                value: `${Math.ceil(process.memoryUsage().heapTotal / 1000000)} MB`,
                inline: true
            },
            {
                name: "System memory usage:",
                value: `${Math.ceil((os.totalmem() - os.freemem()) / 1000000)} of ${Math.ceil(os.totalmem() / 1000000)} MB`,
                inline: true
            },
            {
                name: "Uptime bot:",
                value: `:clock12: ${upTimeOutput}`,
                inline: true
            },
            {
                name: "Uptime computer:",
                value: `:clock1230: ${upTimeOutput2}`,
                inline: true
            },{
                name: 'Lib',
                value: `**Discord.js**`
            }
        ];

        msg.channel.send({
            embed: {
                author: {
                    name: msg.author.username,
                    icon_url: msg.author.avatarUrl,
                    url:'http://google.fr'
                },
                color: 0x00FF00,
                fields: embed_fields
            }
        });
}

function flip(msg) {
  let face = Math.floor(Math.random() * 2 + 1);
  console.log(face);
  switch (face) {
    case 1:
    msg.channel.send("Vous êtes tombé sur **Pile**");
    break;
    default:
    msg.channel.send("Vous êtes tombé sur **Face**");
    break;
  }
}
/*function define(msg) {
  msg.channel.send("WIP")
  let args = msg.content.split(/\s+/).slice(1);

  let defineStr;
  if (args.length == 1) {
      if (args[0].charAt(0) == config.prefix)
          args[0] = args[0].slice(1);
      defineStr = commandDefine[args[0]];
  }

  if (defineStr)
      msg.channel.send(defineStr);

  else
  msg.channel.send("votre mot n'existe pas ou n'est pas encore disponible !")
}*/
function rp(msg, stats) {
  let rpCmd = msg.content.split(/\s+/).slice(1);
  if (rpCmd[0] == 'diceroll')
    rpFile.diceroll(msg, stats);
  if (rpCmd[0] == 'info')
    rpFile.info(msg, stats);
  if (rpCmd[0] == 'setHP')
    rpFile.setHP(msg, stats);
  if (rpCmd[0] == 'setPO')
    rpFile.setPO(msg, stats);
  if (rpCmd[0] == 'setMP')
    rpFile.setMP(msg, stats);
  if (rpCmd[0] == 'setMaxHP')
    rpFile.setMaxHP(msg, stats);
  if (rpCmd[0] == 'setMaxMP')
    rpFile.setMaxMP(msg, stats);
  if (rpCmd[0] == 'setLVL')
    rpFile.setLVL(msg, stats);
  if (rpCmd[0] == 'setXP')
    rpFile.setXP(msg, stats);
}

function obvious(msg) {
  let number = Math.floor(Math.random() * 16);
  console.log(number);
  switch(number) {
    case 1:
    msg.channel.send("Le truc bleu au dessus de votre tête s'appelle le ciel.");
    break;
    case 2:
    msg.channel.send("Vivre est bon pour votre santé.");
    break;
    case 3:
    msg.channel.send("Vous ne pouvez marcher sur la lave une seule fois dans votre vie.");
    break;
    case 4:
    msg.channel.send("Si on vous tue vous êtes mort.");
    break;
    case 5:
    msg.channel.send("Attention les arbres ne bougent pas.");
    break;
    case 6:
    msg.channel.send("Uno a été créé par les créateurs d'Uno");
    break;
    case 7:
    msg.channel.send("La plupart des voyages demandent un déplacement.");
    break;
    case 8:
    msg.channel.send("La chine utilise la mer pour cacher ses sous-marins");
    break;
    case 9:
    msg.channel.send("Pour entrer dans un magasin il faut ouvrir la porte.");
    break;
    case 10:
    msg.channel.send("Les jus d'oranges ne contiennent pas de chevaux.");
    break;
    case 11:
    msg.channel.send("L'eau mouille et le feu brûle.");
    break;
    case 12:
    msg.channel.send("La neige fond lorsque le soleil sort.");
    break;
    case 13:
    msg.channel.send("L'eau chaude est chaude et pas froide.");
    break;
    case 14:
    msg.channel.send("Manger est le meilleur remède contre la faim.");
    break;
    case 15:
    msg.channel.send("Dans 365 jours, nous serons dans un an. ");
    break;
    default:
    msg.channel.send("A l'étranger t'es un étranger ça sert a rien d'être raciste.");
    break;
  }
}

function chifumi(msg) {
  var score1 = 0;
  var scoreBot = 0;
  var égalité = 0;
  msg.channel.send("-----------------------------------------------------------------------------------");
  async function acceuilChi(msg) {
    const messageAcceuilChi = await msg.channel.send('Connaissez vous les règles du chi fu mi ?');
    await messageAcceuilChi.react("❌");
    await messageAcceuilChi.react("✔");
    const collecteur = messageAcceuilChi.createReactionCollector((reaction, user) => user.id === msg.author.id);
  collecteur.on('collect', async(reaction) => {
    if (reaction.emoji.name === "❌") {
      reaction.message.delete('Connaissez vous les règles du chi fu mi ?')
      msg.channel.send("Bon alors tu vas voir c'est très simple, en fait tu choisis une des trois possibilitées entre : \"la pierre :punch:\", \"la feuille :raised_back_of_hand:\" et \"les ciseaux :v:\".\nLa pierre bat les ciseaux mais pert contre la feuille, la feuille bat la pierre mais perd contre les ciseaux et les ciseaux gagnent contre la feuille mais perdent contre la pierre.\n Allez c'est parti.");
          chifumiChoix(msg);
    }
    if (reaction.emoji.name === "✔") {
      reaction.message.delete('Connaissez vous les règles du chi fu mi ?')
      msg.channel.send("très bien alors on peut commencer");
          chifumiChoix(msg);
      }
      await reaction.remove(msg.author.id);
    });

  }
  async function chifumiChoix(msg) {
    const messageChiChoix = await msg.channel.send('Chi... fu... mi!');
    await messageChiChoix.react("👊");
    await messageChiChoix.react("🤚");
    await messageChiChoix.react("✌");
    const collecteur = messageChiChoix.createReactionCollector((reaction, user) => user.id === msg.author.id);
   collecteur.on('collect', async(reaction) => {
     if (reaction.emoji.name === "👊") {
       let choixBot = Math.floor(Math.random() * 3);
       reaction.message.delete('Chi... fu... mi!');
       switch(choixBot)
       {
          case 1:
          msg.channel.send(":punch: pierre pierre égalité !");
          égalité ++;
          msg.channel.send("`Score : `\n `vous :" + score1 + " moi :" + scoreBot + " égalité :" + égalité + "`");
          break;
          case 2:
          msg.channel.send(":raised_back_of_hand: feuille pierre j'ai gagné !");
          scoreBot ++;
          msg.channel.send("`Score : `\n `vous :" + score1 + " moi :" + scoreBot + " égalité :" + égalité + "`");
          break;
          default:
          msg.channel.send(":v: ciseaux pierre tu as gagné bravo !");
          score1 ++;
          msg.channel.send("`score :`\n `vous :" + score1 + " moi :" + scoreBot + " égalité :" + égalité + "`");
          break;
       }
         restartChi(msg);
     }
       if (reaction.emoji.name === "🤚") {
         let choixBot = Math.floor(Math.random() * 3);
         reaction.message.delete('Chi... fu... mi!');
         switch(choixBot)
         {
            case 1:
            msg.channel.send(":punch: pierre feuille tu as gagné bravo !");
            score1 ++;
            msg.channel.send("`Score : `\n `vous :" + score1 + " moi :" + scoreBot + " égalité :" + égalité + "`"); //`Score : `\n`vous : 0 | moi : 1 | égalité : 0`
            break;
            case 2:
            msg.channel.send(":raised_back_of_hand: feuille feuille égalité !");
            égalité ++;
            msg.channel.send("`Score : `\n `vous :" + score1 + " moi :" + scoreBot + " égalité :" + égalité + "`");
            break;
            default:
            msg.channel.send(":v: ciseaux feuille j'ai gagné !");
            scoreBot ++;
            msg.channel.send("`Score : `\n `vous :" + score1 + " moi :" + scoreBot + " égalité :" + égalité + "`");
            break;
         }
           restartChi(msg);
       }
       if (reaction.emoji.name === "✌") {
         let choixBot = Math.floor(Math.random() * 3);
         reaction.message.delete('Chi... fu... mi!');
         switch(choixBot)
         {
            case 1:
            msg.channel.send(":punch: pierre ciseaux j'ai gagné !");
            scoreBot ++;
            msg.channel.send("`Score : `\n `vous :" + score1 + " moi :" + scoreBot + " égalité :" + égalité + "`");
            break;
            case 2:
            msg.channel.send(":raised_back_of_hand: feuille ciseaux tu as gagné bravo !");
            score1 ++;
            msg.channel.send("`Score : `\n `vous :" + score1 + " moi :" + scoreBot + " égalité :" + égalité + "`");
            break;
            default:
            msg.channel.send(":v: ciseaux ciseaux égalité !");
            égalité ++;
            msg.channel.send("`Score : `\n `vous :" + score1 + " moi :" + scoreBot + " égalité :" + égalité + "`");
            break;
         }
           restartChi(msg);
       }
   });

}
  async function restartChi(msg) {
    const messageAcceuilChi = await msg.channel.send('On recommence ?');
    await messageAcceuilChi.react("❌");
    await messageAcceuilChi.react("✔");
    const collecteur = messageAcceuilChi.createReactionCollector((reaction, user) => user.id === msg.author.id);
  collecteur.on('collect', async(reaction) => {
    if (reaction.emoji.name === "❌") {
      reaction.message.delete('On recommence ?');
      msg.channel.send("Comme tu veux !");
      msg.channel.send("-----------------------------------------------------------------------------------");
    }
    if (reaction.emoji.name === "✔") {
      reaction.message.delete('On recommence ?');
      chifumiChoix(msg);
      }
      await reaction.remove(msg.author.id);
    });
  }
  acceuilChi(msg);
}
/*function meteo(msg , Client) {
  if(!Client.ratelimit) Client.ratelimit = 1
  let emoji;
  var temps;
  var forecast = new Forecast({
    service: 'darksky',
    key: config.weather_api_key,
    units: 'celcius',
    cache: true,
    ttl: {
      minutes: 2,
      seconds: 30
    }
  });

  if ((Client.rateLimit > Date.now()) && (rateLimit != 0)) {
    var available = Client.rateLimit - now;
    var now = new Date().getTime();
    var minutesRestantesMeteo = Math.floor((available % (1000 * 60 * 60)) / (1000 * 60));
    var secondesRestantesMeteo = Math.floor((available % (1000 * 60)) / 1000);
    return msg.channel.send(":x: Vous ne pouvez utiliser cette commande qu'une fois toutes les 2 minutes, temps restant: " + minutesRestantesMeteo + "m " + secondesRestantesMeteo + "s");
  } else {

  Client.rateLimit = now + 120000;
  forecast.get([44.933393, 4.892360000000053], function(err, weather) {
    if(err) return console.dir(err);
    console.dir(weather);
    let humidité = weather.currently.humidity.toString();
    let windSpd = weather.currently.windSpeed.toString();
    if (weather.daily.icon == 'rain')
    return emoji = ':cloud_rain:';
    if (weather.daily.icon == 'fog')
    return emoji = ':wind_blowing_face:';
    if (weather.daily.icon == 'wind')
    return emoji = ':dash:';
    if (weather.daily.icon == 'snow')
    return emoji = ':snowflake:';
    if (weather.daily.icon == 'sleet')
    return emoji = ':cloud_snow:';
    if (weather.daily.icon == 'cloudy')
    return emoji = ':cloud:';
    if (weather.daily.icon == 'clear-day')
    return emoji = ':sunny:';
    if (weather.daily.icon == 'clear-night')
    return emoji = ':full_moon:';
    if (weather.daily.icon == 'partly-cloudy-day')
    return emoji = ':partly_sunny:';
    if (weather.daily.icon == 'partly-cloudy-night')
    return emoji = ':full_moon::cloud:';
    msg.channel.send({
      embed: {
        author: {
            name: msg.author.username,
            icon_url: msg.author.avatarUrl,
            url:'http://google.fr'
          },
            color: 0xFF00FF,
            fields: [
                      {
                            name: "Temps :",
                            value: emoji,
                            inline: true
                      },{
                            name: "Température :thermometer: ",
                            value: weather.currently.temperature + "°C",
                            inline: true
                      },{
                            name: "Température ressentie :thermometer: ",
                            value: weather.currently.apparentTemperature + "°C",
                            inline: true
                      },{
                            name: "Humidité :droplet: ",
                            value: humidité,
                            inline: true
                      },{
                            name: "Vitesse du vent :dash: ",
                            value: windSpd,
                            inline: true
                      }
                    ]
      }
    });
  });
}
}*/

function trad(msg) {
    let args = msg.content.split(/\s+/).slice(1);
    let toTrad = msg.content.split(/"((?:.|\n)*?)"/);
    if (!args[0])
    return msg.channel.send('Vous devez envoyer la langue dans laquelle vous voulez la traduction');
    if (!toTrad[1])
    return msg.channel.send('Vous devez envoyer une phrase a traduire !');
        translate(toTrad[1], {to: args[0]}).then(res => {
    msg.channel.send("Voila :\"" + res.text +"\"" );
}).catch(err => {
  msg.channel.send('Désolé je ne peux pas traduire votre phrase. La langue demandée est peut être incorrecte.');
    console.error(err);
});
}
/*function lol(msg) {
      let args = msg.content.split(/\s+/).slice(1);
      riot.developerKey = config.riot_api_key;
      if (!args)
      msg.channel.send("Vous devez donner une sous commande.");
      if (args[0] = 'freeChampions') {
        riot.champion.all(
     {
        'freeToPlay': 'true'
    },
    console.log
    );
      }
}*/

function help(msg) {
    let args = msg.content.split(/\s+/).slice(1);

    let helpStr;
    if (args.length == 1) {
        if (args[0].charAt(0) == prefix)
            args[0] = args[0].slice(1);
        helpStr = commandHelp[args[0]];
    }

    if (helpStr)
        msg.channel.send(helpStr, {
            'code': 'css'
        });
    else
        msg.channel.send(stripIndent(
            `
            [Help Menu]
               !help [commande]
               #Utility
                  !music
                  !ban
                  !kick
                  !prune
                  !debug
                  !music
               #Fun 
                  !flip
                  !hug
                  !kiss
                  !obvious
                  !chifumi

            [] = optionnelle, <> = require, | = ou
            `
        ), {
            'code': 'css'
        });
}


function ban(msg) {
    if (!msg.member.hasPermission('BAN_MEMBERS')) {
        return msg.channel.send(`Vous n'avez pas la permission de ban !`);
    }
    let memberToBan = msg.mentions.members.first();
    if (!memberToBan)
    msg.channel.send("vous devez mentionner quelqu'un a bannir");
    if (memberToBan && memberToBan.bannable && (msg.member.highestRole.calculatedPosition >
            memberToBan.highestRole.calculatedPosition || msg.guild.ownerID == msg.author.id)) {

        let reason = tool.parseOptionArg('reason', msg.content);
        let days = parseInt(tool.parseOptionArg('days', msg.content));

        let banOptions = {
            days: days ? days : 0,
            reason: reason ? reason : 'none'
        };
        memberToBan.ban(banOptions);
    }
}



function hug(msg) {
  let arr = ["./huggif/hug1.gif", './huggif/hug2.gif', './huggif/hug3.gif', './huggif/hug4.gif', './huggif/hug5.gif', './huggif/hug6.gif', './huggif/hug7.gif', './huggif/hug8.gif', './huggif/hug9.gif', './huggif/hug10.gif']
  let hug;
  hug = Math.floor(Math.random() * 10);
  console.log("hug n° " + hug)
  switch(hug)
  {
  case 1:
    msg.channel.send("Ohh tu es tout seul " + msg.author + " ***MIAAOU***",
    {
      file: arr[0]
    });
    break;

  case 2:
    msg.channel.send("Ohh tu es tout seul " + msg.author + " ***MIAAOU***",
    {
      file: arr[1]
    });
    break;

  case 3:
    msg.channel.send("Ohh tu es tout seul " + msg.author + " ***MIAAOU***",
    {
      file: arr[2]
    });
    break;

  case 4:
    msg.channel.send("Ohh tu es tout seul " + msg.author + " ***MIAAOU***",
    {
      file: arr[3]
    });
    break;

  case 5:
    msg.channel.send("Ohh tu es tout seul " + msg.author + " ***MIAAOU***",
    {
      file: arr[4]
    });
    break;

  case 6:
    msg.channel.send("Ohh tu es tout seul " + msg.author + " ***MIAAOU***",
    {
      file: arr[5]
    });
    break;

  case 7:
    msg.channel.send("Ohh tu es tout seul " + msg.author + " ***MIAAOU***",
    {
      file: arr[6]
    });
    break;

  case 8:
    msg.channel.send("Ohh tu es tout seul " + msg.author + " ***MIAAOU***",
    {
      file: arr[7]
    });
    break;

  case 9:
    msg.channel.send("Ohh tu es tout seul " + msg.author + " ***MIAAOU***",
    {
      file: arr[8]
    });
    break;

  default:
    msg.channel.send("Ohh tu es tout seul " + msg.author + " ***MIAAOU***",
    {
      file: arr[9]
    });
    break;
  }
}

function kiss(msg) {
  let arr = ['./kissgif/kiss1.gif', './kissgif/kiss2.gif', './kissgif/kiss3.gif', './kissgif/kiss4.gif', './kissgif/kiss5.gif', './kissgif/kiss6.gif', './kissgif/kiss7.gif', './kissgif/kiss8.gif', './kissgif/kiss9.gif', './kissgif/kiss10.gif']
  let kissnbr = 0
  kissnbr = Math.floor(Math.random() * 10);
  let cibled = msg.mentions.members.first();
  if (cibled == config[2] && msg.author.id === "250711124557824001") {
    msg.channel.send("Moi aussi je t'aime " + msg.author + " :heart: :hearts: :heart:",
    {
      file: './kissgif/kiss1.gif'
    });
  }
  if (cibled == config[2] && msg.author.id != "250711124557824001") {
    msg.channel.send("Désolé mais je suis déja prise :pensive:")
  }
  if (cibled != config[2]) {
  console.log("kiss n° " + kissnbr);
  switch(kissnbr)
  {
  case 1:
    msg.channel.send("Ohh " + cibled + " tu as recu un bisou de " + msg.author + " ***MIAAOU*** :heart:",
    {
      file: arr[0]
    });
    break;

  case 2:
    msg.channel.send("Ohh " + cibled + " tu as recu un bisou de " + msg.author + " ***MIAAOU*** :heart:",
    {
      file: arr[1]
    });
    break;

  case 3:
    msg.channel.send("Ohh " + cibled + " tu as recu un bisou de " + msg.author + " ***MIAAOU*** :heart:",
    {
      file: arr[2]
    });
    break;

  case 4:
    msg.channel.send("Ohh " + cibled + " tu as recu un bisou de " + msg.author + " ***MIAAOU*** :heart:",
    {
      file: arr[3]
    });
    break;

  case 5:
    msg.channel.send("Ohh " + cibled + " tu as recu un bisou de " + msg.author + " ***MIAAOU*** :heart:",
    {
      file: arr[4]
    });
    break;

  case 6:
    msg.channel.send("Ohh " + cibled + " tu as recu un bisou de " + msg.author + " ***MIAAOU*** :heart:",
    {
      file: arr[5]
    });
    break;

  case 7:
    msg.channel.send("Ohh " + cibled + " tu as recu un bisou de " + msg.author + " ***MIAAOU*** :heart:",
    {
      file: arr[6]
    });
    break;

  case 8:
    msg.channel.send("Ohh " + cibled + " tu as recu un bisou de " + msg.author + " ***MIAAOU*** :heart:",
    {
      file: arr[7]
    });
    break;

  case 9:
    msg.channel.send("Ohh " + cibled + " tu as recu un bisou de " + msg.author + " ***MIAAOU*** :heart:",
    {
      file: arr[8]
    });
    break;

  default:
    msg.channel.send("Ohh " + cibled + " tu as recu un bisou de " + msg.author + " ***MIAAOU*** :heart:",
    {
      file: arr[9]
    });
    break;
  }
}
else if (!cibled){
  msg.channel.send("vous devez mentionner quelqu'un a embrasser")
}
}

function kick(msg){
    if(!msg.member.hasPermission('KICK_MEMBERS')){
        return msg.channel.send(`Vous n'avez pas la permission de kick !`);
    }
    let memberToKick = msg.mentions.members.first();
    if (!memberToKick)
    msg.channel.send("vous devez mentionner quelqu'un a kick !");
    if (memberToKick && memberToKick.kickable && (msg.member.highestRole.calculatedPosition >
            memberToKick.highestRole.calculatedPosition || msg.guild.ownerID == msg.author.id)) {
        let reason = tool.parseOptionArg('reason', msg.content);
        memberToKick.kick(reason ? reason : 'none');
    }
}

function choose(msg){
    let args = msg.content.split('|');
    args[0] = args[0].slice(8);
    let choices  = args.filter(arg => {
        return arg.trim() != '';
    });

    if(choices.length >= 1){
        msg.channel.send(choices[tool.randint(choices.length)]);
    }
    else{
        msg.channel.send(`Merci de mettre plusieurs choix`)
    }
}

function prune(msg){
    if (!msg.member.hasPermission('MANAGE_MESSAGES'))
        return msg.channel.send('Vous n\'avez pas la permission de supprimer les messages ');
    let args = msg.content.split(/\s+/);
    let amount;
    if(args.length > 1){
        amount = parseInt(args[1]);
    }else {
        msg.content = '!help prune';
        return help(msg);
    }

    if(amount < 1 || amount > 500)
        return msg.channel.send(`Donnez moi un montant de message a supprimer entre 1 et 500`);


    let options = tool.parseOptions(msg.content);

    let botOption = options.long.includes('bots');
    let userOption = options.long.includes('user');
    let filterOption = options.long.includes('filter');
    let silentOption = options.short.includes('s') || options.long.includes('silent');
    let pinOption = options.short.includes('p') || options.long.includes('pinned');

    let name;
    let nickname;
    let stringToFilter;
    if (amount) {
        try {
            if (userOption) {
                name = tool.parseOptionArg('user', msg.content);
                if (!name)
                    throw 'args';
            }

            if (filterOption) {
                stringToFilter = tool.parseOptionArg('filter', msg.content);
                if (!stringToFilter)
                    throw 'args';
            }
            processAmount(amount, 0);
        } catch (err) {
            if (err.message == 'err')
                msg.channel.send(`Desolé, je ne peux pas supprimer vos messages. `);
            else
                msg.channel.send(`Syntaxe invalide. Faites ${tool.wrap('!help prune')}.`)
        }
    }
    function processAmount(amount, prunedAmount) {
        let fetchAmount;
        if (amount > 100)
            fetchAmount = 100;
        else if (amount > 1)
            fetchAmount = amount;
        else
            fetchAmount = 2;

        msg.channel.fetchMessages({
            limit: fetchAmount,
            before: msg.id
        }).then(msgs => {
            if (amount == 1)
                msgs.delete(msgs.lastKey());
            amount -= 100;

            if (options.long.length > 0 || options.short.length > 0) {
                msgs = msgs.filter(msg => {
                    if (msg.member.nickname) {
                        nickname = msg.member.nickname.toLowerCase();
                    }

                    let botPass = botOption ? msg.author.bot : true;
                    let userPass = userOption ? msg.author.username.toLowerCase() ==
                        name || nickname == name : true;
                    let filterPass = filterOption ? msg.content.toLowerCase()
                        .indexOf(stringToFilter) >= 0 : true;
                    let pinnedPass = pinOption ? !msg.pinned : true;

                    return botPass && userPass && filterPass &&
                        pinnedPass;
                });
            }

            if (msgs.size >= 2) {
                msg.channel.bulkDelete(msgs, true).then(deleted => {
                    nextCall(deleted.size);
                }).catch(() => {

                    nextCall(0);
                });
            } else if (msgs.size == 1) {
                msgs.first().delete().then(deleted => {
                    nextCall(1);
                });
            } else {
                nextCall(0);
            }
        }).catch(err => {
            throw 'err';
        });

        function nextCall(deletedSize) {
            prunedAmount += deletedSize;
            if (amount > 0) {
                setTimeout(() => {
                    processAmount(amount, prunedAmount);
                }, 1000);
            } else {
                if (silentOption) {
                    msg.delete();
                } else {
                    msg.channel.send(`Nombres de messages supprimés ${tool.wrap(prunedAmount)}.`);
                }
            }
        }
    }
}
