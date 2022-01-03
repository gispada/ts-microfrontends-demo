import { dependencies } from '../package.json'

// Some of the components are split into separate chunks
export const exposedModules = {
  './components': './src/components',
  './components/Table': './src/components/Table',
  './components/Charts': './src/components/Charts',
  './components-vue': './src/components-vue',
  './utils': './src/utils/index'
}

// Warning: shared dependencies are not tree shaken!
// It might not be wise to always spread all dependencies in package.json
export const sharedDeps = {
  // ...dependencies,
  react: {
    singleton: true,
    requiredVersion: dependencies.react // Fix "Unsatisfied version ... of shared singleton module react"
  },
  'react-dom': {
    singleton: true,
    requiredVersion: dependencies['react-dom']
  },
  // 'react-router': { singleton: true }, // Looks like it bundles multiple instances of react-router-dom and history
  'react-router-dom': { singleton: true },
  vue: { singleton: true },
  'styled-components': '^5.3.3'
}
