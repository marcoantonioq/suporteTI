import { render } from './render.js';

function init() {
  console.log('Iniciando Proxy...');

  render('info_system');
}

init();


// const _usuario = {
//   nome: 'Marco Antônio',
//   idade: 24,
// };

// const usuario = new Proxy(_usuario, {
//   get: function (target, propKey) {
//     if (typeof target[propKey] == 'string')
//       return String(target[propKey]).toUpperCase();
//     return target[propKey];
//   },
//   set: function (target, propKey, value) {
//     target[propKey] = value;
//     return true;
//   },
// });
