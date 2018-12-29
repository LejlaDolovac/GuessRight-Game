<template>
<div class="brain container">
    <div class="players columns">
      <div class="column"></div> <!-- för att få luft på sidorna -->
      <div class="player column is-two-fifths">
        <img class="is-square" src="https://img.icons8.com/color/1600/circled-user-male-skin-type-1-2.png">
        <h2>Player</h2>
        <input v-if="!startShow" class="search" type="number" v-model="guessedNumber" @keyup.enter="guessNumber" :disabled="inputDisabled">
      </div>
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
        botWins: '',
        findNumberNumber: '',
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
                    var randomNum = Math.floor(Math.random() * (this.arrayOfNumbers.length - this.arrayOfNumbers[0] + 1)) + this.arrayOfNumbers[0];
                    this.findNumberNumber = randomNum
                    this.botGuessNumber = this.arrayOfNumbers.find(this.findNumber)
                    // console.log("bot: " + this.botGuessNumber + " - Find: " + this.arrayOfNumbers.findIndex(this.findNumber))

                    if (this.$store.state.randomNumber == this.botGuessNumber) {
                        this.message = "Bot Wins!!!"
                        this.botWins++
                    } else if (this.$store.state.randomNumber > this.botGuessNumber) {
                        this.message = "The number is higher, bot!";
                        for (let o = 0; o < randomNum; o++){
                            this.arrayOfNumbers.splice(0, 1)
                            // console.log("inside high bot" + this.arrayOfNumbers)
                        }
                        this.inputDisabled = false
                        this.timerFunction()
                    } else if (this.$store.state.randomNumber < this.botGuessNumber) {
                        this.message = "The number is lower, bot!";
                        for(let g = this.arrayOfNumbers.length; randomNum < this.arrayOfNumbers.length; g--) {
                            this.arrayOfNumbers.splice(g, 1)
                            // console.log("inside low bot" + this.arrayOfNumbers)
                        }
                        this.inputDisabled = false
                        this.timerFunction()
                    }
                    // console.log("after bot" + this.arrayOfNumbers)
                    clearInterval(this.timerBotInterval)
                    this.botHasGuessed = true
                    // låter spelaren se alla gissade nummber
                    this.allGuessedNumbers.push(this.botGuessNumber)
            },3000)
        },
        guessNumber: function () {
          // console.log("guess: " + this.guessedNumber)
          this.findNumberNumber = this.guessedNumber
          var indexNumber = this.arrayOfNumbers.findIndex(this.findNumber)
          if(this.arrayOfNumbers.findIndex(this.findNumber) < 0 || this.arrayOfNumbers.findIndex(this.findNumber) > this.arrayOfNumbers.length) {
              this.message = "Wrong input"
              return
          } else if (this.$store.state.randomNumber == this.guessedNumber) {
              this.message = "Correct, my man!";
              this.hideNum = !this.hideNum;
              this.$store.state.correctAnswers++;
              this.inputDisabled = true;
              this.numberOfTries--;
              clearInterval(this.timerInterval)
              this.numberInterval = setInterval(() => {
                this.hideNum = false
                // nollstället spelet, ger ny siffra
                this.$store.commit('newRandomNumber')
                this.allGuessedNumbers = [];
                this.guessedNumber = '';
                this.inputDisabled = true
                this.timer = 3
                this.startShow = true
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
              for(let o = 0; o <= indexNumber; o++){
                  this.arrayOfNumbers.splice(0, 1)
              }
              this.message = "The number is higher, human!";
          } else if (this.$store.state.randomNumber < this.guessedNumber) {
              for(let g = this.arrayOfNumbers.length; indexNumber < this.arrayOfNumbers.length; g--) {
                  this.arrayOfNumbers.splice(g, 1)
              }
              this.message = "The number is lower, human!";
          }
          // låter spelaren se alla gissade nummber
          this.allGuessedNumbers.push(this.guessedNumber)
          // console.log("guess array outside " + this.arrayOfNumbers)
          this.botGuessing()
        },
        timerFunction() {
            //this.message = ''
            this.timerInterval = setInterval(() => {
                this.timer--
                if(this.timer == 0) {
                    clearInterval(this.timerInterval)
                    //this.$store.commit('levelNumber')
                    //this.$store.commit('newRandomNumber')
                    this.inputDisabled = true
                    this.timer = 3
                    this.numberOfTries--
                    if (this.numberOfTries == 0) {
                        this.message = "Tries up, my man!"
                        this.startShow = true
                        // this.$refs.timeLeft.value = ''
                        this.timerShow = false
                    } else {
                        this.startCountdown()
                    }
                }
              }, 1000);
          },
          findNumber(number) {
              return number >= this.findNumberNumber;
          }
      },
      mounted() {
        if(this.$store.state.levelChosen == true) {
            this.$store.commit('levelNumber');
            this.$store.commit('newRandomNumber')
            this.startCountdown()
            for(var i = 1; i <= this.$store.state.number; i++){
            this.arrayOfNumbers.push(i)
            this.startNumberForArray++
            // console.log(this.arrayOfNumbers)
            }
        } else {
            window.location.href = '/'
        }
      }
    }
</script>

<style scoped>

.players img {
  width: 100%;
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
    /*font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;*/
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

/* större mobil */

@media (min-width: 600px) {
  .bot {
    visibility: visible;
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
