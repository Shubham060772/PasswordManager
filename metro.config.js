const { getDefaultConfig } = require("expo/metro-config");

module.exports = (() => {
  const config = getDefaultConfig(__dirname);

  config.resolver.extraNodeModules = require("node-libs-react-native");

  return config;
})();
