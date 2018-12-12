<template>
  <div id="timer">
      <p> {{ count }} </p>
      <button @click="timer">Starta timern!</button>
  </div>
</template>

<script>
export default {
    name: 'Countdown',
    data() {
      return {
        count: 60,
        time: ''
      }
    },
    methods: {
        timer: function() {
            this.time = setInterval(() => {
            this.count--;
            if (this.count === 0) {
                alert("Slut!");
                clearInterval(timer);
                this.count = "Game over";
            }
            }, 1000);
        }
    }
}
</script>

<style scoped>

</style>
