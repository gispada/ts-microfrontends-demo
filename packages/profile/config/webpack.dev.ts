import createWebpackConfig, { WebpackConfig } from '@mfe-mono-starter/webpack-config-shared'
import { container } from 'webpack'
import HtmlWebpackPlugin from 'html-webpack-plugin'

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
    new HtmlWebpackPlugin({
      template: './public/index.html'
    }),
    new container.ModuleFederationPlugin({
      name: 'profile',
      filename: 'remoteEntry.js',
      remotes: {
        shared: 'shared@http://localhost:8081/remoteEntry.js'
      },
      exposes: {
        './mount': './src/mount'
      },
      shared: {
        react: { singleton: true },
        'react-dom': { singleton: true }
        // 'react-router': { singleton: true },
        // 'react-router-dom': { singleton: true }
      }
    })
  ]
}

export default createWebpackConfig(devConfig)
