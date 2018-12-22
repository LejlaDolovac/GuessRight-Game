<template>
  <div class="navbar has-text-white has-background-black">
    <div class="fontawesome-container">
      <span class="is-size-5">Login with:</span>
      <br>
      <font-awesome-icon :icon="{ prefix: 'fab', iconName: 'facebook' }" class="fontawesome"/> Facebook <br>
      <a @click="googleLogin"><font-awesome-icon :icon="{ prefix: 'fab', iconName: 'google'  }" class="fontawesome"/> Google</a>
    </div>
  </div>
</template>

<script>
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