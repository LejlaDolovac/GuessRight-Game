<template>
  <div id="app">

    <transition
        name="fade"
        mode="out-in"
      >
        <router-view/>
      </transition>
 </div>
</template>




<style lang="scss">
@import '~bulma/css/bulma.css';




#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

.fade-enter-active,
.fade-leave-active {
  transition-duration: 0.3s;
  transition-property: opacity;
  transition-timing-function: ease;
}

.fade-enter,
.fade-leave-active {
  opacity: 0
}
body {
  height: 1000px;
  width: 100%;
  background-color: #000;
  line-height: 1;
  // background-image: linear-gradient(to bottom right, pink, orange); /* Standard syntax (must be last) */
}

</style>
