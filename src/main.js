import Vue from 'vue'
import App from './App.vue'
import router from './router'
import tiplijst from './assets/tiplijst';

import VueResource from 'vue-resource'
Vue.use(VueResource)
Vue.http.options.root = './static/'

// import { yaml } from 'yaml-js' 

Vue.http.get('tiplijst.yaml')
  .then(response => {
    console.log(response)
  })


Vue.config.productionTip = false;
Vue.prototype.$tiplijst = tiplijst;
Vue.prototype.$catlijst = {
  spelling: {
    kleur: "#009de3",
    link: "https://www.taalhulp123.nl/spellinghulp123",
    naam: "Spellinghulp123"
  },
  stijl: {
    kleur: "#417635",
    link: "https://www.taalhulp123.nl/stijlhulp123",
    naam: "Stijlhulp123"
  },
  werkwoord: {
    kleur: "#754494",
    link: "https://www.taalhulp123.nl/werkwoordenhulp123",
    naam: "Werkwoordenhulp123"
  }
};

router.beforeEach((to, from, next) => {
  const id = to.params.id;
  if (tiplijst[id]){
    document.title = `taaltip: ${tiplijst[id].title} | taalhulp123.nl`;
  }
  next();
})

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
