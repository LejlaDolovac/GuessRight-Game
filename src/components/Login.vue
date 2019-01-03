<template>
  <div class="navbar has-text-white has-background-black">

    <div class="fontawesome-container" v-if="!loggedIn">
      <span class="is-size-5">Login with:</span>
      <br>
      <a @click="facebookLogin"><font-awesome-icon :icon="{ prefix: 'fab', iconName: 'facebook' }" class="fontawesome"/>Facebook </a> <br>
      <font-awesome-icon :icon="{ prefix: 'fab', iconName: 'google'  }" class="fontawesome"/> Google
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
import facebookLogin from 'facebook-login-vuejs';
import firebase from 'firebase'

export default( {
    name: 'Login',
    methods: {
      facebookLogin(){
        var provider = new firebase.auth.FacebookAuthProvider();
        firebase.auth().signInWithPopup(provider).then(function(result) {
        // This gives you a Facebook Access Token. You can use it to access the Facebook API.
        var token = result.credential.accessToken;
        // The signed-in user info.
        var user = result.user;
        // ...
      }).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // The email of the user's account used.
        var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;
        // ...
      });
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
    created() {
      if (firebase.auth().currentUser) {
        this.$store.state.loggedIn = true;
        this.$store.state.currentUser = firebase.auth().currentUser.displayName;
      }
    },
    methods: {
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
      }).catch(function(error) {
          var errorCode = error.code;
          var errorMessage = error.message;
          var email = error.email;
          var credential = error.credential;
        });
    },
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
a {
  color: #fff;
}

.fontawesome-container {
  position: absolute;
  right: 0;
  }
    .fontawesome-container {
    position: absolute;
    right: 0;
    }
    a {
    color: white;
    }
<<<<<<< HEAD
</style>
=======
    .logout {
      margin-top: 1.5%;
    }
</style>
>>>>>>> master
