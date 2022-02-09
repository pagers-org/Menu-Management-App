const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');

module.exports = {
  stories: ['../src/**/*.stories.@(js|jsx|ts|tsx|mdx)'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-viewport',
    '@storybook/addon-controls',
    '@storybook/addon-storyshots'
  ],
  typescript: {
    check: false,
    checkOptions: {},
    reactDocgen: false,
  },
  webpackFinal: (config: any) => {
    config.module.rules.unshift({
      test: /\.svg$/,
      use: [
        {
          loader: '@svgr/webpack',
          options: {
            svgoConfig: {
              plugins: {
                removeViewBox: false,
              },
            },
          },
        },
      ],
    });

    config.resolve.plugins.push(new TsconfigPathsPlugin({}));

    return config;
  },
};
