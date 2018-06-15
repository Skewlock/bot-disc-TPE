'use strict';
//https://discordapp.com/api/oauth2/authorize?client_id=416919550672764928&permissions=8&scope=bot   invite link 2
//https://discordapp.com/api/oauth2/authorize?client_id=349599792399384593&permissions=8&scope=bot   invite link 1
//http://www.nrj.fr/webradios/nrj radio
//canvas ou jimp
const Discord = require('discord.js');
const PersistentCollection = require('djs-collection-persistent');
const config = [process.env.TOKEN, process.env.YTAPIKEY, process.env.MENTION, process.env.RIOTAPIKEY, process.env.WEATHERAPIKEY]
const cmds = require('./commands.js');
const music = require('./music.js');
const tool = require('./tools.js');
const Enmap = require("enmap");
const EnmapLevel = require('enmap-level');
var cookies = new Enmap({ provider: new EnmapLevel({ name: 'cookies' }) });
var stats = new Enmap({ provider: new EnmapLevel({ name: 'stats' }) });
const prompt = require('prompt');
const colors = require('colors');
var prefix = "!";
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

    bot.user.setGame('Se brosser les poil | ' + prefix + 'help pour de l\'aide');


});

bot.on('message', msg => {
    if (msg.author.bot || msg.channel.type != 'text')
        return;

    if (!msg.content.startsWith(prefix))
        return;
/*    if (msg.content.startsWith(config.prefix + "café"))
    {
      msg.channel.send("**JE FAIS PAS LE CAFE LIS L'AIDE AU LIEU DE DIRE N'IMPORTE QUOI !!**",{
    file: "./emojis/cafe_colere.gif"});
  }*/

    let cmd = msg.content.split(/\s+/)[0].slice(prefix.length).toLowerCase();
    getCmdFunction(cmd)(msg, cookies, stats);
});

bot.on('error', (e) => console.error(e));
bot.on('warn', (e) => console.warn(e));
bot.login(config[0]);
function getCmdFunction(cmd) {
    const COMMANDS = {
	      'ban': cmds.ban,
        'hug': cmds.hug,
        'obvious': cmds.obvious,
        'chifumi': cmds.chifumi,
        'morpion': cmds.morpion,
        'kiss': cmds.kiss,
        'flip': cmds.flip,
        'rp': cmds.rp,
        'roulette': cmds.roulette,
        'trad': cmds.trad,
        'choose': cmds.choose,
        'meteo': cmds.meteo,
        'ping': cmds.ping,
        'help': cmds.help,
        'dance': cmds.dance,
        'nani': cmds.nani,
        'punch': cmds.punch,
        'nomnom': cmds.nomnom,
        'woop': cmds.woop,
        'test': cmds.test,
        'invert': cmds.invert,
        'triggeredinvert': cmds.triggeredinvert,
        'triggered': cmds.triggered,
        'color': cmds.color,
        'debug': cmds.debug,
        'kick': cmds.kick,
	'laser':cmds.laser,
        'prune': cmds.prune,
        'music': music.processCommand,
    }
    return COMMANDS[cmd] ? COMMANDS[cmd] : () => {};
}
