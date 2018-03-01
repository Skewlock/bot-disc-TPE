'use strict'
const Discord = require('discord.js');
this.diceroll = function(msg, stats) {
  if (!stats.get(msg.author.id))
  stats.set(msg.author.id, {mana:0, manaMax:200, vie:0, vieMax:200, pieces:0, lvl:1, xpCurrent:0, xpNextLvl:100});
  let diceNumber = msg.content.substr(13).split('d');
  if (diceNumber == 0)
  return msg.channel.send("Vous devez donner un nombre de faces");
  if (diceNumber[1] < 0)
  return msg.channel.send("Vous avez déja vu un dé avec des faces négatives ?");
  if (diceNumber[1] > Number.MAX_VALUE)
  return msg.channel.send("le nombre doit etre compris entre 1 et " + Number.MAX_VALUE + ".");
  if (isNaN(diceNumber[1]))
  return msg.channel.send("** " + diceNumber[1] + "** n'est pas un nombre");
  if (diceNumber[0] > 20 || diceNumber[0] < 1)
  return msg.channel.send("Votre nombre de dés doit être compris entre 1 et 20.")
    let result = []
    for(var i = 0; i < diceNumber[0]; i++) {
    result.push(Math.floor(Math.random() * (parseInt(diceNumber[1])) + 1))
}
  msg.channel.send("Et c'est un [**" + result + "**]");
  let xpCalc = stats.get(msg.author.id)
  xpCalc.xpCurrent ++;
  if (xpCalc.xpCurrent >= xpCalc.xpNextLvl) {
    lvlUp(msg, stats, xpCalc);
  }
  stats.set(msg.author.id, xpCalc);
}

function lvlUp(msg, stats, xpCalc) {
  console.log(xpCalc);
  while (xpCalc.xpCurrent >= xpCalc.xpNextLvl) {
  xpCalc.xpCurrent = xpCalc.xpCurrent - xpCalc.xpNextLvl;
  xpCalc.xpNextLvl = Math.round(xpCalc.xpNextLvl * 1.5);
  xpCalc.lvl ++;
  xpCalc.vieMax ++;
  xpCalc.manaMax ++;
  }
  msg.channel.send("Bravo niveau supérieur, niveau " + xpCalc.lvl + " | `Vie max :" + xpCalc.vieMax + " ManaMax :" + xpCalc.manaMax + "`");
}

this.info = function(msg, stats) {
  let cibled = msg.mentions.members.first()
  if (!cibled)
  return msg.channel.send("Vous devez mentionner quelqu'un pour avoir ses infos !");
  if (!stats.get(cibled.id))
  stats.set(cibled.id, {mana:0, manaMax:200, vie:0, vieMax:200, pieces:0, lvl:1, xpCurrent:0, xpNextLvl:100});
    let blocsBV = (stats.get(cibled.id).vie*20)/stats.get(cibled.id).vieMax;
  let BarreVie = "[";
  for (let i = 0; i < 20; i++) {
    if(blocsBV<1) BarreVie+="░￼￼";
    else BarreVie+="█";
    blocsBV=blocsBV-1
  }
  BarreVie+="]";
  let blocsBM = (stats.get(cibled.id).mana*20)/stats.get(cibled.id).manaMax;
let BarreMana = "[";
for (let i = 0; i < 20; i++) {
  if(blocsBM<1) BarreMana+="￼░￼";
  else BarreMana+="█";
  blocsBM=blocsBM-1
}
BarreMana+="]";
  let blocsXP = (stats.get(cibled.id).xpCurrent*20)/stats.get(cibled.id).xpNextLvl;
let BarreXP = "[";
for (let i = 0; i < 20; i++) {
  if(blocsXP<1) BarreXP+="░";
  else BarreXP+="█";
  blocsXP=blocsXP-1
}
BarreXP+="]";
var pieces = stats.get(cibled.id).pieces;
var embedStats = new Discord.RichEmbed()
  .setTitle("Stats")
  .setAuthor(cibled.user.username)
  .setColor(cibled.colorRole.color)
  .setThumbnail(cibled.user.displayAvatarURL)
  .addField("[LvL]", stats.get(cibled.id).lvl, true)
  .addField("[HP]", BarreVie + " " + stats.get(cibled.id).vie + "/" + stats.get(cibled.id).vieMax)
  .addField("[MP]", BarreMana + " " + stats.get(cibled.id).mana + "/" + stats.get(cibled.id).manaMax)
  .addField("[PO]", pieces)
  .addField("[XP]", BarreXP + " " + stats.get(cibled.id).xpCurrent + "/" + stats.get(cibled.id).xpNextLvl)
msg.channel.send(embedStats)
  console.log(stats.get(cibled.id));
}

this.setHP = function(msg, stats) {
  let args = msg.content.split(/\s+/).slice(1);
  console.log(args);
  let cibled = msg.mentions.members.first()
  if (!cibled)
  return msg.channel.send("Vous devez mentionner quelqu'un pour faire cette action !");
  if (!stats.get(cibled.id))
  stats.set(cibled.id, {mana:0, manaMax:200, vie:0, vieMax:200, pieces:0, lvl:1, xpCurrent:0, xpNextLvl:100});
  if (isNaN(args[1]))
  return msg.channel.send("Vous devez mettre un nombre de PV.");
  let HpMax = stats.get(cibled.id);
  if (parseInt(args[1]) > HpMax.vieMax)
  return msg.channel.send("Vous ne pouvez pas mettre plus de HP que les HPs max");
  if (args[1] < 0)
  return msg.channel.send("Vous ne pouvez pas mettre de hp négatifs.");
  let newVie = stats.get(cibled.id);
  newVie.vie = parseInt(args[1]);
  stats.set(cibled.id, newVie);
  msg.channel.send("Vous avez modifé la vie de " + cibled + " à **" + args[1] + "**.");
  console.log("fonction Hp exécutée");
}

this.setPO = function(msg, stats) {
let args = msg.content.split(/\s+/).slice(1);
console.log(args);
let cibled = msg.mentions.members.first()
if (!cibled)
return msg.channel.send("Vous devez mentionner quelqu'un pour faire cette action !");
if (!stats.get(cibled.id))
stats.set(cibled.id, {mana:0, manaMax:200, vie:0, vieMax:200, pieces:0, lvl:1, xpCurrent:0, xpNextLvl:100});
if (isNaN(args[1]))
return msg.channel.send("Vous devez mettre un nombre de PO.");
if (args[1] < 0)
return msg.channel.send("Vous ne pouvez pas mettre de PO négatives.");
let newPo = stats.get(cibled.id);
newPo.pieces = parseInt(args[1]);
stats.set(cibled.id, newPo);
msg.channel.send("Vous avez modifé les PO de " + cibled + " à **" + args[1] + "**.");
}

this.setMP = function(msg, stats) {
let args = msg.content.split(/\s+/).slice(1);
console.log(args);
let cibled = msg.mentions.members.first()
if (!cibled)
return msg.channel.send("Vous devez mentionner quelqu'un pour faire cette action !");
if (!stats.get(cibled.id))
stats.set(cibled.id, {mana:0, manaMax:200, vie:0, vieMax:200, pieces:0, lvl:1, xpCurrent:0, xpNextLvl:100});
if (isNaN(args[1]))
return msg.channel.send("Vous devez mettre un nombre de MP.");
if (args[1] < 0)
return msg.channel.send("Vous ne pouvez pas mettre de MP négatifs.");
let newMp = stats.get(cibled.id);
newMp.mana = parseInt(args[1]);
stats.set(cibled.id, newMp);
msg.channel.send("Vous avez modifé les MP de " + cibled + " à **" + args[1] + "**.");
}

this.setMaxMP = function(msg, stats) {
let args = msg.content.split(/\s+/).slice(1);
console.log(args);
let cibled = msg.mentions.members.first()
if (!cibled)
return msg.channel.send("Vous devez mentionner quelqu'un pour faire cette action !");
if (!stats.get(cibled.id))
stats.set(cibled.id, {mana:0, manaMax:200, vie:0, vieMax:200, pieces:0, lvl:1, xpCurrent:0, xpNextLvl:100});
if (isNaN(args[1]))
return msg.channel.send("Vous devez mettre un nombre de MaxMP.");
if (args[1] < 1)
return msg.channel.send("Vous ne pouvez pas mettre de MaxMP négatifs.");
let newMp = stats.get(cibled.id);
newMp.manaMax = parseInt(args[1]);
stats.set(cibled.id, newMp);
msg.channel.send("Vous avez modifé les MaxMP de " + cibled + " à **" + args[1] + "**.");
}

this.setMaxHP = function(msg, stats) {
let args = msg.content.split(/\s+/).slice(1);
console.log(args);
let cibled = msg.mentions.members.first()
if (!cibled)
return msg.channel.send("Vous devez mentionner quelqu'un pour faire cette action !");
if (!stats.get(cibled.id))
stats.set(cibled.id, {mana:0, manaMax:200, vie:0, vieMax:200, pieces:0, lvl:1, xpCurrent:0, xpNextLvl:100});
if (isNaN(args[1]))
return msg.channel.send("Vous devez mettre un nombre de MaxHP.");
if (args[1] < 1)
return msg.channel.send("Vous ne pouvez pas mettre de MaxHP négatifs.");
let newMp = stats.get(cibled.id);
newMp.vieMax = parseInt(args[1]);
stats.set(cibled.id, newMp);
msg.channel.send("Vous avez modifé les MaxHP de " + cibled + " à **" + args[1] + "**.");
}

this.setLVL = function(msg, stats) {
  let args = msg.content.split(/\s+/).slice(1);
  console.log(args);
  let cibled = msg.mentions.members.first()
  if (!cibled)
  return msg.channel.send("Vous devez mentionner quelqu'un pour faire cette action !");
  if (!stats.get(cibled.id))
  stats.set(cibled.id, {mana:0, manaMax:200, vie:0, vieMax:200, pieces:0, lvl:1, xpCurrent:0, xpNextLvl:100});
  if (isNaN(args[1]))
  return msg.channel.send("Vous devez mettre un nombre de LvL.");
  if (args[1] < 1)
  return msg.channel.send("Vous ne pouvez pas mettre un LvL inférieur à 1.");
  if (args[1] < stats.get(cibled.id).lvl) {
  let coefLvl = stats.get(cibled.id).lvl - args[1];
  let newLvl = stats.get(cibled.id);
  newLvl.vieMax -= coefLvl;
  newLvl.manaMax -= coefLvl;
    console.log(coefLvl);
  newLvl.xpNextLvl = Math.round(newLvl.xpNextLvl / (1.5 * coefLvl));
  }
  if (args[1] > stats.get(cibled.id).lvl) {
  let coefLvl = args[1] - stats.get(cibled.id).lvl
  let newLvl = stats.get(cibled.id);
  newLvl.vieMax += coefLvl;
  newLvl.manaMax += coefLvl;
  console.log(coefLvl);
  newLvl.xpNextLvl += Math.round(newLvl.xpNextLvl * 1.5 * coefLvl);
  }
  let newMp = stats.get(cibled.id);
  newMp.lvl = parseInt(args[1]);
  stats.set(cibled.id, newMp);
  msg.channel.send("Vous avez modifé le LvL de " + cibled + " à **" + args[1] + "**.");
}

this.setXP = function(msg, stats) {
  let args = msg.content.split(/\s+/).slice(1);
  console.log(args);
  let cibled = msg.mentions.members.first()
  if (!cibled)
  return msg.channel.send("Vous devez mentionner quelqu'un pour faire cette action !");
  if (!stats.get(cibled.id))
  stats.set(cibled.id, {mana:0, manaMax:200, vie:0, vieMax:200, pieces:0, lvl:1, xpCurrent:0, xpNextLvl:100});
  if (isNaN(args[1]))
  return msg.channel.send("Vous devez mettre un nombre d'XP'.");
  if (args[1] < 0)
  return msg.channel.send("Vous ne pouvez pas mettre d'XP négatifs.");
  let xpCalc = stats.get(cibled.id);
  console.log(args[1]);
  console.log(xpCalc);
  console.log(cibled.id);
  if (args[1] >= xpCalc.xpNextLvl) {
  xpCalc.xpCurrent = parseInt(args[1]);
   lvlUp(msg, stats, xpCalc);
   console.log("lvl up");
  stats.set(cibled.id, xpCalc);
  }
  else {
  xpCalc.xpCurrent = parseInt(args[1]);
  stats.set(cibled.id, xpCalc);
  msg.channel.send("Vous avez modifé l'XP' de " + cibled + " à **" + args[1] + "**.");
  }
}
