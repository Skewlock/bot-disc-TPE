'use strict';
const tool = require('../tools.js');

class MusicPlayer {
    constructor(guild) {
        this.queue = [];
        this.musicChannel = null;
        this.voiceConnection = null;
        this.dispatch = null;
        this.volume = 1;
        this.status = 'offline'; //Etats: offline, playing, stopped
        this.inactivityTimer = 60;
    }

    queueSong(song) {
        let index;
        if (arguments.length == 2)
            index = arguments[1];
        if (index != undefined) {
            this.queue[index] = song;
        } else {
            this.queue.push(song);
        }
    }

    playSong(msg) {
        if (this.queue.length === 0) {
            this.musicChannel.send('Fin de la queue.');
            this.changeStatus('stopped');
        } else {
            resolveVoiceChannel.call(this).then(() => {
                let song = this.queue[0];
                let stream = song.getStream();
                console.log(song.thumbnail);
                this.musicChannel.send({embed: {
                    color: 3447003,
                    fields: [{
                        name: `:notes: Joué actuellement `,
                        value: `[${song.title}]`+`(${song.url}) (\`${song.time}\`) demandé par : **${song.author}**`
                      }],
                    thumbnail: {
                        url: `${song.thumbnail}`
                    },
                    timestamp: new Date(),
                    footer: {
                      icon_url: msg.author.avatarURL,
                      text: "Le feu ça brule"
                    }
                  }
                });
                this.changeStatus('playing');
                this.dispatch = this.voiceConnection.playStream(stream, {
                    passes: 2,
                    volume: this.volume
                });

                this.dispatch.on('error', error => {
                    this.dispatch = null;
                    this.queue.shift();
                    this.playSong(msg);
                });

                this.dispatch.on('end', reason => {
                    this.dispatch = null;
                    this.queue.shift();
                    if (reason != 'leave') {
                        this.playSong(msg);
                    }
                });

                this.dispatch.on('debug', info => {
                    console.log(info);
                });
            }).catch(err => {
                if (err != 'novoice') console.log(err);
            });
        }

        function resolveVoiceChannel() {
            return new Promise((resolve, reject) => {
                if (this.voiceConnection)
                    resolve();
                else {
                    msg.channel.send(
                        `Invoquez moi en utilisant ${tool.wrap('!music join')} pour commancer a jouer la musique.`
                    );
                    reject('novoice');
                }
            });
        }
    }


    skipSong() {
        if (this.dispatch && this.status == 'playing') {
            this.musicChannel.send(`:fast_forward: ${tool.wrap(this.queue[0].title)} passée.`);
            this.dispatch.end();
        } else {
            this.musicChannel.send(`Il n'y a rien à passer`);
        }
    }

    pauseSong() {
        if (this.dispatch)
            this.dispatch.pause();
        else
            this.musicChannel.send(`Rien n'est joué actuellement`);
    }


    resumeSong() {
        if (this.dispatch)
            this.dispatch.resume();
        else
            this.musicChannel.send(`Rien n'est joué actuellement`);

    }

    printQueue(msg) {
        if (this.queue.length > 0) {
            try {
                let queueString = '';
                for (let i = 0; i < this.queue.length && i < 15; i++)
                    queueString += `${i + 1}. ${this.queue[i].title} (\`${this.queue[i].time}\`)demandé par ${this.queue[i].author}\n`;
                if (this.queue.length > 15)
                    queueString += `\net ${this.queue.length - 15} autres.`;
                msg.channel.send(queueString, {
                    'code': true
                });
            } catch (err) {
                console.log('ERROR CAUGHT:\n' + err);
                msg.channel.send(
                    `${tool.inaError} Désolé je ne peux pas vous afficher la queue maintenant. Essayez plus tard `
                );
            }
        } else {
            msg.channel.send(`Il n'y a pas de chansons dans la queue`);
        }
    }


    purgeQueue(msg) {
        this.queue = [];
        msg.channel.send('La queue a été nettoyée');
    }


    nowPlaying(msg) {
        if (this.queue.length > 0){
            msg.channel.send({embed: {
                    color: 3447003,
                    fields: [{
                        name: `:notes: Joué actuellement `,
                        value: `[${this.queue[0].title}]`+`(${this.queue[0].url}) (\`${this.queue[0].time}\`) demandé par **${this.queue[0].author}**`
                      }],
                    thumbnail: {
                        url: `${this.queue[0].thumbnail}`
                    },
                    timestamp: new Date(),
                    footer: {
                      icon_url: msg.author.avatarURL,
                      text: "Le feu ça brule"
                    }
                  }
                });
        }else{
            msg.channel.send('Rien n\'est joué actuellement');
        }
    }


    setVolume(msg) {
        let vol = parseInt(msg.content.split(/\s+/)[2]) / 100;
        if (vol && (vol >= 0 && vol <= 1)) {
            if (this.dispatch) {
                this.dispatch.setVolume(vol);
                this.volume = vol;
                msg.channel.send(`:speaker:Volume modifié a ${tool.wrap(vol * 100)}`);
            } else {
                msg.channel.send(`Rien n\'est joué actuellement`);
            }
        } else {
            msg.channel.send(`Utilisez un nombre compris entre 1 et 100`);
        }
    }


    joinVc(msg) {
        if (msg.member.voiceChannel) {
            this.musicChannel = msg.channel;
            msg.member.voiceChannel.join().then(connection => {
                this.voiceConnection = connection;
                this.musicChannel.send(
                    `:speaker: **${msg.member.voiceChannel.name}** rejoint et #**${this.musicChannel.name}**.`
                );
                this.changeStatus('stopped');
                if (this.queue.length > 0)
                    this.playSong(msg);
            })
        } else {
            msg.channel.send(`Vous n'êtes pas dans un channel vocal`);
        }
    }


    leaveVc(msg) {
        if (this.voiceConnection) {
            this.musicChannel.send(`**${this.voiceConnection.channel.name}** quitté.`);
            this.musicChannel = null;
            if (this.dispatch)
                this.dispatch.end('leave');
            this.voiceConnection.disconnect();

            this.changeStatus('offline');

            this.voiceConnection = null;
            this.dispatch = null;
        } else {
            msg.channel.send(`Je ne suis pas dans un channel vocal`);
        }
    }


    changeStatus(status) {
        this.status = status;
        this.inactivityTimer = status == 'paused' ?
            600 :
            120;
    }
}

module.exports = MusicPlayer;
