import Vue from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify';
import VueGoogleCharts from 'vue-google-charts'
import JsonExcel from "vue-json-excel";
import VueDatePicker from '@mathieustan/vue-datepicker';
import '@mathieustan/vue-datepicker/dist/vue-datepicker.min.css';
import VueSweetalert2 from 'vue-sweetalert2';

// If you don't need the styles, do not connect
import 'sweetalert2/dist/sweetalert2.min.css';
import VueFileAgent from 'vue-file-agent';
//import VueFileAgentStyles from 'vue-file-agent/dist/vue-file-agent.css';

Vue.use(VueFileAgent);
Vue.use(VueSweetalert2);
Vue.use(VueDatePicker);

Vue.component("downloadExcel", JsonExcel);
Vue.use(VueGoogleCharts)
Vue.config.productionTip = false
Vue.filter('str_limit', function (value, size) {
  if (!value) return '';
  value = value.toString();

  if (value.length <= size) {
    return value;
  }
  return value.substr(0, size) ;
});
new Vue({
  router,
  vuetify,
  render: h => h(App)
}).$mount('#app')
