// metro.config.js
// Metro is the JavaScript bundler that React Native uses (like Webpack for web)
// This config file tells Metro which folders to ignore when watching for file changes
// This fixes the EMFILE "too many open files" error

const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

// Tell Metro to ignore the backend folder and other unnecessary folders
// This reduces the number of files being watched
config.watchFolders = [];
config.resolver.blockList = [
    // Ignore the backend folder - Metro does not need to watch server files
    /.*\/backend\/.*/,
    // Ignore any .git folders
    /.*\/.git\/.*/,
];

module.exports = config;


//Edwin Zhou Git changes M5A1