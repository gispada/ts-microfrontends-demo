import * as webpack from 'webpack'
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
        use: [loadersMap.tsLoader]
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ['babel-loader']
      },
      {
        test: /\.(png|jpe?g|gif)$/i,
        use: ['file-loader']
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

export type WebpackConfig = webpack.Configuration

export default function createWebpackConfig(config: WebpackConfig) {
  return merge(baseConfig, config)
}
