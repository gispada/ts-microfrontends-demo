import * as webpack from 'webpack'
import { merge } from 'webpack-merge'
import InterpolateHtmlPlugin from 'interpolate-html-plugin'
import DotEnv = require('dotenv-webpack')

// Augment Webpack configuration with dev server options
import 'webpack-dev-server'

/* const ENV = /^ENV_/i

const getCustomEnv = () =>
  Object.keys(process.env)
    .filter((key) => ENV.test(key))
    .reduce(
      (acc, key) => ({
        ...acc,
        [key]: JSON.stringify(process.env[key])
      }),
      {}
    ) */

// Testing both loaders
const loadersMap: Record<string, webpack.RuleSetUseItem> = {
  tsLoader: {
    loader: 'ts-loader',
    options: {
      // transpileOnly: true
    }
  },
  babelLoader: {
    loader: 'babel-loader',
    options: {
      presets: ['@babel/preset-env', '@babel/preset-react', '@babel/preset-typescript'],
      plugins: ['@babel/plugin-transform-runtime']
    }
  }
}

const baseConfig: WebpackConfig = {
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx']
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: [loadersMap.babelLoader]
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ['babel-loader']
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.(png|jpe?g|gif)$/i,
        type: 'asset/resource'
      }
    ]
  },
  plugins: [
    new DotEnv(),
    /*   new webpack.DefinePlugin({
      'process.env': getCustomEnv()
    }), */
    new InterpolateHtmlPlugin({
      PUBLIC_URL: process.env.PUBLIC_URL
    })
  ]
}

export type WebpackConfig = webpack.Configuration

export default function createWebpackConfig(config: WebpackConfig) {
  return merge(baseConfig, config)
}
