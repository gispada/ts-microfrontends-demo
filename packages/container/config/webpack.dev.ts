import createWebpackConfig, { WebpackConfig } from '@mfe-mono-starter/webpack-config-shared'
import { container } from 'webpack'
import HtmlWebpackPlugin from 'html-webpack-plugin'

const PORT = 8080

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
    new HtmlWebpackPlugin({
      template: './public/index.html'
    }),
    new container.ModuleFederationPlugin({
      name: 'container',
      remotes: {
        shared: 'shared@http://localhost:8081/remoteEntry.js',
        account: 'account@http://localhost:8082/remoteEntry.js',
        dashboard: 'dashboard@http://localhost:8083/remoteEntry.js'
      },
      shared: {
        react: { singleton: true },
        'react-dom': { singleton: true },
        'react-router': { singleton: true },
        'react-router-dom': { singleton: true }
      }
    })
  ]
}

export default createWebpackConfig(devConfig)
