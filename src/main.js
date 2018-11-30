import Vue from 'vue'
import yaml from 'yaml-js'
import vueHeadful from 'vue-headful'; 

import App from './App.vue'
import router from './router'
import catlijst from './assets/catlijst';

Vue.component('vue-headful', vueHeadful);

// Global state object
export const data = {
  loading: true,
  tiplijst: {},
  testdata: false,
}

// Make categories available as static data
Vue.prototype.$catlijst = catlijst;

let datasource;

if (window.location.href.toLowerCase().indexOf('taaltip') !== -1){
  // if path contains "taalhulp", load production dataset
  datasource = 'https://raw.githubusercontent.com/taalhulp/tiplijst/master/tiplijst.yaml';
} else {
  // else load the dataset from the test branch
  console.log("NOT ON taaltip PAGE, WORKING WITH TEST DATASET")
  data.testdata = true
  datasource = 'https://raw.githubusercontent.com/taalhulp/tiplijst/test/tiplijst.yaml';
}

const xhr = new XMLHttpRequest();
xhr.open('GET', datasource);
xhr.onload = function() {
  if (xhr.status === 200) {
    data.tiplijst = yaml.load(xhr.responseText);
    data.loading = false;
  }
  else {
    console.log('Request failed.');
  }
};
xhr.send();


new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
