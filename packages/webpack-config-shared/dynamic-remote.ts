const REMOTES_MAP_URL = 'https://d1ficz68tdlptx.cloudfront.net/remotesMap.json'
const REMOTES_MAP_KEY = '__remotes_map__'

export const getDynamicRemote = (name: tsmfe.Package['name']) => {
  return `promise new Promise((resolve) => {
    const getRemotesMap = () => (
      window.${REMOTES_MAP_KEY} ||
      (window.${REMOTES_MAP_KEY} = fetch('${REMOTES_MAP_URL}').then((response) => response.json()))
    );
    getRemotesMap().then((remotesMap) => {
      const remoteConfig = remotesMap.${name};
      console.log('Remote config:', remoteConfig);
      const script = document.createElement('script');
      script.src = remoteConfig.url;
      script.onload = () => {
        const proxy = {
          get: (request) => window.${name}.get(request),
          init: (arg) => {
            try {
              return window.${name}.init(arg);
            } catch (e) {
              console.warn('Remote container already initialized', e);
            }
          }
        };
        resolve(proxy);
      };
      document.head.appendChild(script);
    });
  })`.replace(/\n\s+/g, ' ')
}
