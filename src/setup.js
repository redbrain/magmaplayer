// setup.js
// when require()d, download the bin if it doesn't exist, or update it if it does

const platform = require('os').platform();
const fs = require('fs');
const path = require('path');
const ytdlWrapper = require('youtube-dl-wrap');

const binaryName = platform === "win32" ? "youtube-dl.exe" : "youtube-dl";
const binaryPath = path.join(__dirname, '..', binaryName);

(async () => {
    if (!fs.existsSync(binaryPath)) {
        await ytdlWrapper.downloadFromWebsite(binaryPath);
        if (platform !== "win32") {
            fs.chmod(binaryPath, '755', (err)=>{
                if (err) throw err;
            });
        }
    }
})();

module.exports = { binaryPath: binaryPath }; // execute setup and get path at once