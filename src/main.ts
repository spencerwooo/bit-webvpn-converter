import Vue from 'vue'
import Clipboard from 'v-clipboard'

import App from './App.vue'
import './registerServiceWorker'
import vuetify from './plugins/vuetify'

Vue.config.productionTip = false

Vue.use(Clipboard)

new Vue({
  vuetify,
  render: h => h(App)
}).$mount('#app')
