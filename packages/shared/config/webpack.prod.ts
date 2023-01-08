import createWebpackConfig, { WebpackConfig } from '@tsmfe-demo/webpack-config-shared'
import path from 'path'
import { container, DefinePlugin } from 'webpack'
import { exposedModules, sharedDeps, vueCompileOptions } from './common'

const prodConfig: WebpackConfig = {
  mode: 'production',
  entry: './src/index.ts',
  output: {
    path: path.resolve(__dirname, '../build'),
    filename: 'static/js/[name].[contenthash:8].js',
    chunkFilename: 'static/js/[name].[contenthash:8].chunk.js'
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

export default createWebpackConfig(prodConfig)
