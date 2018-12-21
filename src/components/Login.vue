<template>
  <!-- fontawesome-->
  <div class="navbar has-text-white has-background-black">
    <div class="fontawesome-container">
      <span class="is-size-5">Login with:</span>
      <br>
      <font-awesome-icon :icon="{ prefix: 'fab', iconName: 'facebook' }" class="fontawesome"/> Facebook <br>
      <font-awesome-icon :icon="{ prefix: 'fab', iconName: 'google'  }" class="fontawesome"/> Google
    </div>
  </div>
</template>

<script>
import facebookLogin from 'facebook-login-vuejs';


export default( {
    name: 'Login'
});
</script>

<style scoped>

.fontawesome-container {
  position: absolute;
  right: 0;
  }
</style>
