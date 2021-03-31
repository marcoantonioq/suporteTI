import Vue from '../../public/js/vue.js';

console.log(Vue);

var app = new Vue({
  el: '#app',
  data: {
    message: 'Olá Vue!',
  },
});

var app = new Vue({
  el: '#app',
  data() {
    return {
      message: `Olá system`,
      description: 'descri',
      system: { ip: 'ip' },
      app_version: '007',
      servidor_enable: { ip: null, port: null },
      servidores_reachable: [],
    };
  },
  methods: {
    close: function () {
      console.log('Sinal de fechamento enviado!!!');
    },
  },
});
