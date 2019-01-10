import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import VueFire from 'vuefire'; //Creates a custom version for Firebase & Vue.js
import firebase from 'firebase';
import {fb} from './firebase-config'; // Provides Firebase / Initial Firebase access.
import { library } from '@fortawesome/fontawesome-svg-core'; // Installs libraries to hold the icons
import { faUserSecret } from '@fortawesome/free-solid-svg-icons'; // Download a specific icon
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'; // It's an FA icon pack
import { faGoogle } from '@fortawesome/free-brands-svg-icons';
import VueConfetti from 'vue-confetti';

// Importing FontAwesome icons, here is a library.add needed for each icon you want included
library.add(faUserSecret)
library.add(faGoogle)

Vue.component('font-awesome-icon', FontAwesomeIcon); // skapar syntax för fontawesome. (?)
Vue.use(VueFire);
Vue.config.productionTip = false,
require("./assets/main.scss"); // Provides the ability to change colors in Bulma classes, font-family etc.
// add stylesheet
        
Vue.use(VueConfetti);

let app = '';

fb.auth(). onAuthStateChanged(() => {
  if(!app) {
    app = new Vue({
      router,
      store,
      created() {
        if (firebase.auth().currentUser) {
          this.$store.state.loggedIn = true;
          this.$store.state.currentUser = firebase.auth().currentUser.displayName;
        }
      },
      render: h => h(App)
    }).$mount('#app');
  }
});
