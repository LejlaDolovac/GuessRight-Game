<template>
  <div class="navbar has-text-white has-background-black">
    <div class="fontawesome-container">
      <span class="is-size-5">Login with:</span>
      <br>
      <font-awesome-icon :icon="{ prefix: 'fab', iconName: 'facebook' }" class="fontawesome"/> Facebook <br>
      <a @click="googleLogin"><font-awesome-icon :icon="{ prefix: 'fab', iconName: 'google'  }" class="fontawesome"/> Google</a>
      <span> {{ userName }} </span>
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
        email: '',
        userName: ''
      }
    },
    methods: {
      googleLogin() {
        const provider = new firebase.auth.GoogleAuthProvider();
        firebase.auth().signInWithRedirect(provider).then((result) => {
          // This gives you a Google Access Token. You can use it to access the Google API.
          var token = result.credential.accessToken;
          // The signed-in user info.
          }).catch(function(error) {
          var errorCode = error.code;
          var errorMessage = error.message;
          var email = error.email;
          var credential = error.credential;
          })
          var user = firebase.auth().currentUser;
          if (user != null) {
            user.providerData.forEach(function (profile) {
            console.log(profile.displayName);
            alert(profile.displayName);
            console.log("  Email: " + profile.email);
            console.log("  Photo URL: " + profile.photoURL);
          })
        }
      },
      logout() {
          firebase.auth().signOut().then(function() {
        }).catch(function(error) {
        // An error happened.
        });
      }
    }
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