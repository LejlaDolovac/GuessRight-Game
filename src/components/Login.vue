<template>
  <div class="navbar has-text-white has-background-black">

    <div class="fontawesome-container" v-if="!loggedIn">
      <span class="is-size-5">Login with:</span>
      <br>
      <font-awesome-icon :icon="{ prefix: 'fab', iconName: 'facebook' }" class="fontawesome"/> Facebook <br>
      <a @click="googleLogin"><font-awesome-icon :icon="{ prefix: 'fab', iconName: 'google'  }" class="fontawesome"/> Google</a>
    </div>

    <div class="loggedin">
      <span v-if="loggedIn">You are signed in as: {{ this.$store.state.currentUser }} </span> 
      <span v-if="!loggedIn" class="is-italic"> {{ logoutMessage }} </span>
      <br>
      <button v-if="loggedIn" class="button logout" @click="logout">Logout</button>
    </div>
  </div>
</template>

<script>
import firebase from 'firebase';
import {fb} from '../firebase-config'

export default( {
    name: 'Login',
    data() {
      return {
        logoutMessage: ''
      }
    },
    computed: {
      currentUser() {
        return this.$store.state.currentUser
      },
      loggedIn() {
        return this.$store.state.loggedIn
      }
    },
    // sätter den inloggade spelaren som nuvarande spelare
    created() {
      if (firebase.auth().currentUser) {
        this.$store.state.loggedIn = true;
        this.$store.state.currentUser = firebase.auth().currentUser.displayName;
      }
    },
    methods: {
      // för att logga in med ett googlekonto
      googleLogin() {
      var provider = new firebase.auth.GoogleAuthProvider();
        firebase.auth().signInWithPopup(provider).then(function(result) {
          var token = result.credential.accessToken;
          var user = result.user;
        user.providerData.forEach(function (profile) {
          alert('Welcome, ' + profile.displayName + '!');
          setInterval(function() {
             location.reload();
          }, 1500);
        });
      // om det blir error
      }).catch(function(error) {
          var errorCode = error.code;
          var errorMessage = error.message;
          var email = error.email;
          var credential = error.credential;
        });
    },
    // logga ut
    logout() {
      firebase.auth().signOut().then(() => {
        this.logoutMessage = 'You have signed out from the Guess Right Game!';
        this.$store.state.loggedIn = false;
        this.$store.state.currentUser = null;
      })
     },
    },
});
</script>

<style scoped>
    .fontawesome-container {
    position: absolute;
    right: 0;
    }
    a {
    color: white;
    }
    .logout {
      margin-top: 1.5%;
    }
</style>