const REMOTES_MAP_KEY = '__remotes_map__'

export const getDynamicRemote = (name: tsmfe.Package['name']) => {
  return `promise new Promise((resolve, reject) => {
    const getRemotesMap = () => (
      window.${REMOTES_MAP_KEY} ||
      (window.${REMOTES_MAP_KEY} = fetch('${process.env.REMOTES_MAP_URL}').then((res) => res.json()))
    );
    getRemotesMap().then((remotesMap) => {
      const remoteConfig = remotesMap.${name};
      __webpack_require__.l(
        remoteConfig.url,
        function onLoad(event) {
          if (typeof window.${name} !== 'undefined') {
            return resolve(window.${name});
          }
          const error = new Error();
          error.message = 'Loading script failed. Could not load ${name}@' + event.target.src;
          error.name = 'ScriptExternalLoadError';
          reject(error);
        },
        '${name}'
      );
    });
  })`.replace(/\n\s+/g, ' ')
}
