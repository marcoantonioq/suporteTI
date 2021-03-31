const { shell } = require('electron');

export function openUrl(url) {
  (async () => {
    shell.openExternal(url);
  })();
}
