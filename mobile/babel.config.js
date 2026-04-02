module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      // Module resolver para aliases
      [
        'module-resolver',
        {
          root: ['./src'],
          alias: {
            '@': './src',
            '@components': './src/components',
            '@utils': './src/utils',
          },
        },
      ],
      
      // React Native Reanimated (tem que ser o último)
      'react-native-reanimated/plugin',
    ],
  };
};