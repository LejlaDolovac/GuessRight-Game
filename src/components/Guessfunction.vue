<template>
<div class="brain">
        <h3> Guess the number homie </h3>
<<<<<<< HEAD
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
            <button class="button_counter_increment" @click="increment">Plus</button>
            <button class="button_counter_decrement" @click="decrement">Minus</button>
            <button class="button_counter_testing" @click="testingNumbers">Test</button>
        </div>
=======
        <button @click="timerFunction(); startShow = false; inputDisabled = false; timer = 10" v-show="startShow">Start</button>
        <p>Time left: <span>{{ timer }}</span></p>
        <p> {{ message }} </p>
        <p v-show="hideNum"> {{ this.$store.state.number }} </p>
        <div>

        <input  class="search" type="number" v-model="guessedNumber" @keyup.enter="guessNumber">
        </div>
        <button class="btn" @click="guessNumber">Press</button>
            <input type="number" v-model="guessedNumber" @keyup.enter="guessNumber" :disabled="inputDisabled">

        <button @click="guessNumber">Submit Number</button>
        <br>
        <br>
        <p>Your result is: <span>{{ this.$store.state.correctAnswers }}</span> </p>
>>>>>>> 395547381326acc68a839905a8c156e107068d21
    </div>
</template>

<script>
export default {
    name: 'Guessfunction',
    data() {
      return {
<<<<<<< HEAD
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
=======
        guessedNumber: Number,
        message: '',
        hideNum: false,
        rightAnswers: 0,
        numberInterval: '',
        timerInterval: '',
        timer: 10,
        inputDisabled: true,
        startShow: true
      }
    },
    computed: {
    },
    methods: {
        guessNumber: function () {
          if (this.$store.state.number == this.guessedNumber) {
              this.message = "Correct!"; 
              this.rightAnswers++;
              console.log(this.rightAnswers);
              this.message = "Correct, my man!"; 
              this.hideNum = !this.hideNum;
              this.$store.state.correctAnswers++;
              console.log(this.correctAnswers);
              this.inputDisabled = true;
              clearInterval(this.timerInterval)
              this.numberInterval = setInterval(() => {
                this.hideNum = false
                this.$store.commit('newRandomNumber')
                this.message = '';
                this.guessedNumber = Number;
                this.inputDisabled = true
                this.timer = 10
                this.startShow = true
                clearInterval(this.numberInterval)
              }, 2000);
          } else if (this.$store.state.number > this.guessedNumber) {
              this.message = "The number is higher!";
          } else if (this.$store.state.number < this.guessedNumber) {
              this.message = "The number is lower!";
          }
          
          }
>>>>>>> 395547381326acc68a839905a8c156e107068d21
        },
<<<<<<< HEAD
        testingNumbers() {
            if(this.$store.state.number == this.count) {
                alert("Whaaaa!")
            } else {
                alert("Whööööö!")
            }
        }
    }
}
=======

        timerFunction() {
            this.timerInterval = setInterval(() => {
                this.timer--
                if(this.timer == 0) {
                    clearInterval(this.timerInterval)
                    this.$store.commit('newRandomNumber')
                    this.inputDisabled = true
                    this.timer = "Loser!"
                    this.startShow = true
                    this.message = ''
                }
              }, 1000);
        }
    }

>>>>>>> 9560afcc4f47413b6c5f9f914952d8fcf7b85af5
</script>

<style scoped>

p{
    color: midnightblue;
    font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;

}

</style>
