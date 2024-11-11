module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./src/'],
        extensions: ['.ios.js', '.android.js', '.js', '.ts', '.tsx', '.json'],
        alias: {
          '*': '.',
          '@FoodMamaUi': './src/presentation/ui',
          '@FoodMamaApplication': './src/application',
          '@FoodMamaAsset': './src/presentation/assets',
        },
      },
    ],
    ['react-native-reanimated/plugin'],
  ],
};
