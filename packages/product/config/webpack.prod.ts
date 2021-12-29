import createWebpackConfig, { WebpackConfig } from '@mfe-mono-starter/webpack-config-shared'
import path from 'path'
import { container } from 'webpack'
import { exposedModules, sharedDeps } from './common'

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
      name: 'product',
      filename: 'remoteEntry.js',
      remotes: {
        shared: 'shared@http://localhost:8081/remoteEntry.js',
      },
      exposes: exposedModules,
      shared: sharedDeps
    })
  ]
}

export default createWebpackConfig(prodConfig)
