<template>
<div class="brain container">
    <div class="players columns">
      <div class="column"></div> <!-- för att få luft på sidorna -->
      <div class="player column is-two-fifths">
        <img class="is-square" src="https://img.icons8.com/color/1600/circled-user-male-skin-type-1-2.png">
        <h2>Player</h2>
        <input v-if="!startShow" class="search" type="number" v-model="guessedNumber" @keyup.enter="guessNumber" :disabled="inputDisabled">
      </div>
      <div id="desktopDivider"></div> <!-- för att få luft på sidorna -->
      <div class="bot column is-two-fifths">
        <img class="is-square" v-bind:src="this.$store.state.botImg">
        <h2>{{ this.$store.state.botName }}</h2>
      </div>
      <div class="column"></div> <!-- för att få luft på sidorna -->
    </div>
    <div class="game-div">
        <div class="message-body timer" v-show="botHasGuessed"> {{ this.$store.state.botName }}'s Guess: {{ botGuessNumber }}</div>
    <!--<button class="start-btn button is-medium" v-if="startShow" @click="timerFunction(); startShow = false; timerShow = true; inputDisabled = false; timer = 10;" v-show="startShow">START</button>-->
    <div v-if="timerShow" ref="timeLeft" class="message-body timer">{{ timer }}</div>
    <div v-else class="message-body timer">END</div>
    <p v-if="message != ''" class="message-body winner-loser-message"> {{ message }} </p>
    <router-link to="/highScore">
        <button class="button is-black" v-show="this.showHighScore">View highscore</button>
    </router-link>
    <!-- <p v-show="hideNum"> {{ this.$store.state.number }} </p>-->
    <!-- <button v-if="!startShow" class="button btn" @click="guessNumber" :disabled="inputDisabled">Press</button> -->
    </div>

    <!-- för att spelaren ska kunna se vilka siffror som är gissade på redan -->
    <div class="allGuessedNumbers container">
      <ul>
        <li v-for="number in allGuessedNumbers">
          {{ number }}
        </li>
      </ul>
    </div>


    <router-link to="/">
      <button class="button is-black is-pulled-left" style="width: 100%">&#8592;</button>
    </router-link>
    <!-- <p class="message-body wins-correct-message">Score: <span>{{ this.$store.state.correctAnswers }}</span> Bot wins: <span>{{ botWins }}</span> Tries left: <span>{{ numberOfTries }}</span> </p> -->
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
        lowNumber: 1,
        highNumber: '',
        allGuessedNumbers: [],
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
                    this.botGuessNumber = this.chooseRandom()
                    if (this.$store.state.randomNumber == this.botGuessNumber) {
                        this.message = "Bot Wins!!!"
                        this.$store.state.botWins++
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
                    clearInterval(this.timerBotInterval)
                    this.botHasGuessed = true
                    // låter spelaren se alla gissade nummber
                    this.allGuessedNumbers.push(this.botGuessNumber)
            },3000)
            if(this.$store.state.randomNumber == this.botGuessNumber) {
                this.lowNumber = 1
                this.highNumber = this.$store.state.number
                this.message = ''
            }
        },
        guessNumber: function () {
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
                // nollställer spelet, ger ny siffra
                this.$store.commit('newRandomNumber')
                // nollställer gissade siffror
                this.allGuessedNumbers = [];
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
              this.message = "The number is higher, human!";
              this.botGuessing()
          } else if (this.$store.state.randomNumber < this.guessedNumber) {
              this.highNumber = this.guessedNumber-1
              this.message = "The number is lower, human!";
              this.botGuessing()
          } 
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
              return Math.floor(Math.random() * randomUpper) + this.lowNumber;
          }
      },
      mounted() {
        if(this.$store.state.levelChosen == true) {
            this.$store.commit('levelNumber');
            this.$store.commit('newRandomNumber')
            this.startCountdown()
            if(this.$store.state.hard == true) {
                this.highNumber = 50
            } else if (this.$store.state.medium == true) {
                this.highNumber = 30
            } else if (this.$store.state.easy == true) {
                this.highNumber = 10
            }
        } else {
            window.location.href = '/'
        }
      }
    }
</script>

<style scoped>

.brain {
  margin-top: 30px;
}

.players img {
  width: 100%;
}

#desktopDivider {
  visibility: hidden;
}

.column {
  max-width: 400px;
}

.allGuessedNumbers {
  color: White;
  overflow: hidden;
}

.allGuessedNumbers ul {
  margin: auto;
  text-align: center;
}

.allGuessedNumbers li {
  list-style: none;
  width: 25px;
  display: inline-block;
}

.bot {
  visibility: hidden;
}

.message-body {
  border: none;
}

/* nytt ovanför */

* {
    font-family: Verdana, Geneva, Tahoma, sans-serif;
}
h3 {
    padding: 20px 0 5px;
    color: #351304;
}
p {
    color: midnightblue;
}
.timer {
    clear: left;
    padding: 20px;
    color: White;
    text-align: center;
    font-size: 2em;
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

/* större än mobil */

@media (min-width: 600px) {
  .bot {
    visibility: visible;
  }
  #desktopDivider {
    visibility: visible;
    width: 50px;
  }
}

/* större än tablet */

@media (min-width: 992px) {
  #desktopDivider {
    width: 100px;
  }
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
