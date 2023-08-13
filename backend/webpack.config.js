const path = require('path');
const webpack = require('webpack');
const nodeExternals = require('webpack-node-externals');

module.exports =(env,argv)=> {
    const isProduction = argv.mode === 'production';

    return {
        entry: './src/index.ts',
        target: 'node',
        externals: [nodeExternals()],
        output: {
          filename: 'index.js',
          path: path.resolve(__dirname, 'build'),
        },
        resolve: {
          extensions: ['.ts', '.js'],
          alias: {
              'routes': path.resolve(__dirname, './src/routes'),
              'controllers': path.resolve(__dirname, './src/controllers'),
              '@middlewares': path.resolve(__dirname, './src/@middlewares'),
              '@constants': path.resolve(__dirname, './src/@constants'),
              'configs': path.resolve(__dirname, './src/configs'),
              'configs/sentry': path.resolve(__dirname, './src/configs/sentry'),
              'typings': path.resolve(__dirname, './src/typings'),
              'services': path.resolve(__dirname, './src/services'),
              'helpers': path.resolve(__dirname, './src/helpers'),
              '@slack_messages': path.resolve(__dirname, './src/@slack_messages'),
              'lib':path.resolve(__dirname, './src/lib'),
          },
        },
        module: {
          rules: [
            {
              test: /\.ts$/,
              use: 'ts-loader',
              exclude: /node_modules/,
            },
          ],
        },
        plugins: [
          new webpack.EnvironmentPlugin({
              NODE_ENV: isProduction ? 'production' : 'development',
          }),
        ],
    }
};
