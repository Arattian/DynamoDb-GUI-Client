import Vue from 'vue';
import App from './App.vue';
import store from './store/store';
import './plugins/element.js';
import './plugins/jsonEditor.js';
Vue.config.productionTip = false;

new Vue({
  store,
  render: (h) => h(App),
}).$mount('#app');
