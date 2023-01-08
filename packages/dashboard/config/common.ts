export const exposedModules = {
  './mount': './src/mount',
  './routes': './src/routes'
}

export const sharedDeps = {
  react: { singleton: true },
  'react-dom': { singleton: true, requiredVersion: '>=18' },
  'react-router': { singleton: true },
  'react-router-dom': { singleton: true },
  'styled-components': '^5.3.6'
}
