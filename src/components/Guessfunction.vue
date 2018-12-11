<template>
<div class="brain">
        <h3> Guess the number homie </h3>
        <button @click="timerFunction">Start</button>
        <p>Time left: <span>{{ timer }}</span></p>
        <p> {{ message }} </p>
        <p v-show="hideNum"> {{ this.$store.state.number }} </p>
        <div>
            <input type="number" v-model="guessedNumber" @keyup.enter="guessNumber" :disabled="inputDisabled">
        </div>
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
        hideNum: false,
        numberInterval: '',
        timerInterval: '',
        timer: 10,
        inputDisabled: true
      }
    },
    computed: {
    },
    methods: {
        guessNumber: function () {
          if (this.$store.state.number == this.guessedNumber) {
              this.message = "Correct, my man!"; 
              this.hideNum = !this.hideNum;
              this.inputDisabled = true;
              this.numberInterval = setInterval(() => {
                this.hideNum = false
                this.$store.commit('newRandomNumber')
                this.message = '';
                this.guessedNumber = 0;
                this.inputDisabled = false;
                clearInterval(this.numberInterval)
              }, 2000);
          } else if (this.$store.state.number > this.guessedNumber) {
              this.message = "The number is higher!";
          } else if (this.$store.state.number < this.guessedNumber) {
              this.message = "The number is lower!";
          }
        },
        timerFunction() {
            this.timerInterval = setInterval(() => {
                this.inputDisabled = false
                this.timer--
                if(this.timer == 0) {
                    clearInterval(this.timerInterval)
                    this.$store.commit('newRandomNumber')
                    this.inputDisabled = true
                    this.timer = "Times up, loser"
                }
              }, 1000);
        }
    },
}
</script>

<style scoped>

p{
    color: midnightblue;
    font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;

}

</style>