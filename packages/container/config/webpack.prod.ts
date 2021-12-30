import createWebpackConfig, { WebpackConfig } from '@tsmfe-demo/webpack-config-shared'
import path from 'path'
import { container } from 'webpack'
import { sharedDeps } from './common'

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
      name: 'container',
      remotes: {
        shared: 'shared@http://localhost:8081/remoteEntry.js',
        account: 'account@http://localhost:8082/remoteEntry.js',
        dashboard: 'dashboard@http://localhost:8083/remoteEntry.js'
      },
      shared: sharedDeps
    })
  ]
}

export default createWebpackConfig(prodConfig)
