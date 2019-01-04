<template>
  <div class="navbar is-centered has-text-white has-background-black">

    <div class="fontawesome-container has-background-primary" v-if="!loggedIn">
      <span class="is-size-5 is-size-6-mobile">Login with:</span>
      <a class="fontawesome is-size-6-mobile" tabindex="0" @click="facebookLogin"><font-awesome-icon :icon="{ prefix: 'fab', iconName: 'facebook' }"/> Facebook</a>
      <a class="fontawesome is-size-6-mobile" tabindex="0" @click="googleLogin"><font-awesome-icon :icon="{ prefix: 'fab', iconName: 'google'  }"/> Google</a>
    </div>

    <div class="loggedin">
      <span v-if="loggedIn">You are signed in as: {{ this.$store.state.currentUser }} </span>
      <span v-if="!loggedIn" class="is-italic"> {{ logoutMessage }} </span>
      <br>
      <button v-if="loggedIn" class="button logout is-primary" @click="logout">Logout</button>
    </div>

  </div>
</template>

<script>
import facebookLogin from 'facebook-login-vuejs';
import firebase from 'firebase'
import {fb} from '../firebase-config'
export default ({
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
    methods: {
      googleLogin(){
       var provider = new firebase.auth.GoogleAuthProvider();
        firebase.auth().signInWithPopup(provider).then(function(result) {
          var token = result.credential.accessToken;
          var user = result.user;
        user.providerData.forEach(function (profile) {
          alert('Welcome, ' + profile.displayName + '!');
          setInterval(function() {
             location.reload();
          }, 2000);
        });
        }).catch(function(error) {
            var errorCode = error.code;
            var errorMessage = error.message;
            var email = error.email;
            var credential = error.credential;
          });
      },
      facebookLogin() {
        var provider = new firebase.auth.FacebookAuthProvider();
        firebase.auth().signInWithPopup(provider).then(function(result) {
          var token = result.credential.accessToken;
          var user = result.user;
          user.providerData.forEach(function (profile) {
            alert('Welcome, ' + profile.displayName + '!');
            setInterval(function() {
              location.reload();
            }, 2000);
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
          this.logoutMessage = 'You have signed out from the Guess the Number game!';
          this.$store.state.loggedIn = false;
          this.$store.state.currentUser = null;
        })
      },
    },
});
</script>

<style scoped>
@import '~bulma/css/bulma.css';
  .navbar {
    width: 100%;
    max-width: 1280px;
  }
  .fontawesome-container {
    padding: 2%;
    border: 2px solid white;
    position: absolute;
    right: 0;
    margin: 5px 8px 0px 0px;
  }
  .fontawesome-container > a {
    display: block;
  }
  a {
    color: white;
  }
  .logout {
    margin: 1.5% 0;
  }
  .loggedin {
    margin: 1%;
    padding-top: 10px;
    height: auto;
    margin: 0 auto;
  }
@media screen and (max-width: 699px) {
  .fontawesome-container {
    position: fixed;
    top: 0;
    right: 0;
    left: 0;
    margin: 0;
    padding: 1.5%;
  }
  .fontawesome-container > a {
    display: inline;
  }
  .fontawesome-container a:first-of-type:after {
      content: '|';
      margin: 2%;
  }
  .fontawesome-container > span {
    margin: 2%;
  }
}
</style>
