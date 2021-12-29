import webpack from 'webpack'
import { merge } from 'webpack-merge'
import InterpolateHtmlPlugin from 'interpolate-html-plugin'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import DotEnv from 'dotenv-webpack'
import { VueLoaderPlugin } from 'vue-loader'
// import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'
import CssMinimizerPlugin from 'css-minimizer-webpack-plugin'
import SimpleProgressWebpackPlugin from 'simple-progress-webpack-plugin'

// Augment Webpack configuration with dev server options
import 'webpack-dev-server'

const isTruthy = <T>(x: T | false): x is T => !!x

// Testing both loaders
const loadersMap: Record<string, webpack.RuleSetUseItem> = {
  tsLoader: {
    loader: 'ts-loader',
    options: {
      // transpileOnly: true
    }
  },
  babelLoader: {
    loader: 'babel-loader',
    options: {
      presets: [
        ['@babel/preset-env', { modules: false }],
        '@babel/preset-react',
        '@babel/preset-typescript'
      ],
      plugins: [
        '@babel/plugin-transform-runtime'
        // Uncomment to load css per component, instead of the entire Ant css; it has tradeoffs
        /*  ['import', { libraryName: 'antd', libraryDirectory: 'es', style: 'css' }, 'antd'],
        [
          'import',
          { libraryName: 'ant-design-vue', libraryDirectory: 'es', style: 'css' },
          'ant-design-vue'
        ] */
      ]
    }
  }
}

const getBaseConfig: () => WebpackConfig = () => {
  const isProd = process.env.NODE_ENV === 'production'
  return {
    resolve: {
      extensions: ['.ts', '.tsx', '.js', '.jsx', '.vue']
    },
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          exclude: /node_modules/,
          use: [loadersMap.babelLoader]
        },
        {
          test: /\.vue$/,
          loader: 'vue-loader'
        },
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: ['babel-loader']
        },
        {
          test: /\.css$/i,
          use: isProd
            ? [MiniCssExtractPlugin.loader, 'css-loader']
            : ['style-loader', 'css-loader']
        },
        {
          test: /\.(png|jpe?g|gif)$/i,
          type: 'asset/resource'
        }
      ]
    },
    // --------------- Plugins section --------------- //
    plugins: [
      new DotEnv(),
      new InterpolateHtmlPlugin({
        PUBLIC_URL: process.env.PUBLIC_URL
      }),
      new HtmlWebpackPlugin({
        template: './public/index.html'
      }),
      new VueLoaderPlugin(),
      // new BundleAnalyzerPlugin(),
      isProd && new SimpleProgressWebpackPlugin({ format: 'minimal' }),
      isProd &&
        new MiniCssExtractPlugin({
          filename: 'static/css/[name].[contenthash:8].css',
          chunkFilename: 'static/css/[name].[contenthash:8].chunk.css'
        })
    ].filter(isTruthy),
    // --------------- Optimizations section --------------- //
    ...(isProd && {
      optimization: {
        minimizer: ['...', new CssMinimizerPlugin()]
      }
    })
  }
}

export type WebpackConfig = webpack.Configuration

export default function createWebpackConfig(config: WebpackConfig) {
  return merge(getBaseConfig(), config)
}
