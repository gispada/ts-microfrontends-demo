import createWebpackConfig, { Configuration } from '@mfe-starter/webpack-config-base'
// import ModuleFederationPlugin from 'webpack/lib/container/ModuleFederationPlugin'
import HtmlWebpackPlugin from 'html-webpack-plugin'

const PORT = 8080

const devConfig: Configuration = {
  mode: 'development',
  entry: './src/index.ts',
  output: {
    publicPath: `http://localhost:${PORT}/`
  },
  devServer: {
    port: PORT,
    historyApiFallback: true
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html'
    })
    /* new ModuleFederationPlugin({
      name: 'container',
      remotes: {
        child1: 'child1@http://localhost:8081/remoteEntry.js'
      },
      shared: {
        react: { singleton: true },
        'react-dom': { singleton: true },
        'react-router': { singleton: true },
        'react-router-dom': { singleton: true }
      }
    }) */
  ]
}

export default createWebpackConfig(devConfig)
