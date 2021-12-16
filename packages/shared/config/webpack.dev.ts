import createWebpackConfig, { WebpackConfig } from '@mfe-mono-starter/webpack-config-shared'
import { container } from 'webpack'

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
      exposes: {
        './Components': './src/index.ts'
      },
      shared: {
        react: { singleton: true },
        'react-dom': { singleton: true }
      }
    })
  ]
}

export default createWebpackConfig(devConfig)
