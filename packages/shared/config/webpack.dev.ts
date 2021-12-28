import { container } from 'webpack'
import createWebpackConfig, { WebpackConfig } from '@mfe-mono-starter/webpack-config-shared'
import { dependencies } from '../package.json'

const PORT = 8081

const devConfig: WebpackConfig = {
  mode: 'development',
  entry: './src/index.js',
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
      // Some of the components are split into separate chunks
      exposes: {
        './components': './src/components',
        './components/Table': './src/components/Table',
        './components/Charts': './src/components/Charts',
        './components-vue': './src/components-vue',
        './utils': './src/utils/index'
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

export default createWebpackConfig(devConfig)
