'use strict';
import fs from 'fs';
import path from 'path';
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';


export default (env, argv) => {
  /**@type {import('webpack').Configuration}*/
  const config = {
    target: 'node',
    mode: 'none',

    entry: './src/index.ts',
    output: {
      path: path.resolve('./dist'),
      filename: 'index.js',
      library: {
        type: 'commonjs2',
      },
    },
    devtool: argv.mode === 'development' ? 'eval-cheap-module-source-map' : 'nosources-source-map',
    resolve: {
      extensions: ['.ts', '.js']
    },
    module: {
      rules: [
        {
          test: /\.ts$/,
          exclude: /node_modules/,
          use: [
            {
              loader: 'ts-loader',
            }
          ]
        }
      ]
    },
    plugins: [],
    cache: {
      type: 'memory',
    },
    externals: fs.readdirSync("node_modules"),
  };
  if (argv.mode === 'development') {
    config.module.rules.length = 0;
    config.module.rules.push({
      test: /\.ts$/,
      exclude: /node_modules/,
      use: [
        {
          loader: 'thread-loader',
          options: {
            // there should be 1 cpu for the fork-ts-checker-webpack-plugin
            workers: require('os').cpus().length - 1,
          },
        },
        {
          loader: 'ts-loader',
          options: {
            happyPackMode: true
          }
        }
      ]
    });
    config.plugins.push(new ForkTsCheckerWebpackPlugin({
      async: true,
      typescript: {
        diagnosticOptions: {
          semantic: true,
          syntactic: true,
          declaration: true
        },
      },
      eslint: {
        files: ['./src/**/*.{ts,tsx.jsx}']
      }
    }));
  }
  return config;
}