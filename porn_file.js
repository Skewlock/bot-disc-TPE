'use strict'
const Discord = require('discord.js');
const snekfetch = require("snekfetch");
const randomPuppy = require('random-puppy');

this.amateur = function (msg) {
var subreddits = ['RealGirls','amateur','gonewild']
var sub = subreddits[Math.round(Math.random() * (subreddits.length - 1))];
randomPuppy(sub)
.then(url => {
  snekfetch.get(url).then(r => {
    msg.channel.send("Tiens gros dégeulasse tu me déçois", {files: [url]});
  })
})
}

this.asian = function (msg) {
var subreddits = ['AsianHotties','juicyasians','asianbabes']
var sub = subreddits[Math.round(Math.random() * (subreddits.length - 1))];
randomPuppy(sub)
.then(url => {
  snekfetch.get(url).then(r => {
    msg.channel.send("Tiens gros dégeulasse tu me déçois", {files: [url]});
  })
})
}

this.boobs = function (msg) {
  var max = 12449;
  var min = 10000;
  var MathRan = Math.floor(Math.random() * (max - min + 0)) + min;
var MathLoL = Math.round(MathRan);
  snekfetch.get("http://media.oboobs.ru/boobs_preview/" + MathLoL + ".jpg").then(r => {
    msg.channel.send("Tiens gros dégeulasse tu me déçois", {files: [r.body]});
  })
}

this.cosplay = function (msg) {
var subreddits = ['nsfwcosplay', 'cosplayonoff', 'cosporn', 'cosplayboobs']
var sub = subreddits[Math.round(Math.random() * (subreddits.length - 1))];
randomPuppy(sub)
.then(url => {
  snekfetch.get(url).then(r => {
    msg.channel.send("Tiens gros dégeulasse tu me déçois", {files: [url]});
  })
})
}

this.gif = function (msg) {
  var subreddits = [
      "NSFW_GIF",
      "nsfw_gifs",
      "porninfifteenseconds",
      "60FPSPorn",
      "porn_gifs",
      "nsfw_Best_Porn_Gif",
      "LipsThatGrip",
      "adultgifs"
  ]
var sub = subreddits[Math.round(Math.random() * (subreddits.length - 1))];
randomPuppy(sub)
.then(url => {
  snekfetch.get(url).then(r => {
    msg.channel.send("Tiens gros dégeulasse tu me déçois", {files: [url]});
  })
})
}

this.hentai = function (msg) {
var subreddits = ['HENTAI_GIF','hentai_irl']
var sub = subreddits[Math.round(Math.random() * (subreddits.length - 1))];
randomPuppy(sub)
.then(url => {
  snekfetch.get(url).then(r => {
    msg.channel.send("Tiens gros dégeulasse tu me déçois", {files: [url]});
  })
})
}

this.milf = function (msg) {
  var subreddits = [
      'milf',
      'amateur_milfs',
      'NotTeenNotMilf'
]
var sub = subreddits[Math.round(Math.random() * (subreddits.length - 1))];
randomPuppy(sub)
.then(url => {
  snekfetch.get(url).then(r => {
    msg.channel.send("Tiens gros dégeulasse tu me déçois", {files: [url]});
  })
})
}
