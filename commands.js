'use strict'
const config = [process.env.TOKEN, process.env.YTAPIKEY, process.env.MENTION, process.env.RIOTAPIKEY, process.env.WEATHERAPIKEY]
const translate = require('google-translate-api');
const Forecast = require('forecast');
const commandCookie = require('./cookie.js');
const musique = require('./music.js');
const xml2js = require('xml2js');
const Discord = require('discord.js');
const morpionFile = require('./morpion.js');
const tool = require('./tools.js');
const Enmap = require("enmap");
const EnmapLevel = require('enmap-level');
const snekfetch = require("snekfetch");
const rpFile = require('./rp_file.js');
const commandDefine = require('./define.js');
const rpro = require('request-promise');
var riot = require('riot-games-api-nodejs');
const stripIndent = require('strip-indent');
const os = require('os');
var fs = require('fs');

/*
[-----------------------------------------------------------------------------]
                            [MENU COMMANDES]
[DEFAUT (ALWAYS ACTIVE)]:
  -choose (98-111)
  -color (114-121)
  -configplugins (127-253)
  -configprefix (257-267)
  -debug (271-345)
  -flip (349-359)
  -help (363-640)
  -meteo (644-727)
  -obvious (731-783)
  -ping (787-791)
  -plugins (795-831)
  -profil (835-895)
  -test (FIN)
  -trad (899-912)
  -say
[ACTIONS]:
  -dance (916-926)
  -hug (930-958)
  -invert (962-969)
  -kiss (973-989)
  -nani (993-1003)
  -nomnom (1007-1017)
  -punch (1021-1027)
  -trigerred (1031-1038)
  -trigerredinvert (1042-1049)
  -woop (1053-1063)
[GAMES]:
  -chifumi (1099-1197)
  -morpion (1201-1205)
  -roulette (1209-1339)
[NSFW]:
  -yuri
  -yaoi
  -rule34
[MUSIC]:
  -music (1343-1347)
[MODERATION]:
  -ban (1351-1372)
  -kick
  -mute
  -prune
[-----------------------------------------------------------------------------]
*/
module.exports = {
    'choose': choose,
    'color': color,
    'configplugins': configplugins,
    'configprefix': configprefix,
    'debug': debug,
    'flip': flip,
    'help': help,
    'meteo': meteo,
    'obvious': obvious,
    'ping': ping,
    'plugins': plugins,
    'profil': profil,
    'trad': trad,
    'test': test,
    'say': say,
    'dance': dance,
    'hug': hug,
    'invert': invert,
    'kiss': kiss,
    'nani': nani,
    'nomnom': nomnom,
    'punch': punch,
    'triggered': triggered,
    'triggeredinvert': triggeredinvert,
    'woop': woop,
    'chifumi': chifumi,
    'morpion': morpion,
    'roulette': roulette,
    'hiragana': hiragana,
    'katakana': katakana,
    'rule34': rule34,
    'yaoi': yaoi,
    'yuri': yuri,
    'music': music,
    'ban': ban,
    'kick': kick,
//    'mute': mute,
    'prune': prune
}

//[COMMANDE CHOOSE]:

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

//[COMMANDE COLOR]:

function color(msg) {
  var args = msg.content.split(/\s+/).slice(1);
  if (!args)
    return msg.channel.send("Veuillez mettre une couleur de role à modifier après");
  if (!msg.member.colorRole)
    return msg.channel.send("Vous n'avez pas de role pour en changer sa couleur");
  msg.member.colorRole.setColor(args[1]);
}

//[COMMANDE CONGIGPLUGINS]:

function configplugins(msg, bot, serveroptions) {
  if (!serveroptions.get(msg.channel.guild.id))
    serveroptions.set(msg.channel.guild.id, {prefix: "b!", nsfw: true, games: true, actions: true, moderation: true, music: true})
  var serveroptionsContent = serveroptions.get(msg.channel.guild.id);
  var args = msg.content.split(/\s+/).slice(1);
  if (msg.author.id != msg.guild.ownerID)
    return msg.channel.send("Vous n'êtes pas le créateur de ce serveur, désolé vous ne pouvez pas utiliser cette commande");
  if (!args[0])
    return msg.channel.send("Vous devez mettre un plugin à activer pour vous servir de cette commande");
  if (args[0] == "nsfw") {
  async function pluginConfig(msg, serveroptions) {
    if (!msg.author.id === msg.guild.ownerID)
      return msg.channel.send("Vous n'êtes pas le créateur de ce serveur, désolé vous ne pouvez pas utiliser cette commande");
    const messagePlugin = await msg.channel.send('Voulez vous le plugin nsfw ?');
    await messagePlugin.react("✅");
    await messagePlugin.react("❌");
    const collecteur = messagePlugin.createReactionCollector((reaction, user) => user.id === msg.author.id);
  collecteur.on('collect', async(reaction) => {
    if (reaction.emoji.name === "✅") {
      serveroptionsContent.nsfw = true;
      serveroptions.set(msg.channel.guild.id, serveroptionsContent);
      messagePlugin.delete();
      msg.channel.send("Plugin nsfw activé !");
    }
    if (reaction.emoji.name === "❌") {
      serveroptionsContent.nsfw = false;
      serveroptions.set(msg.channel.guild.id, serveroptionsContent);
      messagePlugin.delete();
      msg.channel.send("Plugin nsfw desactivé !");
    }
      });
    }
    pluginConfig(msg, serveroptions);
  }
  if (args[0] == "games") {
  async function pluginConfig(msg, serveroptions) {
    const messagePlugin = await msg.channel.send('Voulez vous le plugin games ?');
    await messagePlugin.react("✅");
    await messagePlugin.react("❌");
    const collecteur = messagePlugin.createReactionCollector((reaction, user) => user.id === msg.author.id);
  collecteur.on('collect', async(reaction) => {
    if (reaction.emoji.name === "✅") {
      serveroptionsContent.games = true;
      serveroptions.set(msg.channel.guild.id, serveroptionsContent);
      messagePlugin.delete();
      msg.channel.send("Plugin games activé !");
    }
    if (reaction.emoji.name === "❌") {
      serveroptionsContent.games = false;
      serveroptions.set(msg.channel.guild.id, serveroptionsContent);
      messagePlugin.delete();
      msg.channel.send("Plugin games desactivé !");
    }
      });
    }
        pluginConfig(msg, serveroptions);
  }
  if (args[0] == "actions") {
  async function pluginConfig(msg, serveroptions) {
    const messagePlugin = await msg.channel.send('Voulez vous le plugin `actions` ?');
    await messagePlugin.react("✅");
    await messagePlugin.react("❌");
    const collecteur = messagePlugin.createReactionCollector((reaction, user) => user.id === msg.author.id);
  collecteur.on('collect', async(reaction) => {
    if (reaction.emoji.name === "✅") {
      serveroptionsContent.actions = true;
      serveroptions.set(msg.channel.guild.id, serveroptionsContent);
      messagePlugin.delete();
      msg.channel.send("Plugin `actions` activé !");
    }
    if (reaction.emoji.name === "❌") {
      serveroptionsContent.actions = false;
      serveroptions.set(msg.channel.guild.id, serveroptionsContent);
      messagePlugin.delete();
      msg.channel.send("Plugin `actions` desactivé !");
    }
      });
    }
        pluginConfig(msg, serveroptions);
  }
  if (args[0] == "moderation") {
  async function pluginConfig(msg, serveroptions) {
    const messagePlugin = await msg.channel.send('Voulez vous le plugin `moderation` ?');
    await messagePlugin.react("✅");
    await messagePlugin.react("❌");
    const collecteur = messagePlugin.createReactionCollector((reaction, user) => user.id === msg.author.id);
  collecteur.on('collect', async(reaction) => {
    if (reaction.emoji.name === "✅") {
      serveroptionsContent.moderation = true;
      serveroptions.set(msg.channel.guild.id, serveroptionsContent);
      messagePlugin.delete();
      msg.channel.send("Plugin `moderation` activé !");
    }
    if (reaction.emoji.name === "❌") {
      serveroptionsContent.moderation = false;
      serveroptions.set(msg.channel.guild.id, serveroptionsContent);
      messagePlugin.delete();
      msg.channel.send("Plugin `moderation` desactivé !");
    }
      });
    }
        pluginConfig(msg, serveroptions);
  }
  if (args[0] == "music") {
  async function pluginConfig(msg, serveroptions) {
    const messagePlugin = await msg.channel.send('Voulez vous le plugin music ?');
    await messagePlugin.react("✅");
    await messagePlugin.react("❌");
    const collecteur = messagePlugin.createReactionCollector((reaction, user) => user.id === msg.author.id);
  collecteur.on('collect', async(reaction) => {
    if (reaction.emoji.name === "✅") {
      serveroptionsContent.music = true;
      serveroptions.set(msg.channel.guild.id, serveroptionsContent);
      messagePlugin.delete();
      msg.channel.send("Plugin music activé !");
    }
    if (reaction.emoji.name === "❌") {
      serveroptionsContent.music = false;
      serveroptions.set(msg.channel.guild.id, serveroptionsContent);
      messagePlugin.delete();
      msg.channel.send("Plugin music desactivé !");
    }
      });
    }
    pluginConfig(msg, serveroptions);
  }
}

//[COMMANDE CONFIGPREFIX]:

function configprefix(msg, bot, serveroptions) {
  if (!serveroptions.get(msg.guild.id))
    serveroptions.set(msg.guild.id, {prefix: "b!", nsfw: true, games: true, actions: true, moderation: true, music: true})
  var args = msg.content.split(/\s+/).slice(1);
  if (!args[0])
    return msg.channel.send("Vous devez mettre un préfix après la commande, exemple : `!configprefix k!`")
  var serveroptionsContent = serveroptions.get(msg.guild.id);
  serveroptionsContent.prefix = args[0];
  serveroptions.set(msg.guild.id, serveroptionsContent);
  msg.channel.send("Préfix changé en `"+serveroptions.get(msg.guild.id).prefix+"`");
}

//[COMMANDE Debug]:

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

//[COMMANDE FLIP]:

function flip(msg) {
  let face = Math.floor(Math.random() * 2 + 1);
  switch (face) {
    case 1:
    msg.channel.send("Vous êtes tombé sur **Pile**");
    break;
    default:
    msg.channel.send("Vous êtes tombé sur **Face**");
    break;
  }
}

//[COMMANDE HELP]:

function help(msg, bot, serveroptions) {
    let args = msg.content.split(/\s+/).slice(1);

    if (args[0] == "trad") {
      var embedHelp = new Discord.RichEmbed()
        .setAuthor("Commande trad")
        .setDescription("Utilisation : `"+serveroptions.get(msg.guild.id).prefix+"trad <langue résultat> \"<Phrase à traduire>\"`")
        .setColor(0xFFFFFF)
        .addField("Description :", "Traduit la phrase entre les guillemet dans la langue donnée (utilisez une abréviation, ex: fr pour français)")
        .setFooter("<> = Obligatoire | [] = Optionnel")
      return msg.channel.send(embedHelp);
    }

    if (args[0] == "configprefix") {
      var embedHelp = new Discord.RichEmbed()
        .setAuthor("Commande configprefix")
        .setDescription("Utilisation : `"+serveroptions.get(msg.guild.id).prefix+"configprefix <prefix> \"<Phrase à traduire>\"`")
        .setColor(0xFFFFFF)
        .addField("Description :", "Traduit la phrase entre les guillemet dans la langue donnée (utilisez une abréviation, ex: fr pour français)")
        .setFooter("<> = Obligatoire | [] = Optionnel")
      return msg.channel.send(embedHelp);
    }

    if (args[0] == "flip") {
      var embedHelp = new Discord.RichEmbed()
        .setAuthor("Commande flip")
        .setDescription("Utilisation : `"+serveroptions.get(msg.guild.id).prefix+"flip`")
        .setColor(0xFFFFFF)
        .addField("Description :", "Lance une pièce et vous donne le résultat")
        .setFooter("<> = Obligatoire | [] = Optionnel")
      return msg.channel.send(embedHelp);
    }
    if (args[0] == "hug") {
      var embedHelp = new Discord.RichEmbed()
        .setAuthor("Commande hug")
        .setDescription("Utilisation : `"+serveroptions.get(msg.guild.id).prefix+"hug [mention]`")
        .setColor(0xFFFFFF)
        .addField("Description :", "Fait un calin à la personne mentionée. Vous si personne n'est mentioné")
        .setFooter("<> = Obligatoire | [] = Optionnel")
      return msg.channel.send(embedHelp);
    }
    if (args[0] == "kiss") {
      var embedHelp = new Discord.RichEmbed()
        .setAuthor("Commande kiss")
        .setDescription("Utilisation : `"+serveroptions.get(msg.guild.id).prefix+"kiss <mention>`")
        .setColor(0xFFFFFF)
        .addField("Description :", "Fait un bisou à la personne mentionée.")
        .setFooter("<> = Obligatoire | [] = Optionnel")
      return msg.channel.send(embedHelp);
    }
    if (args[0] == "dance") {
      var embedHelp = new Discord.RichEmbed()
        .setAuthor("Commande dance")
        .setDescription("Utilisation : `"+serveroptions.get(msg.guild.id).prefix+"dance`")
        .setColor(0xFFFFFF)
        .addField("Description :", "Bon bah on danse alors.")
        .setFooter("<> = Obligatoire | [] = Optionnel")
      return msg.channel.send(embedHelp);
    }
    if (args[0] == "nani") {
      var embedHelp = new Discord.RichEmbed()
        .setAuthor("Commande nani")
        .setDescription("Utilisation : `"+serveroptions.get(msg.guild.id).prefix+"nani`")
        .setColor(0xFFFFFF)
        .addField("Description :", "NANI ?????")
        .setFooter("<> = Obligatoire | [] = Optionnel")
      return msg.channel.send(embedHelp);
    }
    if (args[0] == "punch") {
      var embedHelp = new Discord.RichEmbed()
        .setAuthor("Commande punch")
        .setDescription("Utilisation : `"+serveroptions.get(msg.guild.id).prefix+"punch <mention>`")
        .setColor(0xFFFFFF)
        .addField("Description :", "Frappe la personne mentionée.")
        .setFooter("<> = Obligatoire | [] = Optionnel")
      return msg.channel.send(embedHelp);
    }
    if (args[0] == "nomnom") {
      var embedHelp = new Discord.RichEmbed()
        .setAuthor("Commande nomnom")
        .setDescription("Utilisation : `"+serveroptions.get(msg.guild.id).prefix+"nomnom`")
        .setColor(0xFFFFFF)
        .addField("Description :", "Miam miam")
        .setFooter("<> = Obligatoire | [] = Optionnel")
      return msg.channel.send(embedHelp);
    }
    if (args[0] == "woop") {
      var embedHelp = new Discord.RichEmbed()
        .setAuthor("Commande woop")
        .setDescription("Utilisation : `"+serveroptions.get(msg.guild.id).prefix+"woop`")
        .setColor(0xFFFFFF)
        .addField("Description :", "woop alors")
        .setFooter("<> = Obligatoire | [] = Optionnel")
      return msg.channel.send(embedHelp);
    }
    if (args[0] == "triggered") {
      var embedHelp = new Discord.RichEmbed()
        .setAuthor("Commande triggered")
        .setDescription("Utilisation : `"+serveroptions.get(msg.guild.id).prefix+"triggered`")
        .setColor(0xFFFFFF)
        .addField("Description :", "Alors on est énervé ?")
        .setFooter("<> = Obligatoire | [] = Optionnel")
      return msg.channel.send(embedHelp);
    }
    if (args[0] == "triggeredinvert") {
      var embedHelp = new Discord.RichEmbed()
        .setAuthor("Commande triggeredinvert")
        .setDescription("Utilisation : `"+serveroptions.get(msg.guild.id).prefix+"triggeredinvert`")
        .setColor(0xFFFFFF)
        .addField("Description :", "Le mix parfait entre triggered et invert")
        .setFooter("<> = Obligatoire | [] = Optionnel")
      return msg.channel.send(embedHelp);
    }
    if (args[0] == "invert") {
      var embedHelp = new Discord.RichEmbed()
        .setAuthor("Commande invert")
        .setDescription("Utilisation : `"+serveroptions.get(msg.guild.id).prefix+"invert`")
        .setColor(0xFFFFFF)
        .addField("Description :", "Inverse les couleurs de votre photo de profil")
        .setFooter("<> = Obligatoire | [] = Optionnel")
      return msg.channel.send(embedHelp);
    }
    if (args[0] == "obvious") {
      var embedHelp = new Discord.RichEmbed()
        .setAuthor("Commande obvious")
        .setDescription("Utilisation : `"+serveroptions.get(msg.guild.id).prefix+"obvious`")
        .setColor(0xFFFFFF)
        .addField("Description :", "Thanks Captain Obvious!")
        .setFooter("<> = Obligatoire | [] = Optionnel")
      return msg.channel.send(embedHelp);
    }
    if (args[0] == "choose") {
      var embedHelp = new Discord.RichEmbed()
        .setAuthor("Commande choose")
        .setDescription("Utilisation : `"+serveroptions.get(msg.guild.id).prefix+"choose <option1> | <option2> | [...]`")
        .setColor(0xFFFFFF)
        .addField("Description :", "Choisis aléatoirement entre toutes les propositions")
        .setFooter("<> = Obligatoire | [] = Optionnel")
      return msg.channel.send(embedHelp);
    }
    if (args[0] == "meteo") {
      var embedHelp = new Discord.RichEmbed()
        .setAuthor("Commande meteo")
        .setDescription("Utilisation : `"+serveroptions.get(msg.guild.id).prefix+"meteo`")
        .setColor(0xFFFFFF)
        .addField("Description :", "Donne la météo de Valence. Cooldown de 2 minutes.")
        .setFooter("<> = Obligatoire | [] = Optionnel")
      return msg.channel.send(embedHelp);
    }
    if (args[0] == "ping") {
      var embedHelp = new Discord.RichEmbed()
        .setAuthor("Commande ping")
        .setDescription("Utilisation : `"+serveroptions.get(msg.guild.id).prefix+"ping`")
        .setColor(0xFFFFFF)
        .addField("Description :", "Donne le ping du bot et de l'api discord")
        .setFooter("<> = Obligatoire | [] = Optionnel")
      return msg.channel.send(embedHelp);
    }
    if (args[0] == "help") {
      var embedHelp = new Discord.RichEmbed()
        .setAuthor("Commande help")
        .setDescription("Utilisation : `"+serveroptions.get(msg.guild.id).prefix+"help [commande]`")
        .setColor(0xFFFFFF)
        .addField("Description :", "Oui bah c'est la commande d'aide quoi!")
        .setFooter("<> = Obligatoire | [] = Optionnel")
      return msg.channel.send(embedHelp);
    }
    if (args[0] == "color") {
      var embedHelp = new Discord.RichEmbed()
        .setAuthor("Commande color")
        .setDescription("Utilisation : `"+serveroptions.get(msg.guild.id).prefix+"color <couleur>`")
        .setColor(0xFFFFFF)
        .addField("Description :", "Change la couleur de votre role visible par celle donnée.")
        .setFooter("<> = Obligatoire | [] = Optionnel")
      return msg.channel.send(embedHelp);
    }
    if (args[0] == "plugins") {
      var embedHelp = new Discord.RichEmbed()
        .setAuthor("Commande plugins")
        .setDescription("Utilisation : `"+serveroptions.get(msg.guild.id).prefix+"plugins`")
        .setColor(0xFFFFFF)
        .addField("Description :", "Affiche les plugins, leur état (actif ou non) et leurs commandes associées.")
        .setFooter("<> = Obligatoire | [] = Optionnel")
      return msg.channel.send(embedHelp);
    }
    if (args[0] == "configplugins") {
      var embedHelp = new Discord.RichEmbed()
        .setAuthor("Commande configplugins")
        .setDescription("Utilisation : `"+serveroptions.get(msg.guild.id).prefix+"configplugins <plugin>`")
        .setColor(0xFFFFFF)
        .addField("Description :", "Choisis d'activer ou de désactiver le plugin donné")
        .setFooter("<> = Obligatoire | [] = Optionnel")
      return msg.channel.send(embedHelp);
    }
    if (args[0] == "profil") {
      var embedHelp = new Discord.RichEmbed()
        .setAuthor("Commande profil")
        .setDescription("Utilisation : `"+serveroptions.get(msg.guild.id).prefix+"profil`")
        .setColor(0xFFFFFF)
        .addField("Description :", "Affiche votre profil Discord")
        .setFooter("<> = Obligatoire | [] = Optionnel")
      return msg.channel.send(embedHelp);
    }
    if (args[0] == "music") {
      var embedHelp = new Discord.RichEmbed()
        .setAuthor("Commande music")
        .setDescription("Utilisation : `"+serveroptions.get(msg.guild.id).prefix+"music <commande>`")
        .setColor(0xFFFFFF)
        .addField("Description :", `\`\`\`Effectue la commande sur la musique :
play <url>            : Ajoute la chanson à la\n \t \t \t \t    queue.
skip                  : Passe la chanson actuelle.
pause                 : Pause la chanson.
resume                : Reprend la chanson.
queue                 : Affiche la queue des\n \t \t \t \t    musiques.
purge                 : Vide la queue des musiques.
np                    : Affiche la musique actuelle.
vol <0-100>           : Règle le volume.
join                  : Vous rejoins dans le channel vocal.
leave                 : Quitte le channel vocal.\`\`\``)
        .setFooter("<> = Obligatoire | [] = Optionnel")
      return msg.channel.send(embedHelp);
    }
    if (args[0] == "kick") {
      var embedHelp = new Discord.RichEmbed()
        .setAuthor("Commande kick")
        .setDescription("Utilisation : `"+serveroptions.get(msg.guild.id).prefix+"kick <mention> [raison]`")
        .setColor(0xFFFFFF)
        .addField("Description :", "Exclu la personne mentionnée")
        .setFooter("<> = Obligatoire | [] = Optionnel")
      return msg.channel.send(embedHelp);
    }
    if (args[0] == "ban") {
      var embedHelp = new Discord.RichEmbed()
        .setAuthor("Commande ban")
        .setDescription("Utilisation : `"+serveroptions.get(msg.guild.id).prefix+"ban <mention> [raison]`")
        .setColor(0xFFFFFF)
        .addField("Description :", "Banni la personne mentionnée")
        .setFooter("<> = Obligatoire | [] = Optionnel")
      return msg.channel.send(embedHelp);
    }
    if (args[0] == "prune") {
      var embedHelp = new Discord.RichEmbed()
        .setAuthor("Commande prune")
        .setDescription("Utilisation : `"+serveroptions.get(msg.guild.id).prefix+"prune <nombre>`")
        .setColor(0xFFFFFF)
        .addField("Description :", "Supprime les x derniers messages.")
        .setFooter("<> = Obligatoire | [] = Optionnel")
      return msg.channel.send(embedHelp);
    }
    if (args[0] == "morpion") {
      var embedHelp = new Discord.RichEmbed()
        .setAuthor("Commande morpion")
        .setDescription("Utilisation : `"+serveroptions.get(msg.guild.id).prefix+"morpion`")
        .setColor(0xFFFFFF)
        .addField("Description :", "Jouez au morpion contre le bot (WIP)")
        .setFooter("<> = Obligatoire | [] = Optionnel")
      return msg.channel.send(embedHelp);
    }
    if (args[0] == "chifumi") {
      var embedHelp = new Discord.RichEmbed()
        .setAuthor("Commande chifumi")
        .setDescription("Utilisation : `"+serveroptions.get(msg.guild.id).prefix+"chifumi`")
        .setColor(0xFFFFFF)
        .addField("Description :", "Jouez au chifumi contre le bot")
        .setFooter("<> = Obligatoire | [] = Optionnel")
      return msg.channel.send(embedHelp);
    }
    if (args[0] == "roulette") {
      var embedHelp = new Discord.RichEmbed()
        .setAuthor("Commande roulette")
        .setDescription("Utilisation : `"+serveroptions.get(msg.guild.id).prefix+"roulette`")
        .setColor(0xFFFFFF)
        .addField("Description :", "Jouez à la roulette russe avec un ban comme enjeux.")
        .setFooter("<> = Obligatoire | [] = Optionnel")
      return msg.channel.send(embedHelp);
    }
    if (args[0] == "yaoi") {
      var embedHelp = new Discord.RichEmbed()
        .setAuthor("Commande yaoi")
        .setDescription("Utilisation : `"+serveroptions.get(msg.guild.id).prefix+"yaoi`")
        .setColor(0xFFFFFF)
        .addField("Description :", "Va chercher une image avec le tag \"yaoi\" sur rule34")
        .setFooter("<> = Obligatoire | [] = Optionnel")
      return msg.channel.send(embedHelp);
    }
    if (args[0] == "yuri") {
      var embedHelp = new Discord.RichEmbed()
        .setAuthor("Commande yuri")
        .setDescription("Utilisation : `"+serveroptions.get(msg.guild.id).prefix+"yuri`")
        .setColor(0xFFFFFF)
        .addField("Description :", "Va chercher une image avec le tag \"yuri\" sur rule34")
        .setFooter("<> = Obligatoire | [] = Optionnel")
      return msg.channel.send(embedHelp);
    }
    if (args[0] == "rule34") {
      var embedHelp = new Discord.RichEmbed()
        .setAuthor("Commande rule34")
        .setDescription("Utilisation : `"+serveroptions.get(msg.guild.id).prefix+"rule34 \"<tags à chercher sur rule34>\"`")
        .setColor(0xFFFFFF)
        .addField("Description :", "Va chercher la première image avec les tags entrés sur rule34. Chaque mot séparé d'un espace dans les tag est un tag différent")
        .addField("Exemple :", "`"+serveroptions.get(msg.guild.id).prefix+"rule34 \"blonde fairy_tail\"`\nla commande ci dessus utilisera les tags: `blonde` et `fairy_tail`")
        .setFooter("<> = Obligatoire | [] = Optionnel")
      return msg.channel.send(embedHelp);
    }
    var embedHelp = new Discord.RichEmbed()
      .setAuthor("Menu d'aide")
      .setDescription("Préfix de ce serveur : "+serveroptions.get(msg.guild.id).prefix)
      .setColor(0xFFFFFF)
      .addField(":tada: Fun :", "`flip` `hug` `kiss` `triggered` `obvious` `dance` `nani` `punch` `nomnom` `woop` `invert` `triggeredinvert`")
      .addField(":robot: Utile :", "`trad` `choose` `meteo` `ping` `help` `color` `plugins` `configplugins` `profil`")
      .addField(":musical_note: Musique :", "`play` `skip` `pause` `resume` `queue` `purge` `vol` `join` `leave`")
      .addField(":tools: Modération :", "`kick` `ban` `prune`")
      .addField(":joystick: Jeux :", "`morpion(WIP)` `chifumi` `roulette`")
      .addField(":underage: NSFW :", "`yaoi` `yuri` `rule34`")
      .setFooter("Pour plus d'info sur la commande, faites\""+serveroptions.get(msg.guild.id).prefix+"help <commande>\" sauf pour la musique, faites \""+serveroptions.get(msg.guild.id).prefix+"help music\"")
        msg.channel.send(embedHelp);
}

//[COMMANDE METEO]:

function meteo(msg , Client) {
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

  if ((Client.rateLimit > Date.now()) && (Client.rateLimit != 0)) {
    var now = new Date().getTime();
    var available = Client.rateLimit - now;
    var minutesRestantesMeteo = Math.floor((available % (1000 * 60 * 60)) / (1000 * 60));
    var secondesRestantesMeteo = Math.floor((available % (1000 * 60)) / 1000);
    return msg.channel.send(":x: Vous ne pouvez utiliser cette commande qu'une fois toutes les 2 minutes, temps restant: " + minutesRestantesMeteo + "m " + secondesRestantesMeteo + "s");
  } else {

  Client.rateLimit = new Date().getTime() + 120000;
  forecast.get([44.933393, 4.892360000000053], function(err, weather) {
    if(err) return console.dir(err);
    let humidité = weather.currently.humidity.toString();
    let windSpd = weather.currently.windSpeed.toString();
    if (weather.daily.icon == 'rain')
    emoji = ':cloud_rain:';
    if (weather.daily.icon == 'fog')
    emoji = ':wind_blowing_face:';
    if (weather.daily.icon == 'wind')
    emoji = ':dash:';
    if (weather.daily.icon == 'snow')
    emoji = ':snowflake:';
    if (weather.daily.icon == 'sleet')
    emoji = ':cloud_snow:';
    if (weather.daily.icon == 'cloudy')
    emoji = ':cloud:';
    if (weather.daily.icon == 'clear-day')
    emoji = ':sunny:';
    if (weather.daily.icon == 'clear-night')
    emoji = ':full_moon:';
    if (weather.daily.icon == 'partly-cloudy-day')
    emoji = ':partly_sunny:';
    if (weather.daily.icon == 'partly-cloudy-night')
    emoji = ':full_moon::cloud:';
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
}

//[COMMANDE OBVIOUS]:

function obvious(msg) {
  let number = Math.floor(Math.random() * 16);
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

//[COMMANDE PING]:

async function ping(msg, bot) {
  msg.delete();
  const m = await msg.channel.send("Calcul en cours...");
  m.edit(`Pong ! Mon ping est de ${m.createdTimestamp - msg.createdTimestamp}ms. Le ping de l'API est de ${Math.round(bot.ping)}ms`);
}

//[COMMANDE PLUGINS]:

function plugins(msg, bot, serveroptions) {
  if (!serveroptions.get(msg.channel.guild.id))
    serveroptions.set(msg.channel.guild.id, {prefix: "b!", nsfw: true, games: true, actions: true, moderation: true, music: true})
  var serveroptionsContent = serveroptions.get(msg.channel.guild.id);
  if (serveroptionsContent.nsfw == true)
    var nsfw = "Activé";
  if (serveroptionsContent.nsfw == false)
    var nsfw = "Désctivé";
  if (serveroptionsContent.games == true)
    var games = "Activé";
  if (serveroptionsContent.games == false)
    var games = "Désactivé";
  if (serveroptionsContent.actions == true)
    var actions = "Activé";
  if (serveroptionsContent.actions == false)
    var actions = "Désactivé";
  if (serveroptionsContent.moderation == true)
    var moderation = "Activé";
  if (serveroptionsContent.moderation == false)
    var moderation = "Désactivé";
  if (serveroptionsContent.music == true)
    var music = "Activé";
  if (serveroptionsContent.music == false)
    var music = "Désactivé";

var embedPlugins = new Discord.RichEmbed()
    .setColor(0xFE0000)
    .setAuthor("Plugins :")
    .addField(":underage: NSFW : "+nsfw, "yaoi, yuri, rule34", true)
    .addField(":joystick: Games : "+games, "morpion, roulette, chifumi", true)
    .addField(":tada: Actions : "+actions, "kiss, hug, triggered, dance, woop, punch, nomnom, nani, invert, triggeredinvert", true)
    .addField(":tools: Moderation : "+moderation, "ban, kick, prune", true)
    .addField(":musical_note: Music : "+music, "music (et les sous commandes)", true)
    .addField(":link: Defaut : (toujours activé)", "flip, obvious, ping, trad, profil, choose, color(WIP), meteo, debug, help, test, plugins, configplugins, say", true)

    msg.channel.send(embedPlugins);
}

//[COMMANDE PROFIL]:

function profil(msg) {
  var color = Math.floor(Math.random() * 7);
  switch (color) {
    case 1:
      color = 0xFE0000;
      break;
    case 2:
      color = 0xFE00C3;
      break;
    case 3:
      color = 0x2200FE;
      break;
    case 4:
      color = 0x00DCFE;
      break;
    case 5:
      color = 0x00FE08;
      break;
    case 6:
      color = 0xF6FE00;
      break;
    default:
      color = 0xFE9000
      break;
  }
var joined = msg.channel.guild.members.get(msg.author.id).joinedAt;

var game;
var nickname;
var roles;
  if (!msg.channel.guild.members.get(msg.author.id).presence.game)
  game = "Rien";
  if (msg.channel.guild.members.get(msg.author.id).presence.game)
  game = msg.channel.guild.members.get(msg.author.id).presence.game.name;

  if (msg.channel.guild.members.get(msg.author.id).nickname == "null")
    nickname = msg.author.username;
  if (msg.channel.guild.members.get(msg.author.id).nickname != "null")
    nickname = msg.channel.guild.members.get(msg.author.id).nickname;

    var annee   = joined.getFullYear();
    var mois    = ('0'+(joined.getMonth()+1)).slice(-2);
    var jour    = ('0'+joined.getDate()   ).slice(-2);
    var heure   = ('0'+joined.getHours()  ).slice(-2);
    var minute  = ('0'+joined.getMinutes()).slice(-2);
    var seconde = ('0'+joined.getSeconds()).slice(-2);

  var embedProfil = new Discord.RichEmbed()
      .setColor(color)
      .setAuthor("Profil de " + msg.author.username + " :")
      .setThumbnail(msg.author.avatarURL)
      .addField(":id: ID:", msg.author.id, true)
      .addField(":pencil: Pseudo :", nickname, true)
      .addField(":military_medal: Roles :", msg.channel.guild.members.get(msg.author.id).roles.array().reverse(), true)
      .addField(":video_game: Joue à :", game, true)
      .addField(":calendar: Date d'arrivée sur le serveur :", jour+"/"+mois+"/"+annee+" à "+heure+":"+minute, true)
      .addField(":earth_americas: Tu veux Google ?", "Ok je suis sympa, [clique ici](https://www.google.com/)");


  msg.channel.send(embedProfil);
}

//[COMMANDE TRAD]:

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

//[COMMANDE SAY]:

function say(msg) {
  let toSay = msg.content.split(/"((?:.|\n)*?)"/);
  if (!toSay[1])
    return msg.channel.send("Vous devez mettre une phrase à mefaire dire parce que vous avez pas les couilles de le dire vous même espèce de scrub");
  msg.channel.send(toSay[1])
  msg.delete();
}

//[COMMANDE DANCE]:

function dance(msg, bot, serveroptions) {
  if (serveroptions.get(msg.channel.guild.id).actions == false)
  return msg.channel.send("Vous avez désactivé ce plugin, pour l'activer tapez `" + serveroptions.get(msg.guild.id).prefix + "configPlugins actions`");
  snekfetch.get('https://api.takohell.com/v1/images/dancing').set({
   Authorization: '53b5437f0dd2a6e3727f9826ad0061f970a4b9858c4f2b1b452db37d015964541bd79df5a6e2b6c6354ee06f2aa631da7834478623dca8444babc2c738122b4c',
   TypeMine: 'Content-Type: application/json'
  }).then(r => {
   var image = r.body.url;
   msg.channel.send("You're gonna dance, dance,dance dandandandance", { file: { attachment: image}});
  })
}

//[COMMANDE HUG]:

function hug(msg, bot, serveroptions) {
  if (serveroptions.get(msg.channel.guild.id).actions == false)
  return msg.channel.send("Vous avez désactivé ce plugin, pour l'activer tapez `" + serveroptions.get(msg.guild.id).prefix + "configPlugins actions`");
    let cibled = msg.mentions.members.first();
  if (!cibled) {
  snekfetch.get('https://api.takohell.com/v1/images/hug').set({
   Authorization: '53b5437f0dd2a6e3727f9826ad0061f970a4b9858c4f2b1b452db37d015964541bd79df5a6e2b6c6354ee06f2aa631da7834478623dca8444babc2c738122b4c',
   TypeMine: 'Content-Type: application/json'
  }).then(r => {
   var image = r.body.url;
   msg.channel.send("Ohh tu es tout seul viens me faire un calin ***MIAAOU*** :heart:", { file: { attachment: image}});
  })
  .catch(err => {
   console.log(err);
  });
}
  else {
snekfetch.get('https://api.takohell.com/v1/images/hug').set({
 Authorization: '53b5437f0dd2a6e3727f9826ad0061f970a4b9858c4f2b1b452db37d015964541bd79df5a6e2b6c6354ee06f2aa631da7834478623dca8444babc2c738122b4c',
 TypeMine: 'Content-Type: application/json'
}).then(r => {
 var image = r.body.url;
 msg.channel.send("Ohh " + cibled + " tu as recu un calin de " + msg.author + " ***MIAAOU*** :heart:", { file: { attachment: image}});
})
.catch(err => {
 console.log(err);
});
}
}

//[COMMANDE INVERT]:

function invert(msg, bot, serveroptions) {
  if (serveroptions.get(msg.channel.guild.id).actions == false)
  return msg.channel.send("Vous avez désactivé ce plugin, pour l'activer tapez `" + serveroptions.get(msg.guild.id).prefix + "configPlugins actions`");
var image = msg.author.avatarURL;

msg.channel.send({ file: { attachment: "https://cute-api.tk/v1/generate/invert?url=" + image, name: "triggered.gif"
}});
}

//[COMMANDE KISS]:

function kiss(msg, bot, serveroptions) {
  if (serveroptions.get(msg.channel.guild.id).actions == false)
  return msg.channel.send("Vous avez désactivé ce plugin, pour l'activer tapez `" + serveroptions.get(msg.guild.id).prefix + "configPlugins actions`");
  let cibled = msg.mentions.members.first();
  if (!cibled)
     return msg.channel.send("vous devez mentionner quelqu'un a embrasser");
snekfetch.get('https://api.takohell.com/v1/images/kiss').set({
 Authorization: '53b5437f0dd2a6e3727f9826ad0061f970a4b9858c4f2b1b452db37d015964541bd79df5a6e2b6c6354ee06f2aa631da7834478623dca8444babc2c738122b4c',
 TypeMine: 'Content-Type: application/json'
}).then(r => {
 var image = r.body.url;
 msg.channel.send("Ohh " + cibled + " tu as recu un bisou de " + msg.author + " ***MIAAOU*** :heart:", { file: { attachment: image}});
})
.catch(err => {
 console.log(err);
});
}

//[COMMANDE NANI]:

function nani(msg, bot, serveroptions) {
  if (serveroptions.get(msg.channel.guild.id).actions == false)
  return msg.channel.send("Vous avez désactivé ce plugin, pour l'activer tapez `" + serveroptions.get(msg.guild.id).prefix + "configPlugins actions`");
  snekfetch.get('https://api.takohell.com/v1/images/nani').set({
   Authorization: '53b5437f0dd2a6e3727f9826ad0061f970a4b9858c4f2b1b452db37d015964541bd79df5a6e2b6c6354ee06f2aa631da7834478623dca8444babc2c738122b4c',
   TypeMine: 'Content-Type: application/json'
  }).then(r => {
   var image = r.body.url;
   msg.channel.send("***NANI ????***", { file: { attachment: image}});
  })
}

//[COMMANDE NOMNOM]:

function nomnom(msg, bot, serveroptions) {
  if (serveroptions.get(msg.channel.guild.id).actions == false)
  return msg.channel.send("Vous avez désactivé ce plugin, pour l'activer tapez `" + serveroptions.get(msg.guild.id).prefix + "configPlugins actions`");
  snekfetch.get('https://api.takohell.com/v1/images/nom').set({
   Authorization: '53b5437f0dd2a6e3727f9826ad0061f970a4b9858c4f2b1b452db37d015964541bd79df5a6e2b6c6354ee06f2aa631da7834478623dca8444babc2c738122b4c',
   TypeMine: 'Content-Type: application/json'
  }).then(r => {
   var image = r.body.url;
   msg.channel.send("*nom nom nom*", { file: { attachment: image}});
  })
}

//[COMMANDE PUNCH]:

function punch(msg, bot, serveroptions) {
  if (serveroptions.get(msg.channel.guild.id).actions == false)
  return msg.channel.send("Vous avez désactivé ce plugin, pour l'activer tapez `" + serveroptions.get(msg.guild.id).prefix + "configPlugins actions`");
    let cibled = msg.mentions.members.first();
  if (!cibled) {
   msg.channel.send("*Arrête le coup* Mais te tape pas tout seul pauvre fou !!");
 } else {
 snekfetch.get('https://api.takohell.com/v1/images/punch').set({
  Authorization: '53b5437f0dd2a6e3727f9826ad0061f970a4b9858c4f2b1b452db37d015964541bd79df5a6e2b6c6354ee06f2aa631da7834478623dca8444babc2c738122b4c',
  TypeMine: 'Content-Type: application/json'
 }).then(r => {
  var image = r.body.url;
  msg.channel.send("Ohhhhh " + cibled + ", " + msg.author + "viens de te mettre un coup tu vas le laisser faire ?", { file: { attachment: image}});
 })
 .catch(err => {
  console.log(err);
 });
 }
 }

//[COMMANDE TRIGGERED]:

function triggered(msg, bot, serveroptions) {
  if (serveroptions.get(msg.channel.guild.id).actions == false)
  return msg.channel.send("Vous avez désactivé ce plugin, pour l'activer tapez `" + serveroptions.get(msg.guild.id).prefix + "configPlugins actions`");
var image = msg.author.avatarURL;

msg.channel.send({ file: { attachment: "https://cute-api.tk/v1/generate/triggered?url=" + image, name: "triggered.gif"
}});
}

//[COMMANDE TRIGGEREDINVERT]

function triggeredinvert(msg, bot, serveroptions) {
  if (serveroptions.get(msg.channel.guild.id).actions == false)
  return msg.channel.send("Vous avez désactivé ce plugin, pour l'activer tapez `" + serveroptions.get(msg.guild.id).prefix + "configPlugins actions`");
var image = msg.author.avatarURL;

msg.channel.send({ file: { attachment: "https://cute-api.tk/v1/generate/triggeredinvert?url=" + image, name: "triggered.gif"
}});
}

//[COMMANDE WOOP]:

function woop(msg, bot, serveroptions) {
  if (serveroptions.get(msg.channel.guild.id).actions == false)
  return msg.channel.send("Vous avez désactivé ce plugin, pour l'activer tapez `" + serveroptions.get(msg.guild.id).prefix + "configPlugins actions`");
  snekfetch.get('https://api.takohell.com/v1/images/woop').set({
   Authorization: '53b5437f0dd2a6e3727f9826ad0061f970a4b9858c4f2b1b452db37d015964541bd79df5a6e2b6c6354ee06f2aa631da7834478623dca8444babc2c738122b4c',
   TypeMine: 'Content-Type: application/json'
  }).then(r => {
   var image = r.body.url;
   msg.channel.send("woop", { file: { attachment: image}});
  })
}

//[COMMANDE CHIFUMI]:

function chifumi(msg, bot, serveroptions) {
  if (serveroptions.get(msg.channel.guild.id).games == false)
  return msg.channel.send("Vous avez désactivé ce plugin, pour l'activer tapez `" + serveroptions.get(msg.guild.id).prefix + "configPlugins games`");
    var égalité = 0;
    var score1 = 0;
  var friend = msg.mentions.member.first();
  if (friend) {
    var score2 = 0;

  }
  var scoreBot = 0;
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

//[COMMANDE MORPION]:

function morpion(msg, bot, serveroptions) {
  if (serveroptions.get(msg.channel.guild.id).games == false)
  return msg.channel.send("Vous avez désactivé ce plugin, pour l'activer tapez `" + serveroptions.get(msg.guild.id).prefix + "configPlugins games`");
  morpionFile.morpionGame(msg);
}

//[COMMANDE ROULETTE]:

function roulette(msg, serveroptions) {
  if (serveroptions.get(msg.channel.guild.id).games == false)
  return msg.channel.send("Vous avez désactivé ce plugin, pour l'activer tapez `" + serveroptions.get(msg.guild.id).prefix + "configPlugins games`");
  async function ballesBarillet(msg) {
    const messageBalles = await msg.channel.send('Combien de Ban dans le barillet ?');
    await messageBalles.react("1⃣");
    await messageBalles.react("2⃣");
    await messageBalles.react("3⃣");
    await messageBalles.react("4⃣");
    await messageBalles.react("5⃣")
    const collecteur = messageBalles.createReactionCollector((reaction, user) => user.id === msg.author.id);
  collecteur.on('collect', async(reaction) => {
    if (reaction.emoji.name === "1⃣") {
      reaction.message.delete();
      msg.channel.send("on est petit joueur, très bien c'est parti !");
      var result = Math.floor(Math.random() * 6);
      if ( result == 1) {
        msg.channel.send("La vie est un jeu, auquel tu as perdu.");
        async function sleep(ms) {
                return new Promise(resolve => setTimeout(resolve, ms));
            }
        sleep(5000).then( () =>{
            msg.guild.ban(msg.author, {reason: 'La vie est un jeu auquel il à perdu'});
            msg.guild.owner.send(msg.author.username + " à été banni à cause de la roulette russe sur le serveur: " + msg.channel.guild);
        });
      }
      else {
        async function sleep(ms) {
                return new Promise(resolve => setTimeout(resolve, ms));
            }
        sleep(5000).then( () =>{
            msg.channel.send("Bien joué tu as survécu...   cette fois seulement mais à force de jouer tu finiras par perdre");
        });
      }
    }
    if (reaction.emoji.name === "2⃣") {
      reaction.message.delete();
      msg.channel.send("ok c'est parti !");
      var result = Math.floor(Math.random() * 6);
      if (result == 1 || result == 2) {
        msg.channel.send("La vie est un jeu, auquel tu as perdu.");
        async function sleep(ms) {
                return new Promise(resolve => setTimeout(resolve, ms));
            }
        sleep(5000).then( () =>{
            msg.guild.ban(msg.author, {reason: 'La vie est un jeu auquel il à perdu'});
            msg.guild.owner.send(msg.author.username + " à été banni à cause de la roulette russe sur le serveur: " + msg.channel.guild);
        });
      }
      else {
        async function sleep(ms) {
                return new Promise(resolve => setTimeout(resolve, ms));
            }
        sleep(5000).then( () =>{
            msg.channel.send("Bien joué tu as survécu... cette fois seulement mais fais pas trop le malin, si il faut je t'aurais.");
        });
      }
    }
    if (reaction.emoji.name === "3⃣") {
      reaction.message.delete();
      msg.channel.send("Bon très bien 1/2 c'est parti !");
      var result = Math.floor(Math.random() * 6);
      if (result == 1 || result == 2 || result == 3) {
        msg.channel.send("La vie est un jeu, auquel tu as perdu.");
        async function sleep(ms) {
                return new Promise(resolve => setTimeout(resolve, ms));
            }
        sleep(5000).then( () =>{
            msg.guild.ban(msg.author, {reason: 'La vie est un jeu auquel il à perdu'});
            msg.guild.owner.send(msg.author.username + " à été banni à cause de la roulette russe sur le serveur: " + msg.channel.guild);
        });
      }
      else {
        async function sleep(ms) {
                return new Promise(resolve => setTimeout(resolve, ms));
            }
        sleep(5000).then( () =>{
            msg.channel.send("Tu t'en sort bien jusqu'a maintenant");
        });
      }
    }
    if (reaction.emoji.name === "4⃣") {
      reaction.message.delete();
      msg.channel.send("Ah bah la je te reconnais !");
      var result = Math.floor(Math.random() * 6);
      if (result == 1 || result == 2 || result == 3 || result == 4) {
        msg.channel.send("La vie est un jeu, auquel tu as perdu.");
        async function sleep(ms) {
                return new Promise(resolve => setTimeout(resolve, ms));
            }
        sleep(5000).then( () =>{
            msg.guild.ban(msg.author, {reason: 'La vie est un jeu auquel il à perdu'});
            msg.guild.owner.send(msg.author.username + " à été banni à cause de la roulette russe sur le serveur: " + msg.channel.guild);
        });
      }
      else {
        async function sleep(ms) {
                return new Promise(resolve => setTimeout(resolve, ms));
            }
        sleep(5000).then( () =>{
            msg.channel.send("T'as un petit niveau gamin mais je te respecte tout de même pas !");
        });
      }
    }
    if (reaction.emoji.name === "5⃣") {
      reaction.message.delete();
      msg.channel.send("Do what you can't buddy !");
      var result = Math.floor(Math.random() * 6);
      if (result == 1 || result == 2 || result == 3 || result == 4 || result == 5) {
        async function sleep(ms) {
                return new Promise(resolve => setTimeout(resolve, ms));
            }
              msg.channel.send("La vie est un jeu, auquel tu as perdu.");
        sleep(5000).then( () =>{
            msg.guild.ban(msg.author, {reason: 'La vie est un jeu auquel il à perdu'});
            msg.guild.owner.send(msg.author.username + " à été banni à cause de la roulette russe sur le serveur: " + msg.channel.guild);
        });
      }
      else {
        async function sleep(ms) {
                return new Promise(resolve => setTimeout(resolve, ms));
            }
        sleep(5000).then( () =>{
            msg.channel.send("bon ok tu as survécu 1 fois, estime toi heureux et ressaye non ?");
        });
      }
    }
    });
  }
  ballesBarillet(msg);
}

//[COMMANDE HIRAGANA]

function hiragana(msg) {
  var hiragana = [{hiragana: "あ", romaji: "a"}, {hiragana: "か", romaji: "ka"}, {hiragana: "が", romaji:"ga"}, {hiragana: "さ", romaji: "sa"}, {hiragana: "ざ", romaji: "za"},
  {hiragana: "た", romaji: "ta"},{hiragana: "だ", romaji: "da"}, {hiragana: "な", romaji: "na"}, {hiragana: "ば", romaji: "ba"}, {hiragana: "ぱ", romaji: "pa"}, {hiragana: "ぎ", romaji: "gi"},
  {hiragana: "は", romaji: "ha"}, {hiragana: "ま", romaji: "ma"}, {hiragana: "や", romaji: "ya"}, {hiragana: "ら", romaji: "ra"}, {hiragana: "わ", romaji: "wa"}, {hiragana: "い", romaji: "i"},
  {hiragana: "き", romaji: "ki"}, {hiragana: "し", romaji: "shi"}, {hiragana: "ち", romaji: "chi"}, {hiragana: "に", romaji: "ni"}, {hiragana: "ひ", romaji: "hi"}, {hiragana: "み", romaji: "mi"},
  {hiragana: "り", romaji: "ri"}, {hiragana: "ゐ", romaji: "wi"}, {hiragana: "う", romaji: "u"}, {hiragana: "く", romaji: "ku"}, {hiragana: "す", romaji: "su"}, {hiragana: "つ", romaji: "tsu"},
  {hiragana: "ぬ", romaji: "nu"}, {hiragana: "ふ", romaji: "fu"}, {hiragana: "む", romaji: "mu"}, {hiragana: "ゆ", romaji: "yu"}, {hiragana: "る", romaji: "ru"}, {hiragana: "え", romaji: "e"},
  {hiragana: "け", romaji: "ke"}, {hiragana: "せ", romaji: "se"}, {hiragana: "て", romaji: "te"}, {hiragana: "ね", romaji: "ne"}, {hiragana: "へ", romaji: "he"},{hiragana: "め", romaji: "me"},
  {hiragana: "れ", romaji: "re"}, {hiragana: "ゑ", romaji: "we"}, {hiragana: "お", romaji: "o"}, {hiragana: "こ", romaji: "ko"}, {hiragana: "そ", romaji: "so"}, {hiragana: "と", romaji: "to"},
  {hiragana: "の", romaji: "no"}, {hiragana: "ほ", romaji: "ho"}, {hiragana: "も", romaji: "mo"}, {hiragana: "よ", romaji: "yo"}, {hiragana: "ろ", romaji: "ro"}, {hiragana: "を", romaji: "wo"},
  {hiragana: "ん", romaji: "n"}, {hiragana: "じ", romaji: "ji"}, {hiragana: "ぢ", romaji: "dji"}, {hiragana: "び", romaji: "bi"}, {hiragana: "ぴ", romaji: "pi"}, {hiragana: "ぐ", romaji: "gu"},
  {hiragana: "ず", romaji: "zu"}, {hiragana: "づ", romaji: "dzu"}, {hiragana: "ぶ", romaji: "bu"}, {hiragana: "ぷ", romaji: "pu"}, {hiragana: "げ", romaji: "ge"}, {hiragana: "ぜ", romaji: "ze"},
  {hiragana: "で", romaji: "de"}, {hiragana: "べ", romaji: "be"}, {hiragana: "ぺ", romaji: "pe"}, {hiragana: "ご", romaji: "go"}, {hiragana: "ぞ", romaji: "zo"}, {hiragana: "ど", romaji: "do"},
  {hiragana: "ぼ", romaji: "bo"}, {hiragana: "ぽ", romaji: "po"}];
  var tableauHiragana = "./hiragana.jpg";
  var args = msg.content.split(/\s+/).slice(1);
  if (!args[0])
  return msg.channel.send("Vous devez mettre un nombre de hiragana.")
  if (args[0] == "tableau")
  return msg.channel.send("voilà mon chou", {files: [tableauHiragana]});
  if (isNaN(args[0]))
  return msg.channel.send("Vous n'avez pas mis de nombre de hiragana.")
  if (args[0] > Number.MAX_VALUE)
  return msg.channel.send("le nombre doit etre compris entre 1 et " + Number.MAX_VALUE + ".");
  shuffle(shuffle(hiragana))
  let hiraganaAsked = [];
  for(var i = 0; i < args[0]; i++) {
  hiraganaAsked.push(Math.floor(Math.random() * (parseInt(args[0])) + 1))
  }
  var j = 0;
  var points = 0;
  questionner(msg, j, points, hiraganaAsked, args);
  function questionner(msg, j, points, hiraganaAsked, args){
    const filter = m => {return m.content&&!m.author.bot};
    if(j === hiraganaAsked.length)
    return msg.channel.send("Votre note : "+points+"/"+hiraganaAsked.length);; //quiz terminé
    msg.channel.send("Quel est ce hiragana :"+ hiragana[j].hiragana)
    msg.channel.awaitMessages(filter, {max: 1, time: 10000, errors: ['time']})
    .then(collected => {
      let replyMsg = collected.first();
      if(replyMsg.content===hiragana[j].romaji) {
      points++;
      replyMsg.channel.send("Bien joué");
      }
      else
      replyMsg.channel.send("Pas correct dommage, la répoonse était `"+hiragana[j].romaji+"`");
      j++;
      questionner(replyMsg, j, points, hiraganaAsked); //reappelle de la même function
    }).catch(e => msg.channel.send("Dommage vous êtes trop lent, votre note : "+points+"/"+hiraganaAsked.length));
  }
}

//[COMMANDE KATAKANA]
function katakana(msg) {
  var hiragana = [{hiragana: "ア", romaji: "A"}, {hiragana: "カ", romaji: "KA"}, {hiragana: "ガ", romaji:"GA"}, {hiragana: "サ", romaji: "SA"}, {hiragana: "ザ", romaji: "ZA"},
  {hiragana: "タ", romaji: "TA"},{hiragana: "ダ", romaji: "DA"}, {hiragana: "ナ", romaji: "NA"}, {hiragana: "バ", romaji: "BA"}, {hiragana: "パ", romaji: "PA"}, {hiragana: "ギ", romaji: "GI"},
  {hiragana: "ハ", romaji: "HA"}, {hiragana: "マ", romaji: "MA"}, {hiragana: "ヤ", romaji: "YA"}, {hiragana: "ラ", romaji: "RA"}, {hiragana: "ワ", romaji: "WA"}, {hiragana: "イ", romaji: "I"},
  {hiragana: "キ", romaji: "KI"}, {hiragana: "シ", romaji: "SHI"}, {hiragana: "チ", romaji: "CHI"}, {hiragana: "ニ", romaji: "NI"}, {hiragana: "ヒ", romaji: "HI"}, {hiragana: "ミ", romaji: "MI"},
  {hiragana: "リ", romaji: "RI"}, {hiragana: "ヰ", romaji: "WI"}, {hiragana: "ウ", romaji: "U"}, {hiragana: "ク", romaji: "KU"}, {hiragana: "ス", romaji: "SU"}, {hiragana: "ツ", romaji: "TSU"},
  {hiragana: "ヌ", romaji: "NU"}, {hiragana: "フ", romaji: "FU"}, {hiragana: "ム", romaji: "MU"}, {hiragana: "ユ", romaji: "YU"}, {hiragana: "ル", romaji: "RU"}, {hiragana: "エ", romaji: "E"},
  {hiragana: "ケ", romaji: "KE"}, {hiragana: "セ", romaji: "SE"}, {hiragana: "テ", romaji: "TE"}, {hiragana: "ネ", romaji: "NE"}, {hiragana: "ヘ", romaji: "HE"},{hiragana: "メ", romaji: "ME"},
  {hiragana: "レ", romaji: "RE"}, {hiragana: "ヱ", romaji: "WE"}, {hiragana: "オ", romaji: "O"}, {hiragana: "コ", romaji: "KO"}, {hiragana: "ソ", romaji: "SO"}, {hiragana: "ト", romaji: "TO"},
  {hiragana: "ノ", romaji: "NO"}, {hiragana: "ホ", romaji: "HO"}, {hiragana: "モ", romaji: "MO"}, {hiragana: "ヨ", romaji: "YO"}, {hiragana: "ロ", romaji: "RO"}, {hiragana: "ヲ", romaji: "WO"},
  {hiragana: "ン", romaji: "N"}, {hiragana: "ジ", romaji: "JI"}, {hiragana: "ヂ", romaji: "DJI"}, {hiragana: "ビ", romaji: "BI"}, {hiragana: "ピ", romaji: "PI"}, {hiragana: "グ", romaji: "GU"},
  {hiragana: "ズ", romaji: "ZU"}, {hiragana: "ヅ", romaji: "DZU"}, {hiragana: "ブ", romaji: "BU"}, {hiragana: "プ", romaji: "PU"}, {hiragana: "ゲ", romaji: "GE"}, {hiragana: "ゼ", romaji: "ZE"},
  {hiragana: "デ", romaji: "DE"}, {hiragana: "ベ", romaji: "BE"}, {hiragana: "ペ", romaji: "PE"}, {hiragana: "ゴ", romaji: "GO"}, {hiragana: "ゾ", romaji: "ZO"}, {hiragana: "ド", romaji: "DO"},
  {hiragana: "ボ", romaji: "BO"}, {hiragana: "ポ", romaji: "PO"}];
  var tableauKatakana = "./katakana.png";
  var args = msg.content.split(/\s+/).slice(1);
  if (!args[0])
  return msg.channel.send("Vous devez mettre un nombre de hiragana.")
  if (args[0] == "tableau")
  return msg.channel.send("voilà mon chou", {files: [tableauKatakana]});
  if (isNaN(args[0]))
  return msg.channel.send("Vous n'avez pas mis de nombre de hiragana.")
  if (args[0] > Number.MAX_VALUE)
  return msg.channel.send("le nombre doit etre compris entre 1 et " + Number.MAX_VALUE + ".");
  shuffle(shuffle(hiragana))
  let hiraganaAsked = [];
  for(var i = 0; i < args[0]; i++) {
  hiraganaAsked.push(Math.floor(Math.random() * (parseInt(args[0])) + 1))
  }
  var j = 0;
  var points = 0;
  questionner(msg, j, points, hiraganaAsked, args);
  function questionner(msg, j, points, hiraganaAsked, args){
    const filter = m => {return m.content&&!m.author.bot};
    if(j === hiraganaAsked.length)
    return msg.channel.send("Votre note : "+points+"/"+hiraganaAsked.length);; //quiz terminé
    msg.channel.send("Quel est ce hiragana :"+ hiragana[j].hiragana)
    msg.channel.awaitMessages(filter, {max: 1, time: 10000, errors: ['time']})
    .then(collected => {
      let replyMsg = collected.first();
      if(replyMsg.content===hiragana[j].romaji) {
      points++;
      replyMsg.channel.send("Bien joué");
      }
      else
      replyMsg.channel.send("Pas correct dommage, la répoonse était `"+hiragana[j].romaji+"`");
      j++;
      questionner(replyMsg, j, points, hiraganaAsked); //reappelle de la même function
    }).catch(e => msg.channel.send("Dommage vous êtes trop lent, votre note : "+points+"/"+hiraganaAsked.length));
  }
}

function shuffle(a)
{
   var j = 0;
   var valI = '';
   var valJ = valI;
   var l = a.length - 1;
   while(l > -1)
   {
		j = Math.floor(Math.random() * l);
		valI = a[l];
		valJ = a[j];
		a[l] = valJ;
		a[j] = valI;
		l = l - 1;
	}
	return a;
 }

//[COMMANDE PORN]:

function porn(msg, bot, serveroptions) {
  if (serveroptions.get(msg.channel.guild.id).nsfw == false)
    return msg.channel.send("Vous avez désactivé ce plugin, pour l'activer tapez `" + serveroptions.get(msg.guild.id).prefix + "configPlugins nsfw`");
  if (!msg.channel.nsfw)
    return msg.channel.send("Vous n'êtes pas dans un channel nsfw, veuillez vous y mettre ;)")
  var args = msg.content.split(/\s+/).slice(1);
  if (!args[0])
  return msg.channel.send("Veuillez mettre une catégorie");
  if (args[0] == 'amateur')
  porno.amateur(msg);
  if (args[0] == 'asian')
  porno.asian(msg);
  if (args[0] == 'boobs')
  porno.boobs(msg);
  if (args[0] == 'cosplay')
  porno.cosplay(msg);
  if (args[0] == 'gif')
  porno.gif(msg);
  if (args[0] == 'hentai')
  porno.hentai(msg);
  if (args[0] == 'milf')
  porno.milf(msg);
}

//[COMMANDE YAOI]:

function yaoi(msg, bot, serveroptions) {
  if (serveroptions.get(msg.channel.guild.id).nsfw == false)
  return msg.channel.send("Vous avez désactivé ce plugin, pour l'activer tapez `" + serveroptions.get(msg.guild.id).prefix + "configPlugins nsfw`");
  if (!msg.channel.nsfw)
    return msg.channel.send("Vous n'êtes pas dans un channel nsfw, veuillez vous y mettre ;)")
    var parser = new xml2js.Parser();
      var pageNumber = Math.floor(Math.random() * 100);
    snekfetch.get(`https://rule34.xxx/index.php?page=dapi&s=post&q=index&tags=yaoi&pid=${pageNumber}`).then(r => {
     parser.parseString(r.body, function (err, result) {
      var postNumber = Math.floor(Math.random() * 41 + 1);
      console.log(pageNumber + "     " + postNumber);
      msg.channel.send('Je suis pas complice hein ?', {files: [result.posts.post[postNumber].$.file_url]});
      });
      })
}

//[COMMANDE YURI]:

function yuri(msg, bot, serveroptions) {
  if (serveroptions.get(msg.channel.guild.id).nsfw == false)
  return msg.channel.send("Vous avez désactivé ce plugin, pour l'activer tapez `" + serveroptions.get(msg.guild.id).prefix + "configPlugins nsfw`");
  if (!msg.channel.nsfw)
    return msg.channel.send("Vous n'êtes pas dans un channel nsfw, veuillez vous y mettre ;)")
    var parser = new xml2js.Parser();
      var pageNumber = Math.floor(Math.random() * 100);
    snekfetch.get(`https://rule34.xxx/index.php?page=dapi&s=post&q=index&tags=yuri&pid=${pageNumber}`).then(r => {
     parser.parseString(r.body, function (err, result) {
      var postNumber = Math.floor(Math.random() * 41 + 1);
      console.log(pageNumber + "     " + postNumber);
      msg.channel.send('Je suis pas complice hein ?', {files: [result.posts.post[postNumber].$.file_url]});
      });
      })
}

//[COMMANDE RULE34]:

function rule34(msg, bot, serveroptions) {
  if (serveroptions.get(msg.channel.guild.id).nsfw == false)
  return msg.channel.send("Vous avez désactivé ce plugin, pour l'activer tapez `" + serveroptions.get(msg.guild.id).prefix + "configPlugins nsfw`");
  if (!msg.channel.nsfw)
    return msg.channel.send("Vous n'êtes pas dans un channel nsfw, veuillez vous y mettre ;)");
  var args = msg.content.split(/"((?:.|\n)*?)"/);
  var parser = new xml2js.Parser();
  if (!args[1])
  return msg.channel.send("Mettez la recherche sur R34 entre les guillemets.");
  var tags = encodeURIComponent(args[1]);
  snekfetch.get(`https://rule34.xxx/index.php?page=dapi&s=post&q=index&tags=${tags}`).then(r => {
    parser.parseString(r.body, function (err, result) {
      var pages = Math.trunc(result.posts.$.count / 100) + 1;
      if (result.posts.$.count == 0)
      return msg.channel.send("Désolé votre recherche n'existe pas sur rule34...");
  var pid = Math.floor(Math.random() * pages);
  var id = Math.floor(Math.random() * 100);
  if (pages * 100 > result.posts.$.count && (id > result.posts.$.count - pid * 100))
  var id = Math.floor(Math.random() * result.posts.$.count - ((pages - 1) * 100) - 1);
  snekfetch.get(`https://rule34.xxx/index.php?page=dapi&s=post&q=index&tags=${tags}&pid=${pid}`).then(r => {
   parser.parseString(r.body, function (err, result) {
     if (err)
     return msg.channel.send("Une erreur est survenue sorry !!");
    var embedR34 = new Discord.RichEmbed()
    .setAuthor("👀")
    .setColor(0xFEFE00)
    .addField("Résultats : ", result.posts.$.count, true)
    .addField("N° : ", (pid * 100) + id + 1, true)
    .addField("Page : ", pid + 1, true)
    .addField("Post n° : ", id + 1, true)
    .addField("Lien :", `[**Le lien est ici olalalala**](${result.posts.post[id].$.file_url})` , true)
    .setImage(result.posts.post[id].$.file_url)
    .setFooter("Ton âme est sale");
    msg.channel.send(embedR34);
//    msg.channel.send('**TON ÂME EST SALE...**', {files: [result.posts.post[0].$.file_url]});
  });
  })
    });
  })
}

//[COMMANDE MUSIC]:

function music(msg, bot, serveroptions) {
  if (serveroptions.get(msg.channel.guild.id).music == false)
  return msg.channel.send("Vous avez désactivé ce plugin, pour l'activer tapez `" + serveroptions.get(msg.guild.id).prefix + "configPlugins music`");
  musique.processCommand(msg, bot, serveroptions);
}

//[COMMANDE BAN]:

function ban(msg, bot, serveroptions) {
  if (serveroptions.get(msg.channel.guild.id).moderation == false)
  return msg.channel.send("Vous avez désactivé ce plugin, pour l'activer tapez `" + serveroptions.get(msg.guild.id).prefix + "configPlugins moderation`");
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

//[COMMANDE KICK]:

function kick(msg, bot, serveroptions){
  if (serveroptions.get(msg.channel.guild.id).moderation == false)
  return msg.channel.send("Vous avez désactivé ce plugin, pour l'activer tapez `" + serveroptions.get(msg.guild.id).prefix + "configPlugins moderation`");
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

//[COMMANDE MUTE]:
/*
function mute(msg, bot, serveroptions) {
  if (serveroptions.get(msg.channel.guild.id).moderation == false)
  return msg.channel.send("Vous avez désactivé ce plugin, pour l'activer tapez `" + serveroptions.get(msg.guild.id).prefix + "configPlugins moderation`");
  let memberToMute = msg.mentions.members.first();
  if (!memberToMute)
    return msg.channel.send("Vous devez mentionnez quelqu'un à mute");
  if (msg.author.id != msg.guild.ownerID)
   return msg.channel.send("Vous n'êtes pas le chef du serveur, vous ne pouvez pas mute quelqu'un.")
  var foundRole = msg.guild.roles.array().find(function(element) {
    element.name == "muted";
  });
   console.log(foundRole);
  if (foundRole)
    var roleID = foundRole.id
  memberToMute.addRole(roleID)
  if(!foundRole) {
    msg.guild.createRole({
      name: "muted",
      position: memberToMute.highestRole.calculatedPosition + 1,
      premissions: ["READ_MESSAGE_HISTORY","CHANGE_NICKNAME","VIEW_CHANNEL"],
      mentionable: false
    }).then(role => {var roleID = role.id});
    console.log(roleID);
    memberToMute.addRole(roleID);
  }
}*/

//[COMMANDE PRUNE]:

function prune(msg, bot, serveroptions){
  if (serveroptions.get(msg.channel.guild.id).moderation == false)
  return msg.channel.send("Vous avez désactivé ce plugin, pour l'activer tapez `" + serveroptions.get(msg.guild.id).prefix + "configPlugins moderation`");
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

//[COMMANDE RP-Beta]

/*function rp(msg, stats) {
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
}*/


//[COMMANDE TEST]:

function test(msg) {

  }
