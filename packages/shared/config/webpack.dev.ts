import createWebpackConfig, { WebpackConfig } from '@mfe-mono-starter/webpack-config-shared'
import { container } from 'webpack'
import HtmlWebpackPlugin from 'html-webpack-plugin'

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
    new HtmlWebpackPlugin({
      template: './public/index.html'
    }),
    new container.ModuleFederationPlugin({
      name: 'shared',
      filename: 'remoteEntry.js',
      exposes: {
        './components': './src/components',
        './utils': './src/utils'
      },
      shared: {
        react: { singleton: true },
        'react-dom': { singleton: true },
        'react-router': { singleton: true },
        'react-router-dom': { singleton: true },
        'styled-components': '^5.3.3'
      }
    })
  ]
}

export default createWebpackConfig(devConfig)
