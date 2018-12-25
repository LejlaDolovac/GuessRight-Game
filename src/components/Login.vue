<template>
  <div class="navbar has-text-white has-background-black">

    <div class="fontawesome-container" v-if="!isLoggedIn">
      <span class="is-size-5">Login with:</span>
      <br>
      <font-awesome-icon :icon="{ prefix: 'fab', iconName: 'facebook' }" class="fontawesome"/> Facebook <br>
      <a @click="googleLogin"><font-awesome-icon :icon="{ prefix: 'fab', iconName: 'google'  }" class="fontawesome"/> Google</a>
    </div>

    <div class="loggedin" v-if="!isLoggedIn">
      <span>You are signed in as: {{ currentUser }} </span> <br>
      <button class="button" @click="logout">Logout</button>
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
        currentUser: false,
        isLoggedIn: false
      }
    }, /*
    created() {
      if (firebase.auth().currentUser) {
        this.isLoggedIn = true;
        alert('success');
        this.currentUser = firebase.auth().currentUser.displayName;
      } else {
        console.log('Funkar inte');
      }
    }, */
    methods: {
      googleLogin() {
      var provider = new firebase.auth.GoogleAuthProvider();
        firebase.auth().signInWithPopup(provider).then(function (result) {
          var token = result.credential.accessToken;
          var user = result.user;
          alert('Välkommen!');
        user.providerData.forEach(function (profile) {
            console.log("Sign-in provider: "+profile.providerId);
            console.log("  Provider-specific UID: "+profile.uid);
            console.log("  Name: "+profile.displayName);
            console.log("  Email: "+profile.email);
            console.log("  Photo URL: "+profile.photoURL);
        });
      }).catch(function(error) {
        // Handle Errors here.
        alert('Funkar inte');
        var errorCode = error.code;
        var errorMessage = error.message;
        var email = error.email;
        var credential = error.credential;
        });
    },
      logout() {
        firebase.auth().signOut().then(() => {
          alert('Signed out!')
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
</style>