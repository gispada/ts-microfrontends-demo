import createWebpackConfig, { WebpackConfig } from '@tsmfe-demo/webpack-config-shared'
import { container } from 'webpack'
import { exposedModules, sharedDeps } from './common'

const PORT = 8083

const devConfig: WebpackConfig = {
  mode: 'development',
  entry: './src/index',
  output: {
    publicPath: `http://localhost:${PORT}/`
  },
  devServer: {
    port: PORT,
    historyApiFallback: true,
    hot: true
  },
  plugins: [
    new container.ModuleFederationPlugin({
      name: 'dashboard',
      filename: 'remoteEntry.js',
      remotes: {
        shared: 'shared@http://localhost:8081/remoteEntry.js',
        product: 'product@http://localhost:8084/remoteEntry.js'
      },
      exposes: exposedModules,
      shared: sharedDeps
    })
  ]
}

export default createWebpackConfig(devConfig)
