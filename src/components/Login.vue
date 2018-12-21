<template>
  <!-- fontawesome-->
  <div class="navbar has-text-white has-background-black">
    <div class="fontawesome-container">
      <span class="is-size-5">Login with:</span>
      <br>
      <a @click="facebookLogin"><font-awesome-icon :icon="{ prefix: 'fab', iconName: 'facebook' }" class="fontawesome"/>Facebook </a> <br>
      <font-awesome-icon :icon="{ prefix: 'fab', iconName: 'google'  }" class="fontawesome"/> Google
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
      }
    }
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
</style>
