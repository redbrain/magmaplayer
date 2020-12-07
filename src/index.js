// require all the things
const fs = require('fs');
const path = require('path');
const ytdlWrapper = require('youtube-dl-wrap');

const binpath = path.join(__dirname, '..', 'youtube-dl'); // store bins in the root folder of the module
require('update-ytdl'); // when require()d, download the bin if it doesn't exist, or update it if it does
const ytdl = new ytdlWrapper(binpath); // create youtube-dl wrapper

let defaults = ['-f', 'bestaudio[ext=opus]/bestaudio']; // some sensible defaults. get audio, opus when possible
let lastUpdate = Date.now();

const isAUrl = (url) => {
    return url.match(/((([A-Za-z]{3,9}:(?:\/\/)?)(?:[\-;:&=\+\$,\w]+@)?[A-Za-z0-9\.\-]+|(?:www\.|[\-;:&=\+\$,\w]+@)[A-Za-z0-9\.\-]+)((?:\/[\+~%\/\.\w\-_]*)?\??(?:[\-\+=&;%@\.\w_]*)#?(?:[\.\!\/\\\w]*))?)/);
};

const getStream = (link, args, options) => {
    if (typeof args === 'string') args = args.split(' ');
    if (!isAUrl(link)) link = 'ytsearch:'+link;
    allArgs = defaults.concat(args);
    return ytdl.execStream(allArgs.unshift(link),options);
};

const magma = (link, args = [], options = {}) => {
    if (Date.now() - lastUpdate >= 1000*60*60*24) {
        ytdl.execPromise(['-U']).then( () => {
            lastUpdate = Date.now();
            return getStream(link, args, options);
        });
    } else {
        return getStream(link, args, options);
    }
};

module.exports = magma; // default export

magma.getInfo = ytdl.getVideoInfo; // getInfo
magma.isAUrl = isAUrl; // isAUrl
