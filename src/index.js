// require all the things
const ytdlWrapper = require('youtube-dl-wrap');
const binaryPath = require('./setup'); // execute setup and get path at once

const ytdl = new ytdlWrapper(binaryPath); // create youtube-dl wrapper

let defaults = ['-q','-U','-f','bestaudio[ext=opus]/bestaudio']; // some sensible defaults. be quiet, auto-update, and get audio (opus when possible)

const isAUrl = (url) => { // valid url? true/false
    return url.match(/((([A-Za-z]{3,9}:(?:\/\/)?)(?:[\-;:&=\+\$,\w]+@)?[A-Za-z0-9\.\-]+|(?:www\.|[\-;:&=\+\$,\w]+@)[A-Za-z0-9\.\-]+)((?:\/[\+~%\/\.\w\-_]*)?\??(?:[\-\+=&;%@\.\w_]*)#?(?:[\.\!\/\\\w]*))?)/);
};

const magma = (link, args = [], options = {}) => {
if (typeof args === 'string') args = args.split(' '); // turns args into an array if they aren't already
if (!isAUrl(link)) link = 'ytsearch:'+link; // if the term isnt a url, make it a ytsearch term
allArgs = defaults.concat(args); // add the default arguments at the beginning
return ytdl.execStream(allArgs.unshift(link),options); // add the link at the beginning, and any options given. return a stream.
};

module.exports = magma; // default export, aka itself when required

magma.getInfo = async (link) => { // getInfo
    if (!isAUrl(link)) link = 'ytsearch:'+link; // if the term isnt a url, make it a ytsearch term
    return await ytdl.getVideoInfo(link);
}

magma.isAUrl = isAUrl; // isAUrl
