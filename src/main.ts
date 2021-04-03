import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore
import IsBusy from './plugins/IsBusy.plugin';
// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore
import Notification from './plugins/Notification.plugin';

import Hotjar from 'vue-hotjar'

Vue.use(Hotjar, {
  id: process.env.VUE_APP_HOTJAR_ID,
  snippetVersion: 6,
  isProduction: true
})

import './assets/css/style.min.css';

Vue.config.productionTip = false

Vue.use(IsBusy);
Vue.use(Notification);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
