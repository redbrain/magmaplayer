const fs = require('fs');
const path = require('path');
const ytdlWrapper = require('youtube-dl-wrap');

const binpath = path.join(__dirname, '..', 'youtube-dl');

(async () => {
    if (!fs.existsSync(binpath)) {
        await ytdlWrapper.downloadFromWebsite(binpath);
        fs.chmod(binpath, '755', (err)=>{
            if (err) throw err;
        });
    } else {
        await ytdl.execPromise(['-U']);
    }
})();