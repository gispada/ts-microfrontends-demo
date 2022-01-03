import createWebpackConfig, {
  WebpackConfig,
  getDynamicRemote
} from '@tsmfe-demo/webpack-config-shared'
import path from 'path'
import { container } from 'webpack'
import { sharedDeps } from './common'

const prodConfig: WebpackConfig = {
  mode: 'production',
  entry: './src/index.js',
  output: {
    publicPath: '/',
    path: path.resolve(__dirname, '../build'),
    filename: 'static/js/[name].[contenthash:8].js',
    chunkFilename: 'static/js/[name].[contenthash:8].chunk.js'
  },
  plugins: [
    new container.ModuleFederationPlugin({
      name: 'container',
      remotes: {
        shared: getDynamicRemote('shared'),
        account: getDynamicRemote('account'),
        dashboard: getDynamicRemote('dashboard')
      },
      shared: sharedDeps
    })
  ]
}

export default createWebpackConfig(prodConfig)
