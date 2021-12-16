import webpack, { Configuration } from 'webpack'
import { merge } from 'webpack-merge'
import InterpolateHtmlPlugin from 'interpolate-html-plugin'

// Augment Webpack configuration with dev server options
import 'webpack-dev-server'

const REACT_APP = /^REACT_APP_/i

const getCustomEnv = () =>
  Object.keys(process.env)
    .filter((key) => REACT_APP.test(key))
    .reduce(
      (acc, key) => ({
        ...acc,
        [key]: JSON.stringify(process.env[key])
      }),
      {}
    )

const baseConfig: Configuration = {
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx']
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              '@babel/preset-env',
              '@babel/preset-react',
              '@babel/preset-typescript'
            ],
            plugins: ['@babel/plugin-transform-runtime']
          }
        }
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ['babel-loader']
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': getCustomEnv()
    }),
    new InterpolateHtmlPlugin({
      PUBLIC_URL: process.env.PUBLIC_URL
    })
  ]
}

export type WebpackConfig = Configuration

export default function createWebpackConfig(config: Configuration) {
  return merge(baseConfig, config)
}
