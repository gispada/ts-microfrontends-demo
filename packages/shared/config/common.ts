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
  react: { singleton: true },
  'react-dom': { singleton: true },
  'react-router': { singleton: true },
  'react-router-dom': { singleton: true },
  vue: { singleton: true },
  'styled-components': '^5.3.3'
}
