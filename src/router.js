import Vue from 'vue'
import Router from 'vue-router'
import Home from './components/Home.vue'
import Dump from './components/Dump.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/dump',
      name: 'dump',
      component: Dump,
    },{
      path: '/:id?',
      name: 'home',
      component: Home,
      props: true
    }
  ]
})
