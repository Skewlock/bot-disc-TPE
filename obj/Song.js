'use strict';
const ytdl = require('ytdl-core');


class Song {
    constructor(title, url, type, authorname, time, thumbnail) {
        this.title = title;
        this.url = url;
        this.type = type;
	this.author = authorname;
	this.time = time;
	this.thumbnail = thumbnail
    }

    getStream() {
        if (this.type == 'search')
            return this.url;
        if (this.type == 'youtube') {
            return ytdl(this.url, {
                retries: 7,
                highWaterMark: 32768
            });
        }
        if (this.type == 'soundcloud')
            return null; 
    }
}

module.exports = Song;
