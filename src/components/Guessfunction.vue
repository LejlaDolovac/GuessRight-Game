<template>
<div class="brain">
        <h3> Guess the number homie </h3>
        <p> {{ message }} </p>
        <p v-show="hideNum"> {{ number }} </p>
        <input type="number" v-model="guessedNumber">
        <button @click="guessNumber">Submit Number</button>
        <br>
        <br>
        <p class="counte_display">
            {{ count }}
        </p>
        <div class="counter_buttons">
            <button class="button_counter_increment" @click="randomNumber()">Random</button>
            <button class="button_counter_testing" @click="testingNumbers()">Test</button>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Guessfunction',
    data() {
      return {
        number: Math.floor(Math.random() * (10 - 1 + 1)) + 1,
        guessedNumber: 0,
        message: '',
        hideNum: false
      }
    },
    computed: {
      count() {
        return this.$store.state.count;
      }
    },
    methods: {
        guessNumber: function () {
          if (this.number == this.guessedNumber) {
              this.message = "Correct!";
              this.hideNum = !this.hideNum;
          } else if (this.number > this.guessedNumber) {
              this.message = "The number is higher!";
          } else if (this.number < this.guessedNumber) {
              this.message = "The number is lower!";
          }
        },
        increment() {
            this.$store.commit('increment')
        },
        decrement() {
            this.$store.commit('decrement')
        },
        testingNumbers() {
            if(this.$store.state.number == this.$refs.submitNumber.value) {
                alert("Right!")
                this.randomNumber()
            } else {
                if (this.$store.state.number >= this.$refs.submitNumber.value){
                alert("Wrong! Higher, dude")
                } else {
                    alert("Wrong! Lower, dude")
                }

            }
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
