import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import VueFire from 'vuefire'; //Skapar en anpassad version för Firebase & Vue.js
import firebase from 'firebase';
import {fb} from './firebase-config'; // Ger tillgång Firebase / Initierar Firebase.
import { library } from '@fortawesome/fontawesome-svg-core'; // installerar bibliotek som skall hålla i ikonerna
import { faUserSecret } from '@fortawesome/free-solid-svg-icons'; // laddar hem EN specifik ikon
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'; // Vet inte riktigt, men kanske berättar att det är ett FA ikon-pack
import { faGoogle } from '@fortawesome/free-brands-svg-icons';
import VueConfetti from 'vue-confetti';
import VueSelectImage from 'vue-select-image'; // you need this to select an image


// Import av FontAwesome ikoner, här behövs en library.add för varje ikon man vill ha med.
library.add(faUserSecret)
library.add(faGoogle)

Vue.use(VueSelectImage);
Vue.component('font-awesome-icon', FontAwesomeIcon); // skapar syntax för fontawesome. (?)
Vue.use(VueFire);
Vue.config.productionTip = false,
require("./assets/main.scss"); // Ger möjlighet att ändra färger i Bulma-klasser, font-family osv.
// add stylesheet
require('vue-select-image/dist/vue-select-image.css')
        
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
