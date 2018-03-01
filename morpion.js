'use strict'
this.morpionGame = async function (msg) {
  async function acceuilMrp(msg) {
    const messageAcceuilChi = await msg.channel.send('`Connaissez vous les règles du morpion ?`');
    await messageAcceuilChi.react("❌");
    await messageAcceuilChi.react("✔");
    const collecteur = messageAcceuilChi.createReactionCollector((reaction, user) => user.id === msg.author.id);
  collecteur.on('collect', async(reaction) => {
    if (reaction.emoji.name === "❌") {
      reaction.message.delete('`Connaissez vous les règles du morpion ?`')
      msg.channel.send("`Bon alors tu vas voir c'est très simple, en fait tu choisis une des neuf cases (en réagissant avec un chiffre) et le gagnant est celui qui arrive à aligner trois symboles identiques, horizontalement, verticalement ou en diagonale.\n Allez c'est parti !`");
      let mrpGrille = [0,0,0,0,0,0,0,0,0];
      mrpChoosePlayer(msg)
    }
    if (reaction.emoji.name === "✔") {
      reaction.message.delete('`Connaissez vous les règles du morpion ?`')
      msg.channel.send("`très bien alors on peut commencer`");
      let mrpGrille = [0,0,0,0,0,0,0,0,0];
      mrpChoosePlayer(msg)
      }
      await reaction.remove(msg.author.id);
    });
  /*```
[ ][ ][ ]
[ ][ ][ ]
[ ][ ][ ]
```
*/

}
  async function mrpChoosePlayer(msg) {
    const messageAcceuilChi = await msg.channel.send('Voulez vous jouer contre moi ou contre votre ami ?');
    await messageAcceuilChi.react("🤖");
    await messageAcceuilChi.react("👬");
    const collecteur = messageAcceuilChi.createReactionCollector((reaction, user) => user.id === msg.author.id);
  collecteur.on('collect', async(reaction) => {
    if (reaction.emoji.name === "🤖") {
      var humanOrBot = "bot";
      reaction.message.delete('Voulez vous jouer contre moi ou contre votre ami ?')
      msg.channel.send("très bien alors je lance une pièce pour savoir qui commence");
        let firstPlayer = Math.floor(Math.random() * (2) + 1);
        if (firstPlayer = 1) {
        var start = "J1";
        msg.channel.send("Très bien alors vous commencez ! :blush:");
      }
      if (firstPlayer = 2) {
        var start = "J2";
        msg.channel.send("Très bien alors je commence ! :blush:");
      }
      gameStartMrp(msg)
    }
    if (reaction.emoji.name === "👬") {
      reaction.message.delete('Voulez vous jouer contre moi ou contre votre ami ?')
      msg.channel.send('Avec qui voulez vous jouer ? (mentionner le)')
      const filter = msg => msg.mentions.members.first()
      msg.channel.awaitMessages(filter, {max: 1, time: 60000, errors: ['time']})
      .then(collected => {
        let replyMsg = collected.first();
        console.log(replyMsg)
        var Player2 = replyMsg.mentions.members.user.first();
        console.log(Player2);
//        gameStartMrp(msg)
      });
    }
      await reaction.remove(msg.author.id);
});

}
acceuilMrp(msg);
}







/*
  embed: {
    author: {
        name: msg.author.username,
        icon_url: msg.author.avatarUrl,
        url:'http://google.fr'
      },
        title: 'Music',
        color: 0xFF0000,
        fields: [
                  {
                        name: '\`!music play <url>\`',
                        value: 'Ajoute la chanson/playlist a la queue',
                        inline: true
                  },{
                        name: '\`!music skip\`',
                        value: 'Passe la chanson actuelle',
                        inline: true
                  },{
                        name: '\`!music pause\`',
                        value: 'Pause la chanson',
                        inline: true
                  },{
                        name: '\`!music resume\`',
                        value: 'Reprend la chanson',
                        inline: true
                  },{
                        name: '\`!music queue\`',
                        value: 'Affiche la queue',
                        inline: true
                  },{
                        name: '\`!music purge\`',
                        value: 'Nettoie la queue',
                        inline: true
                  },{
                        name: '\`!music np\`',
                        value: 'Affiche la chanson jouée actuellement',
                        inline: true
                  },{
                        name: '\`!music vol <0-100>\`',
                        value: 'Change le volume',
                        inline: true
                  },{
                        name: '\`!music pause\`',
                        value: 'Rejoint votre channel vocal',
                        inline: true
                  },{
                        name: '\`!music leave\`',
                        value: 'Quitte le channel vocal',
                        inline: true
                  }
                ],
      footer: {
      text: 'ce bot ne fait pas le café n\'essayez pas !',
      timestamp: new Date()
    }
  }
*/
