import createWebpackConfig, { WebpackConfig } from '@tsmfe-demo/webpack-config-shared'
import path from 'path'
import { container } from 'webpack'
import { exposedModules, sharedDeps } from './common'

const prodConfig: WebpackConfig = {
  mode: 'production',
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, '../build'),
    filename: 'static/js/[name].[contenthash:8].js',
    chunkFilename: 'static/js/[name].[contenthash:8].chunk.js'
  },
  plugins: [
    new container.ModuleFederationPlugin({
      name: 'account',
      filename: 'remoteEntry.js',
      remotes: {
        shared: `promise new Promise(resolve => {
          fetch('https://d2p6xbnv41nqti.cloudfront.net/remotesMap.json')
            .then(response => response.json())
            .then(({ shared }) => {
              console.log('Shared remote:', shared)
              const script = document.createElement('script')
              script.src = shared.url
              script.onload = () => {
                const proxy = {
                  get: (request) => window.shared.get(request),
                  init: (arg) => {
                    try {
                      return window.shared.init(arg)
                    } catch (e) {
                      console.log('Remote container already initialized')
                    }
                  }
                }
                resolve(proxy)
              }
              document.head.appendChild(script)
            })
        })
      `
      },
      exposes: exposedModules,
      shared: sharedDeps
    })
  ]
}

export default createWebpackConfig(prodConfig)
