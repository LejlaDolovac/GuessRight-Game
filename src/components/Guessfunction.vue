<template>
<div class="brain">
    <router-link to="/">
      <button class="button is-black is-pulled-left">&#8592;</button>
    </router-link>
    <br>
    <div id="player-bot-div modal">
        <img alt="Player vs bot" id="player-bot-img" src="../assets/player.jpg">
    </div>
    <div class="game-div">
        <div class="message-body timer" v-show="botHasGuessed"> Apponent's Guess: {{ botGuessNumber }}</div>
    <div v-if="timerShow" ref="timeLeft" class="message-body timer">{{ timer }}</div>
    <div v-else class="message-body timer">END</div>
    <p v-if="message != ''" class="message-body winner-loser-message"> {{ message }} </p>
    <router-link to="/highScore">
        <button class="button is-black" v-show="this.showHighScore">View highscore</button>
    </router-link>
    <div>
    <input v-if="!startShow" class="search" type="number" v-model.number="guessedNumber" @keyup.enter="guessNumber" :disabled="inputDisabled">
    </div>
    <button v-if="!startShow" class="button btn" @click="guessNumber" :disabled="inputDisabled">Press</button>
    <br>
    </div>
    <p class="message-body wins-correct-message">Score: <span>{{ this.$store.state.correctAnswers }}</span> Bot wins: <span>{{ botWins }}</span> Tries left: <span>{{ numberOfTries }}</span> </p>
</div>
   
</template>

<script>
export default {
    name: 'Guessfunction',
    data() {
      return {
        guessedNumber: '',
        message: '',
        hideNum: false,
        numberInterval: '',
        timerInterval: '',
        countdownInterval: '',
        timer: 3,
        inputDisabled: true,
        startShow: true,
        numberOfTries: 5,
        timerShow: true,
        showHighScore: false,
        timerBotInterval: '',
        startNumber: '',
        levelNumber: '',
        botGuessNumber: '',
        botHasGuessed: false,
        arrayOfNumbers: [],
        startNumberForArray: 0,
        botWins: '',
        lowNumber: 1,
        highNumber: ''
      }
    },
    created() {
      this.$store.commit('levelNumber')
    },
    computed: {
    },
    methods: {
        startCountdown: function () {
            this.countdownInterval = setInterval(() => {
                this.timer--
                if(this.timer == 0) {
                    clearInterval(this.countdownInterval)
                    this.startShow = false
                    this.timer = this.$store.state.timer
                    this.inputDisabled = false
                    this.timerFunction()
                }
            },1000)
        },
        botGuessing: function () {
            clearInterval(this.timerInterval)
            this.inputDisabled = true
            this.timerBotInterval = setInterval(() => {
                console.log("Before bot low: " + this.lowNumber)
                console.log("Before bot high: " + this.highNumber)
                    this.botGuessNumber = this.chooseRandom()
                    console.log(this.botGuessNumber)

                    if (this.$store.state.randomNumber == this.botGuessNumber) {
                        this.message = "Bot Wins!!!"
                        this.botWins++
                        this.numberOfTries--;
                        this.numberInterval = setInterval(() => {
                            this.message = ''
                            this.hideNum = false
                            this.$store.commit('newRandomNumber')
                            this.guessedNumber = '';
                            this.inputDisabled = true
                            this.timer = 3
                            this.startShow = true
                            this.lowNumber = 1
                            this.highNumber = this.$store.state.number
                            this.botGuessNumber = ''
                            clearInterval(this.numberInterval)
                        },2000)
                        clearInterval(this.timerInterval)
                        if(this.numberOfTries == 0) {
                            this.message = "Tries up, my man!"
                            this.startShow = true
                            this.$refs.timeLeft.value = ''
                            this.timerShow = false
                            this.showHighScore = true
                        } else {
                            this.startCountdown()
                        }
                    } else if (this.$store.state.randomNumber > this.botGuessNumber) {
                        this.message = "The number is higher, bot!";
                        this.lowNumber = this.botGuessNumber+1
                        this.inputDisabled = false
                        this.timerFunction()
                    } else if (this.$store.state.randomNumber < this.botGuessNumber) {
                        this.message = "The number is lower, bot!";
                        this.highNumber = this.botGuessNumber-1
                        this.inputDisabled = false
                        this.timerFunction()
                    }
                    console.log("After bot low: " + this.lowNumber)
                    console.log("After bot high: " + this.highNumber)
                    clearInterval(this.timerBotInterval)
                    this.botHasGuessed = true
            },3000)
            if(this.$store.state.randomNumber == this.botGuessNumber) {
                this.lowNumber = 1
                this.highNumber = this.$store.state.number
                this.message = ''
            }
        },
        guessNumber: function () {
          console.log("guess: " + this.guessedNumber)
          console.log("low: " + this.lowNumber)
          console.log("high: " + this.highNumber)
          if(this.guessedNumber < this.lowNumber || this.guessedNumber > this.highNumber) {
              this.message = "Wrong input"
              return
          } else if (this.$store.state.randomNumber == this.guessedNumber) {
              this.message = "Correct, my man!"; 
              this.hideNum = !this.hideNum;
              this.$store.state.correctAnswers++;
              this.inputDisabled = true;
              this.numberOfTries--;
              this.lowNumber = 1
              this.highNumber = this.$store.state.number
              clearInterval(this.timerInterval)
              this.numberInterval = setInterval(() => {
                this.message = ''
                this.hideNum = false
                this.$store.commit('newRandomNumber')
                this.guessedNumber = '';
                this.inputDisabled = true
                this.timer = 3
                this.startShow = true
                this.botGuessNumber = ''
                if(this.numberOfTries == 0) {
                    this.message = "Tries up, my man!"
                    this.startShow = true
                    this.$refs.timeLeft.value = ''
                    this.timerShow = false
                    this.showHighScore = true
                } else {
                    this.startCountdown()
                }
                clearInterval(this.numberInterval)
              }, 2000);
          } else if (this.$store.state.randomNumber > this.guessedNumber) {
              this.lowNumber = this.guessedNumber+1
              console.log("guessed is lower")
              this.message = "The number is higher, human!";
              this.botGuessing()
          } else if (this.$store.state.randomNumber < this.guessedNumber) {
              console.log("guessed is higher")
              this.highNumber = this.guessedNumber-1
              this.message = "The number is lower, human!";
              this.botGuessing()
          } 
          console.log("After user low: " + this.lowNumber)
          console.log("After user high: " + this.highNumber)
        },
        timerFunction() {
            this.timerInterval = setInterval(() => {
                this.timer--
                if(this.timer == 0) {
                    clearInterval(this.timerInterval)
                    this.inputDisabled = true
                    this.timer = 3
                    this.numberOfTries--
                    if (this.numberOfTries == 0) {
                        this.message = "Tries up, my man!"
                        this.startShow = true
                        this.timerShow = false
                    } else {
                        this.startCountdown()
                    }
                }
              }, 1000);
          },
          chooseRandom: function () {
              let randomUpper = this.highNumber - this.lowNumber + 1
              console.log("upper bound for random is " + randomUpper)
              return Math.floor(Math.random() * randomUpper) + this.lowNumber;
          }
      },
      mounted() {
        if(this.$store.state.levelChosen == true) {
            console.log("whuu " + this.$store.state.number)
            this.$store.commit('levelNumber');
            this.$store.commit('newRandomNumber')
            this.startCountdown()
            if(this.$store.state.hard == true) {
                this.highNumber = 50
            }
        } else {
            window.location.href = '/'
        }
      }
    }
</script>

<style scoped>
* {
    font-family: Verdana, Geneva, Tahoma, sans-serif;
}
h3 {
    padding: 20px 0 5px;
    color: #351304;
}
p{
    color: midnightblue;
}
.timer {
    padding: 20px;
    background-color: #351304;
    color:cornsilk;
    text-align: center;
    font-size: 30px;
}
#player-bot-div {
    width: 100%;
    height: 100px;
    justify-content: center;
}
#player-bot-img {
    width: 30%;
    height: auto;
    position: relative;
}
.start-btn {
  background: #351304;
  font-weight: bold;
  color: cornsilk;
  margin-bottom: 20px;
}
.search{
    background-color: cornsilk;
	width: 150px;
	height: 17px;
	-webkit-transition: .3s ease-in-out;
	transition: .3s ease-in-out;
    z-index: 10;
    border-radius: 50px;
    padding: 10px;
    margin: 10px;
}
.search:hover {
	box-shadow: 0px 0px 150px grey;
    z-index: 2;
    -webkit-transition: all 200ms ease-in;
    -webkit-transform: scale(1.5);
    -ms-transition: all 200ms ease-in;
    -ms-transform: scale(1.5);
    -moz-transition: all 200ms ease-in;
    -moz-transform: scale(1.5);
    transition: all 200ms ease-in;
    transform: scale(1.8);
}
.btn{
    margin-top: 10px;
    color: cornsilk;
    background-color: #351304;
}
.btn:focus {
    outline:0;
}
.wins-correct-message {
    padding: 20px;
    background-color: #351304;
    color:cornsilk;
    text-align: center;
    font-size: 25px;
}
.wins-correct-message span {
    background-color: #351304;
    color:cornsilk;
    text-align: center;
    font-size: 25px;
}
@media only screen and (max-width: 600px) {
    #player-bot-img {
        width: 100%;
        border-bottom: 2px solid white;
    }
    .start-btn {
        width: 90%;
        height: 350px;
        margin-top: 10px;
        font-size: 60px;
        margin-bottom: 10px;
    }
    .winner-loser-message {
        padding: 20px;
        background-color: #351304;
        color:cornsilk;
        text-align: center;
        font-size: 20px;
        }
    .winner-loser-message span {
        background-color: #351304;
        color:cornsilk;
        text-align: center;
        font-size: 20px;
    }
    .search {
        width: 80px;
        height: 80px;
        border-radius: 4px;
        font-size: 35px;
        text-align: center;
        margin: 10px;
    }
    .search:hover {
        transform: scale(1.2);
    }
    #time-left-timer {
        height: 60px;
    }
    .btn {
        width: 210px;
        height: 70px;
        font-size: 25px;
        margin: 5px;
    }
.button{
 background-color:black;
 color:white;
 width: 30%;
 border: 3px solid purple;
 font-family:Cambria, Cochin, Georgia, Times, 'Times New Roman', serif;
}
}
</style>