/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');
const webpack = require('webpack');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');

module.exports = {
  mode: 'development',
  devServer: {
    port: 5510,
    hot: true,
    open: true,
    historyApiFallback: true,
    watchFiles: ['src/**/*.ts', 'public/**/*'],
  },
  // devtool: 'inline-source-map',
  target: ['es5', 'web'],
  entry: './src/index.ts',
  output: {
    path: path.resolve(__dirname, 'public'),
    filename: '[chunkhash].js',
    clean: true,
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
    plugins: [new TsconfigPathsPlugin({})],
  },
  plugins: [
    new HTMLWebpackPlugin({
      template: path.resolve(__dirname, 'index.html'),
      favicon: './assets/icon/favicon.ico',
    }),
    new webpack.HotModuleReplacementPlugin(),
  ],
  module: {
    rules: [
      {
        test: /\.s[ac]ss$/i,
        use: [
          'style-loader',
          'css-loader',
          'resolve-url-loader',
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true,
            },
          },
        ],
        exclude: /node_modules/,
      },
      {
        test: /\.(ts|tsx)$/,
        include: path.join(__dirname, 'src'),
        exclude: /(node_modules)|(dist)/,
        use: {
          loader: 'ts-loader',
          options: {
            configFile: path.resolve(__dirname, 'tsconfig.json'),
            // skip typechecking for speed
            transpileOnly: true,
          },
        },
      },
    ],
  },
};
