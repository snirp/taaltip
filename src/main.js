import Vue from 'vue'
import yaml from 'yaml-js'
import vueHeadful from 'vue-headful'; 

import App from './App.vue'
import router from './router'
import catlijst from './assets/catlijst';

Vue.component('vue-headful', vueHeadful);
// Vue.config.productionTip = false;

// Global state object
export const data = {
  loading: true,
  tiplijst: {},
}

// TODO: choose datasource based on environment or compilation
// const datasource = 'https://www.taalhulp123.nl/yaml/tiplijst.yaml'; 
const datasource = 'http://127.0.0.1:3000/test.yaml';
const xhr = new XMLHttpRequest();
xhr.open('GET', datasource);
xhr.onload = function() {
  if (xhr.status === 200) {
    setTimeout( ()=> {
    data.tiplijst = yaml.load(xhr.responseText);
    data.loading = false;
    }, 2000)
  }
  else {
    console.log('Request failed.');
  }
};
xhr.send();

// Make categories available as static data
Vue.prototype.$catlijst = catlijst;

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
