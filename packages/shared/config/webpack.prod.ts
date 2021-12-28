import createWebpackConfig, { WebpackConfig } from '@mfe-mono-starter/webpack-config-shared'
import path from 'path'
import { container } from 'webpack'
import { dependencies } from '../package.json'

process.env.NODE_ENV = 'production'

const prodConfig: WebpackConfig = {
  mode: 'production',
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, '../build'),
    filename: 'static/js/[name].[contenthash:8].js',
    chunkFilename: 'static/js/[name].[contenthash:8].chunk.js'
  },
  plugins: [
    new container.ModuleFederationPlugin({
      name: 'shared',
      filename: 'remoteEntry.js',
      exposes: {
        './components': './src/components',
        './components/charts': './src/components/charts',
        './components-vue': './src/components-vue',
        './utils': './src/utils'
      },
      shared: {
        ...dependencies,
        react: { singleton: true },
        'react-dom': { singleton: true },
        'react-router': { singleton: true },
        'react-router-dom': { singleton: true },
        vue: { singleton: true }
      }
    })
  ]
}

export default createWebpackConfig(prodConfig)
