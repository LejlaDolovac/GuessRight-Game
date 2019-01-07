<template>
<div class="brain container">

  <router-link to="/" tabindex="-1">
    <button class="button is-black is-pulled-left" style="width: 100%">&#8592;</button>
  </router-link>

  <div>
    <h1 class="room">guessroom</h1>
  </div>
    <div class="players columns">
      <div class="column"></div> <!-- för att få luft på sidorna -->
      <div class="player column is-two-fifths">
        <img class="is-square" :alt="`Your profile picture`" src="https://img.icons8.com/color/1600/circled-user-male-skin-type-1-2.png">
        <h2 class="heading">Player</h2>
        <input v-if="!startShow" class="search" type="number" v-model.number="guessedNumber" @keyup.enter="guessNumber" :disabled="inputDisabled">
      </div>
      <div class="column flex">
        <div id="desktopDivider"></div> <!-- för att få luft på sidorna -->
        <div class="flex">
          <h2 class="room">vs.</h2>
        </div>
      </div>
      <div class="bot column is-two-fifths">
        <img class="is-square" v-bind:src="this.$store.state.botImg">
        <h2 class="heading">{{ this.$store.state.botName }}</h2>
        <div style="color: white">{{ botMessage }}</div>
      </div>
      <div class="column"></div> <!-- för att få luft på sidorna -->
    </div>
    <!-- <div id="column"><h1 class="room">VS</h1></div> -->
    <div class="game-div">
        <div class="message-body timer" v-show="botHasGuessed"> {{ this.$store.state.botName }}'s Guess: {{ botGuessNumber }}</div>
    <!--<button class="start-btn button is-medium" v-if="startShow" @click="timerFunction(); startShow = false; timerShow = true; inputDisabled = false; timer = 10;" v-show="startShow">START</button>-->
    <div><h3 style=" color: white;">TIME LEFT:</h3></div>
    <div v-if="timerShow" ref="timeLeft" class="message-body timer">{{ timer }}</div>
    <div v-if="numberOfTries == 0" class="message-body timer">END</div>
    <div v-if="!timerShow && numberOfTries != 0" ref="timeLeft" class="message-body timer">{{ readyMessage }}</div>
    <p v-if="message != ''" class="message-body winner-loser-message"> {{ message }} </p>
    <!-- <p v-show="hideNum"> {{ this.$store.state.number }} </p>-->
    <!-- <button v-if="!startShow" class="button btn" @click="guessNumber" :disabled="inputDisabled">Press</button> -->
    </div>

    <!-- för att spelaren ska kunna se vilka siffror som är gissade på redan -->
    <div class="allGuessedNumbers container game-div">
      <ul>
        <li v-for="number in allGuessedNumbers" :key="number">
          {{ number }}
        </li>
      </ul>
      <p class="message-body wins-correct-message">Player Wins: <span>{{ this.$store.state.correctAnswers }}</span> Bot Wins: <span>{{ this.$store.state.botWins }}</span> Tries left: <span>{{ numberOfTries }}</span> </p>
    </div>
</div>
</template>

<script>
export default {
    name: 'Guessfunction',
    data() {
      return {
        // siffran spelaren gissat på
        guessedNumber: '',
        message: '',
        hideNum: false,
        numberInterval: '',
        timerInterval: '',
        countdownInterval: '',
        // visar hur många sekunder innan spelet startar och hur lång tid spelaren har på sig att gissa
        timer: 3,
        readyMessage: '',
        readyTimer: 4,
        inputDisabled: true,
        startShow: true,
        // hur många gånger spelaren får gissa
        numberOfTries: 5,
        timerShow: false,
        showHighScore: false,
        // hur lång tid innan boten gissar
        timerBotInterval: '',
        levelNumber: '',
        // vilken siffra boten gissar på
        botGuessNumber: '',
        botHasGuessed: false,
        arrayOfNumbers: [],
        // det närmsta gissade numret som är under det rätta svaret
        lowNumber: 1,
        // det närmsta gissade numret som är över det rätta svaret
        highNumber: '',
        // en lista med alla nummer spelaren och boten har gissat på
        allGuessedNumbers: [],
        // kollar om boten har gjort sin första gissning på numret
        botFirstGuess: false,
        // snicksnack med boten
        botMessage: ''
      }
    },
    created() {
      this.$store.commit('levelNumber')
    },
    computed: {
    },
    methods: {
        startCountdown: function () {
            // console.log("timer: " + this.timer)
            this.timerShow = false
            if(this.timer == 3) {
                this.readyMessage = 'Ready'
            }
            // hur lång tid innan speler startar
            this.countdownInterval = setInterval(() => {
                this.timer--
                if(this.timer == 2) {
                    this.readyMessage = 'Steady'
                } else if (this.timer == 1) {
                    this.readyMessage = 'GO!'
                }
                if(this.timer == 0) {
                    clearInterval(this.countdownInterval)
                    this.startShow = false
                    this.timer = this.$store.state.timer
                    this.inputDisabled = false
                    this.timerShow = true
                    this.readyTimer = 0;
                    this.timerShow = true,
                    this.timerFunction()
                    if(this.$store.state.hard == true) {
                        this.botMessage = 'I need your clothes, your boots and your motorcycle.'
                    } else if (this.$store.state.medium == true) {
                        this.botMessage = '[Neutral bleep-bloop]'
                    } else if (this.$store.state.easy == true) {
                        this.botMessage = 'Wall-e.'
                    }
                }
            },1000)
        },
        // skapar botens gissning
        botGuessing: function () {
            // pausar gissningstimern
            clearInterval(this.timerInterval)
            this.inputDisabled = true
            this.timerBotInterval = setInterval(() => {
                // om det är terminator
                if (this.$store.state.hard == true) {
                    if ((this.highNumber - 5) < this.$store.state.randomNumber || (this.lowNumber + 5) > this.$store.state.randomNumber) {
                        this.botGuessNumber = this.$store.state.randomNumber
                    } else {
                        this.botMessage = "Wrong!";
                        this.botGuessNumber = Math.floor(Math.random() * ((this.highNumber-5) - (this.lowNumber+5) + 1)) + (this.lowNumber+5);
                    }
                }
                // om det är R2-D2
                else if (this.$store.state.medium == true) {
                    this.botMessage = "[Concentrated bloop]";
                    this.botGuessNumber = this.chooseRandom()
                }
                // om det är wall-e
                else if (this.$store.state.easy == true && this.botFirstGuess == true) {
                    this.botGuessNumber = this.chooseOneUpDown()
                    this.botMessage = "Eeeva..?";
                }
                else if (this.$store.state.easy == true) {
                    this.botGuessNumber = this.chooseRandom()
                    this.botFirstGuess = true;
                }
                    // kollar om botens gissning är rätt
                    if (this.$store.state.randomNumber == this.botGuessNumber) {
                        // ändrar vad boten säger utifrån vilken det är
                        if (this.$store.state.hard == true) {
                            this.botMessage = "Hasta la vista, baby.";
                        } else if (this.$store.state.medium == true) {
                            this.botMessage = "[Happy beep]";
                        } else if (this.$store.state.easy == true) {
                            this.botMessage = "Eeeva!";
                        }
                        this.message = "Bot Wins!!!"
                        this.$store.state.botWins++
                        this.numberOfTries--;
                        // pausar spelet medan boten gissar
                        this.numberInterval = setInterval(() => {
                            this.message = ''
                            this.hideNum = false
                            this.$store.commit('newRandomNumber')
                            this.botFirstGuess = false;
                            this.guessedNumber = '';
                            this.botHasGuessed = false
                            this.allGuessedNumbers = [];
                            this.inputDisabled = true
                            this.timer = 3
                            this.startShow = true
                            this.lowNumber = 1
                            this.highNumber = this.$store.state.number
                            this.botGuessNumber = ''
                            clearInterval(this.numberInterval)
                        },2000)
                        clearInterval(this.timerInterval)
                        // kollar om antalet spelomgångar är slut
                        if(this.numberOfTries == 0) {
                            this.message = "Tries up, my man!"
                            this.startShow = true
                            this.$refs.timeLeft.value = ''
                            this.timerShow = false
                            this.showHighScore = true
                        } else {
                            this.startCountdown()
                        }
                    // kollar om boten gissat lägre än rätt gissing
                    } else if (this.$store.state.randomNumber > this.botGuessNumber) {
                        this.message = "The number is higher, bot!";
                        this.lowNumber = this.botGuessNumber+1
                        this.inputDisabled = false
                        this.timerFunction()
                    // kollar om boten gissat högre än rätt gissing
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
            // ställer tillbaka högsta och lägsta siffran som spelet utgår ifrån
            if(this.$store.state.randomNumber == this.botGuessNumber) {
                this.lowNumber = 1
                this.highNumber = this.$store.state.number
                this.message = ''
            }
        },
        guessNumber: function () {
            // kollar om spelaren gissat för högt eller för lågt utifrån vad spelaren och boten gissat på tidigare
          if(this.guessedNumber < this.lowNumber || this.guessedNumber > this.highNumber) {
              this.message = "Number to high or to low, try again"
              return
              // kollar om spelaren gissat rätt
          } else if (this.$store.state.randomNumber == this.guessedNumber) {
              if (this.$store.state.hard == true) {
                this.botMessage = "I'll be back";
              } else if (this.$store.state.medium == true) {
                this.botMessage = "[Sad boop]";
              } else if (this.$store.state.easy == true) {
                this.botMessage = "[Sad] Eeeva?";
              }
              this.message = "Correct, my man!";
              this.botHasGuessed = false
              this.hideNum = !this.hideNum;
              this.$store.state.correctAnswers++;
              this.inputDisabled = true;
              this.numberOfTries--;
              this.lowNumber = 1
              this.highNumber = this.$store.state.number
              // stoppar gissningstimern
              clearInterval(this.timerInterval)
              this.numberInterval = setInterval(() => {
                this.message = ''
                this.hideNum = false
                // nollställer spelet, ger ny siffra
                this.$store.commit('newRandomNumber')
                this.botFirstGuess = false;
                // nollställer gissade siffror
                this.allGuessedNumbers = [];
                this.guessedNumber = '';
                this.inputDisabled = true
                this.timer = 3
                this.startShow = true
                this.botGuessNumber = ''
                // kollar om antalet spelomgångar är slut
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
          // kollar om det rätta svaren är högre än det spelaren gissat på
          } else if (this.$store.state.randomNumber > this.guessedNumber) {
              this.lowNumber = this.guessedNumber+1
              this.message = "The number is higher, human!";
              this.botGuessing()
          // kollar om det rätta svaren är lägre än det spelaren gissat på
          } else if (this.$store.state.randomNumber < this.guessedNumber) {
              this.highNumber = this.guessedNumber-1
              this.message = "The number is lower, human!";
              this.botGuessing()
          }
          // lägger in spelarens gissning i en array
          this.allGuessedNumbers.push(this.guessedNumber)
        },
        // hur lång tid spelaren har att gissa
        timerFunction() {
            this.timerInterval = setInterval(() => {
                this.timer--
                // kollar om tiden gått ut
                if(this.timer == 0) {
                    clearInterval(this.timerInterval)
                    this.inputDisabled = true
                    this.timer = 3
                    this.numberOfTries--
                    this.lowNumber = 1
                    this.highNumber = this.$store.state.number
                    this.botGuessNumber = ''
                    this.allGuessedNumbers = []
                    this.message = ''
                    this.botHasGuessed = false
                    if (this.numberOfTries == 0) {
                        this.message = "Tries up, my man!"
                        this.startShow = true
                        this.timerShow = false
                        setInterval(function() {
                            window.location.href = '/highScore'
                        }, 2000);
                    } else {
                        this.startCountdown()
                    }
                }
              }, 1000);
          },
          // wall-e: boten gissar på EN siffra högre eller lägre än sin senaste gissning
          chooseOneUpDown: function() {
            console.log(this.allGuessedNumbers)
              if (this.botGuessNumber > this.$store.state.randomNumber) {
                let newBotGuess = this.botGuessNumber - 1;
                if (this.allGuessedNumbers.includes(newBotGuess)) {
                  return newBotGuess - 1;
                }
                return newBotGuess;
              }
              else if (this.botGuessNumber < this.$store.state.randomNumber) {
                let newBotGuess = this.botGuessNumber + 1;
                if (this.allGuessedNumbers.includes(newBotGuess)) {
                  return newBotGuess + 1;
                }
                return newBotGuess;
              }
          },
          chooseRandom: function () {
              let randomUpper = this.highNumber - this.lowNumber + 1
              return Math.floor(Math.random() * randomUpper) + this.lowNumber;
          },
      },
      mounted() {
        if(this.$store.state.levelChosen == true) {
            this.$store.commit('levelNumber');
            this.$store.commit('newRandomNumber')
            this.startCountdown()
            // försäkrar att högsta "gissade" siffra utgår från svårighetsgraden spelaren valt
            if(this.$store.state.hard == true) {
                this.highNumber = 50
                this.botMessage = 'I need your clothes, your boots and your motorcycle.'
            } else if (this.$store.state.medium == true) {
                this.highNumber = 30
                this.botMessage = '[Neutral bleep-bloop]'
            } else if (this.$store.state.easy == true) {
                this.highNumber = 10
                this.botMessage = 'Wall-eeee...'
            }
        } else {
            window.location.href = '/'
        }
      }
    }
</script>

<style scoped>
.heading {
  font-size: 2em;
  text-transform: uppercase;
  font-family: Impact, Haettenschweiler, 'Arial Narrow Bold', sans-serif;
  background: -webkit-linear-gradient(#FF03A4,#F9F871);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
.room {
  font-size: 3.5em;
  text-transform: uppercase;
  font-family: Impact, Haettenschweiler, 'Arial Narrow Bold', sans-serif;
  background: -webkit-linear-gradient(#094A6F,#64C6BD);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
.game-div {
  background-image: linear-gradient(to right, #1548EF , #0071FF , #008AFF, #009AE7, #00A7B5, #00B07D);
}
.flex{
  display: flex;
  flex-flow: column;
  justify-content: flex-end;
}

.players img {
  width: 60%;
  height: 60%
}

#desktopDivider {
  visibility: hidden;
}

.column {
  max-width: 300px;
  height: auto;
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
  color: white;
}

.bot-message {
  color: White;
  padding: 5px;
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
.start-btn {
    background: #351304;
    font-weight: bold;
    color: cornsilk;
    margin-bottom: 20px;
}
.search {
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
.btn {
    margin-top: 10px;
    color: cornsilk;
    background-color: #351304;
}
.btn:focus {
    outline:0;
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

/* Mobilanpassning */
@media only screen and (max-width: 600px) {

.start-btn {
    width: 90%;
    height: 350px;
    margin-top: 10px;
    font-size: 60px;
    margin-bottom: 10px;
}

.bot {
visibility: visible;
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
.button {
   background-color:black;
   color:white;
   width: 30%;
   border: 3px solid purple;
   font-family:Cambria, Cochin, Georgia, Times, 'Times New Roman', serif;
  }
}
</style>
