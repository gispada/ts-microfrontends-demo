import createWebpackConfig, { WebpackConfig } from '@tsmfe-demo/webpack-config-shared'
import { container } from 'webpack'
import { exposedModules, sharedDeps } from './common'

const PORT = 8082

const devConfig: WebpackConfig = {
  mode: 'development',
  entry: './src/index.js',
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
      name: 'account',
      filename: 'remoteEntry.js',
      remotes: {
        shared: 'shared@http://localhost:8081/remoteEntry.js'
      },
      exposes: exposedModules,
      shared: sharedDeps
    })
  ]
}

export default createWebpackConfig(devConfig)
