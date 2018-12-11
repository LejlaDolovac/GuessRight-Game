<template>
<div class="brain">
        <h3> Guess the number homie </h3>
        <p> {{ message }} </p>
        <p v-show="hideNum"> {{ this.$store.state.number }} </p>
        <input type="number" v-model="guessedNumber">
        <button @click="guessNumber">Submit Number</button>
        <br>
        <br>
    </div>
</template>

<script>
export default {
    name: 'Guessfunction',
    data() {
      return {
        guessedNumber: 0,
        message: '',
        hideNum: false
      }
    },
    computed: {
    },
    methods: {
        guessNumber: function () {
          if (this.$store.state.number == this.guessedNumber) {
              this.message = "Correct!"; 
              this.hideNum = !this.hideNum;
          } else if (this.$store.state.number > this.guessedNumber) {
              this.message = "The number is higher!";
          } else if (this.$store.state.number < this.guessedNumber) {
              this.message = "The number is lower!";
          }
        },
    }
}
</script>

<style scoped>

p{
    color: midnightblue;
    font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;

}

</style>