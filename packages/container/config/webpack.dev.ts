import createWebpackConfig, { WebpackConfig } from '@tsmfe-demo/webpack-config-shared'
import { container } from 'webpack'
import { sharedDeps } from './common'

const PORT = 8080

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

export default createWebpackConfig(devConfig)
