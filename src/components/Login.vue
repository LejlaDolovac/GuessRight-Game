<template>
<<<<<<< HEAD
  <!-- fontawesome-->
=======
>>>>>>> 4c03081a770a2c7eec366c875cd76595aa386eff
  <div class="navbar has-text-white has-background-black">
    <div class="fontawesome-container">
      <span class="is-size-5">Login with:</span>
      <br>
<<<<<<< HEAD
      <a @click="facebookLogin"><font-awesome-icon :icon="{ prefix: 'fab', iconName: 'facebook' }" class="fontawesome"/>Facebook </a> <br>
      <font-awesome-icon :icon="{ prefix: 'fab', iconName: 'google'  }" class="fontawesome"/> Google
=======
      <font-awesome-icon :icon="{ prefix: 'fab', iconName: 'facebook' }" class="fontawesome"/> Facebook <br>
      <a @click="googleLogin"><font-awesome-icon :icon="{ prefix: 'fab', iconName: 'google'  }" class="fontawesome"/> Google</a>
>>>>>>> 4c03081a770a2c7eec366c875cd76595aa386eff
    </div>
  </div>
</template>

<script>
<<<<<<< HEAD
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
=======
import firebase from 'firebase';

export default( {
    name: 'Login',
    data() {
      return {
        user: ''
      }
    },
    methods: {
      googleLogin() {
        const provider = new firebase.auth.GoogleAuthProvider();
        firebase.auth().signInWithRedirect(provider).then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        var token = result.credential.accessToken;
        // The signed-in user info.
        this.user = result.user;
        }).catch(function(error) {
        var errorCode = error.code;
        var errorMessage = error.message;
        var email = error.email;
        var credential = error.credential;
        })
      },
      logout() {
          firebase.auth().signOut().then(function() {
        }).catch(function(error) {
        // An error happened.
        });
>>>>>>> 4c03081a770a2c7eec366c875cd76595aa386eff
      }
    }
});
</script>

<style scoped>
<<<<<<< HEAD
a {
  color: #fff;
}

.fontawesome-container {
  position: absolute;
  right: 0;
  }
</style>
=======
    .fontawesome-container {
    position: absolute;
    right: 0;
    }
    a {
    color: white;
    }
</style>
>>>>>>> 4c03081a770a2c7eec366c875cd76595aa386eff
