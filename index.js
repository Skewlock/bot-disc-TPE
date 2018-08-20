'use strict';
const Discord = require('discord.js');
const config = [process.env.TOKEN, process.env.YTAPIKEY, process.env.MENTION, process.env.RIOTAPIKEY, process.env.WEATHERAPIKEY]
const cmds = require('./commands.js');
const music = require('./music.js');
const tool = require('./tools.js');
const Enmap = require("enmap");
const EnmapLevel = require('enmap-level');
var serveroptions = new Enmap({ provider: new EnmapLevel({ name: 'serveroptions' }) });
const prompt = require('prompt');
const colors = require('colors');
prompt.message = '';
prompt.delimiter = '';

const bot = new Discord.Client();
bot.on('ready', () => {
    console.log('');
    console.log(`[!] ${bot.user.username} prête!`);
    console.log(`[!] Je suis dans ${bot.guilds.size} guildes.`);
    console.log("[!] préfix actuel " + prefix);
    console.log("[!] mention " + config[2]);
    console.log('');

    bot.user.setActivity("Ton âme", { type:"WATCHING" });


});

bot.on('guildCreate', guild => {
  serveroptions.set(guild.id, {prefix: "!", nsfw: true, games: true, actions: true, moderation: true, music: true})
});

bot.on('message', msg => {
    if (msg.author.bot || msg.channel.type != 'text')
                return;
    
    if (msg.content.startsWith(config[2])) {
        serveroptions.set(guild.id, {prefix: "!", nsfw: true, games: true, actions: true, moderation: true, music: true})
        return msg.channel.send("Pour utiliser le bot veuillez utiliser le préfix `"+serveroptions.get(msg.guild.id).prefix+"` s'il vous plait.");
    }

    if (!msg.content.startsWith(serveroptions.get(msg.guild.id).prefix))
        return;

    let cmd = msg.content.split(/\s+/)[0].slice(serveroptions.get(msg.guild.id).prefix.length).toLowerCase();
    getCmdFunction(cmd)(msg, bot, serveroptions);
});

bot.on('error', (e) => console.error(e));
bot.on('warn', (e) => console.warn(e));
bot.login(config[0]);
function getCmdFunction(cmd) {
    var COMMANDS = {
        'obvious': cmds.obvious,
        'flip': cmds.flip,
        'rp': cmds.rp,
        'trad': cmds.trad,
        'choose': cmds.choose,
        'meteo': cmds.meteo,
        'ping': cmds.ping,
        'help': cmds.help,
        'test': cmds.test,
        'color': cmds.color,
        'debug': cmds.debug,
        'configplugins': cmds.configplugins,
        'plugins': cmds.plugins,
        'music': cmds.music,
        'hug': cmds.hug,
        'kiss': cmds.kiss,
        'dance': cmds.dance,
        'nani': cmds.nani,
        'porn': cmds.porn,
        'rule34': cmds.rule34,
        'yaoi': cmds.yaoi,
        'yuri': cmds.yuri,
        'say': cmds.say,
        'hiragana': cmds.hiragana,
        'katakana': cmds.katakana,
//        'mute': cmds.mute,
        'punch': cmds.punch,
        'nomnom': cmds.nomnom,
        'woop': cmds.woop,
        'profil': cmds.profil,
        'configprefix': cmds.configprefix,
        'invert': cmds.invert,
        'triggeredinvert': cmds.triggeredinvert,
        'triggered': cmds.triggered,
        'chifumi': cmds.chifumi,
        'morpion': cmds.morpion,
        'roulette': cmds.roulette
    }
    return COMMANDS[cmd] ? COMMANDS[cmd] : () => {};
}
