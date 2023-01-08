import { container, DefinePlugin } from 'webpack'
import createWebpackConfig, { WebpackConfig } from '@tsmfe-demo/webpack-config-shared'
import { exposedModules, sharedDeps, vueCompileOptions } from './common'

const PORT = 8081

const devConfig: WebpackConfig = {
  mode: 'development',
  entry: './src/index.ts',
  output: {
    publicPath: `http://localhost:${PORT}/`
  },
  devServer: {
    port: PORT,
    hot: true
  },
  plugins: [
    new container.ModuleFederationPlugin({
      name: 'shared',
      filename: 'remoteEntry.js',
      exposes: exposedModules,
      shared: sharedDeps
    }),
    new DefinePlugin(vueCompileOptions)
  ]
}

export default createWebpackConfig(devConfig)
