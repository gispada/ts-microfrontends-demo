export const exposedModules = {
  './mount': './src/mount',
  './routes': './src/routes'
}

export const sharedDeps = {
  react: { singleton: true },
  'react-dom': { singleton: true },
  'react-router': { singleton: true },
  'react-router-dom': { singleton: true },
  'styled-components': '^5.3.3'
}
