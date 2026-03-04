// babel.config.js
// Babel is a tool that converts modern JavaScript into older JavaScript
// that can run on all devices. Expo needs this configuration file
// to know how to compile our React Native code.
module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
  };
};
