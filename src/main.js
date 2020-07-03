import Vue from 'vue';
import ElementUI from 'element-ui';
//import 'element-ui/lib/theme-chalk/index.css';
import './css/main.css';
import App from './App.vue';
import VueRouter from 'vue-router';
import { routes } from './routes';

Vue.use(ElementUI);
Vue.use(VueRouter);
Vue.config.productionTip = false;

const router = new VueRouter({
  routes,
  mode: 'history' //<-- remove o /#/ <-- back-end tem que devolver index.html
});

new Vue({
  el: '#app',
  router,
  render: h => h(App),
}).$mount('#app');