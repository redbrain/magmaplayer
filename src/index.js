// require all the things
const fs = require('fs');
const path = require('path');
const ytdlWrapper = require('youtube-dl-wrap');

const binpath = path.join(__dirname, '..', 'youtube-dl'); // store bins in the root folder of the module
const ytdl = new ytdlWrapper(binpath); // create youtube-dl wrapper

(async () => { if (!fs.existsSync(binpath)) {await ytdlWrapper.downloadFromWebsite(binpath) })(); // when require()d, download the bin if it doesn't exist
setInterval(

let defaults = ['-f', 'bestaudio[ext=opus]/bestaudio']; // some sensible defaults. get audio, opus when possible

const isAUrl = (url) => return url.match(/((([A-Za-z]{3,9}:(?:\/\/)?)(?:[\-;:&=\+\$,\w]+@)?[A-Za-z0-9\.\-]+|(?:www\.|[\-;:&=\+\$,\w]+@)[A-Za-z0-9\.\-]+)((?:\/[\+~%\/\.\w\-_]*)?\??(?:[\-\+=&;%@\.\w_]*)#?(?:[\.\!\/\\\w]*))?)/);

const magma = (link, args = [], options = {}) => {
    if (typeof args === 'string') args = args.split(' ');
    if (!isAUrl(link)) link = 'ytsearch:'+link;
    allArgs = defaults.concat(args);
    return ytdl.execStream(allArgs.unshift(link),options);
};

module.exports = magma; // default export

magma.getInfo = ytdl.getVideoInfo; // getInfo
magma.isAUrl = isAUrl; // isAUrl
