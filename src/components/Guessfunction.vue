<template>
<div class="brain container">
  <link href="https://fonts.googleapis.com/css?family=Black+Ops+One" rel="stylesheet">
  <div>
    <h1 class="gradient-font-big">guessroom</h1>
  </div>
    <div class="players columns">
      <div class="column no-mobile"></div> <!-- för att få luft på sidorna -->
      <div id="player" class="player column is-two-fifths" v-show="playersTurn">
        <img class="player is-rounded" :alt="`Your profile picture`" :src="this.avatar">
        <h2 class="gradient-heading">Player</h2>
        <!-- Players input field -->
        <input ref="guessInput" class="guessInput is-light" type="number" v-model.number="guessedNumber" @keyup.enter="guessNumber" :disabled="inputDisabled" value="Guess A Number"> <br>
        <span class="message-body wins-correct-message">Player Score: {{ this.$store.state.correctAnswers }}</span>
      </div>
      <div class="column flex">
        <div id="desktopDivider" class="no-mobile"></div> <!-- for space on the page -->
        <div class="flex">
            <div><h3 class="has-text-white">TIME LEFT:</h3></div>
            <div v-if="timerShow" ref="timeLeft" class="message-body timer">{{ timer }}</div>
            <div v-if="numberOfTries == 0" class="message-body timer">END</div>
            <div v-if="!timerShow && numberOfTries != 0" ref="timeLeft" class="message-body timer">{{ readyMessage }}</div>
            <h2 class="gradient-font-big" v-show="!mobile">vs.</h2>
            <p style="font-style: italic; font-size: .8em;" class="has-text-white"> Guess Numbers between 1 - {{ this.$store.state.number }}</p>
        </div>
      </div>
      <div class="bot column is-two-fifths">
        <div class="has-background-success speech-bubble"> {{ botMessage }} </div>
        <img class="is-square" :alt="`Your opponent ` + this.$store.state.botName" :src="this.$store.state.botImg">
        <h2 class="gradient-heading">{{ this.$store.state.botName }}</h2>
        <div class="message-body is-size-5 timer" v-show="botHasGuessed"> {{ this.$store.state.botName }}'s Guess: {{ botGuessNumber }}</div>
        <span class="message-body wins-correct-message">Bot Score: {{ this.$store.state.botWins }}</span>
      </div>
      <div class="column no-mobile"></div> <!-- for space on the page -->
    </div>
    <!-- so that the player can see what numbers have already been guessed -->
    <div class="allGuessedNumbers container gradient-game-div">
      <p v-if="message != ''" class="message-body high-low is-italic is-size-6 winner-loser-message"> {{ message }} </p>
      <br>
      <ul>
        <li v-for="number in allGuessedNumbers" :key="number">
          {{ number }}
        </li>
      </ul>
      <router-link to="/highScore">
        <div class="has-background-black border-controll" v-show="showHighScore">
          <a class="button is-fullwidth is-size-3 gradient-heading">View Highscore</a>
        </div>
      </router-link>
      <br>
      <span v-if="showHighScore != true" class="message-body wins-correct-message">Tries left: {{ numberOfTries }} </span>
    </div>

    <router-link to="/" tabindex="-1">
      <button class="button is-black is-pulled-left ">&#8592; BACK TO LOBBY</button>
    </router-link>
</div>
</template>

<script>
export default {
    name: 'Guessfunction',
    data() {
      return {
        // the number the player guesses
        guessedNumber: '',
        message: '',
        hideNum: false,
        numberInterval: '',
        timerInterval: '',
        countdownInterval: '',
        // shows how many seconds before the game starts and how long he/she has to guess
        timer: 3,
        readyMessage: '',
        readyTimer: 4,
        inputDisabled: true,
        // how many games before it goes to highscore
        numberOfTries: 10,
        timerShow: false,
        showHighScore: false,
        // how long it takes for the bot to guess
        timerBotInterval: '',
        levelNumber: '',
        // the number the bot guesses
        botGuessNumber: '',
        botHasGuessed: false,
        arrayOfNumbers: [],
        // the closest low number the bot or player guesses to the right answer
        lowNumber: 1,
        // the closest high number the bot or player guesses to the right answer
        highNumber: '',
        // a list of numbers the player and bot has guessed
        allGuessedNumbers: [],
        // checks if the bot has made his first guess
        botFirstGuess: false,
        newBotGuess: 0,
        // what the bot says
        botMessage: '',
        // one show one player in movile mode
        playersTurn: true,
        botsTurn: true,
        mobile: false,
        avatar: "https://img.icons8.com/color/1600/circled-user-male-skin-type-1-2.png",
        focusInterval: '',
      }
    },
    computed: {
        avatarImage: function () {
            return this.avatar
        }
    },
    methods: {
        startCountdown: function () {
            // check if screensize is mobile
            if (screen.width < 601) {
             this.botsTurn = false;
             this.mobile = true;
            }
            this.timerShow = false
            if(this.timer == 3) {
                this.readyMessage = 'Ready'
            }
            // how long before the game starts
            this.$store.state.countdownInterval = setInterval(() => {
                this.timer--
                if(this.timer == 2) {
                    this.readyMessage = 'Steady'
                } else if (this.timer == 1) {
                    this.readyMessage = 'GO!'
                    this.inputDisabled = false
                }
                if(this.timer == 0) {
                    clearInterval(this.$store.state.countdownInterval)
                    this.timer = this.$store.state.timer
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
        // creates what the bot guessed
        botGuessing: function () {
            if (this.mobile == true) {
              this.botsTurn = true;
              this.playersTurn = false;
            }
            // pauses the guess timer
            clearInterval(this.$store.state.timerInterval)
            this.inputDisabled = true
            this.$store.state.timerBotInterval = setInterval(() => {
                // if it's the terminator - hard
                if (this.$store.state.hard == true) {
                    if ((this.highNumber - 4) < this.$store.state.randomNumber || (this.lowNumber + 4) > this.$store.state.randomNumber) {
                        this.botGuessNumber = this.$store.state.randomNumber
                    } else {
                        this.botMessage = "Wrong!";
                        this.botGuessNumber = Math.floor(Math.random() * ((this.highNumber-4) - (this.lowNumber+4) + 1)) + (this.lowNumber+4);
                    }
                }
                // if it's R2-D2 - medium
                else if (this.$store.state.medium == true) {
                    this.botMessage = "[Concentrated bloop]";
                    this.botGuessNumber = this.chooseRandom()
                }
                // if it's wall-e - easy
                else if (this.$store.state.easy == true) {
                    if (this.botFirstGuess == true) {
                        this.botGuessNumber = this.chooseOneUpDown()
                    } else {
                        this.botGuessNumber = this.chooseRandom()
                        this.botFirstGuess = true;
                    }
                    this.botMessage = "Eeeva..?";
                }
                    // checks if the bot guesses right
                    if (this.$store.state.randomNumber == this.botGuessNumber) {
                        // changes what the bot says depandant on what bot it is
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
                        this.$store.state.numberInterval = setInterval(() => {
                            this.message = ''
                            this.hideNum = false
                            this.$store.commit('newRandomNumber')
                            this.botFirstGuess = false;
                            this.guessedNumber = '';
                            this.botHasGuessed = false
                            this.allGuessedNumbers = [];
                            this.inputDisabled = true
                            this.timer = 3
                            this.lowNumber = 1
                            this.highNumber = this.$store.state.number
                            this.botGuessNumber = ''
                            clearInterval(this.$store.state.numberInterval)
                        },2000)
                        clearInterval(this.$store.state.timerInterval)
                        // checks if the number of games is up
                        if(this.numberOfTries == 0) {
                            this.message = "Tries up, my man!"
                            this.$refs.timeLeft.value = ''
                            this.timerShow = false
                            setInterval(() => {
                              this.message = ''
                              this.showHighScore = true
                            }, 2000)
                        } else {
                            this.startCountdown()
                        }
                    // checks if the bot's guess is too low
                    } else if (this.$store.state.randomNumber > this.botGuessNumber) {
                        this.message = "The number is higher, " + this.$store.state.botName + "!";
                        this.lowNumber = this.botGuessNumber+1
                        this.inputDisabled = false
                        this.timerFunction()
                        this.guessedNumber = ''
                        this.focus()
                    // checks if the bot's guess is too high
                    } else if (this.$store.state.randomNumber < this.botGuessNumber) {
                        this.message = "The number is lower, " + this.$store.state.botName + "!";
                        this.highNumber = this.botGuessNumber-1
                        this.inputDisabled = false
                        this.timerFunction()
                        this.guessedNumber = ''
                        this.focus()
                    }
                    clearInterval(this.$store.state.timerBotInterval)
                    this.botHasGuessed = true
                    if (this.mobile == true) {
                      // show players again i mobile
                      this.playersTurn = true
                      this.botsTurn = false
                    }
                    // let's the player see all the numbers already guessed
                    this.allGuessedNumbers.push(this.botGuessNumber)
            },3000)
            // returns the numbers to the default state
            if(this.$store.state.randomNumber == this.botGuessNumber) {
                this.lowNumber = 1
                this.highNumber = this.$store.state.number
                this.message = ''
            }
        },
        guessNumber: function () {
            // checks if the player guesses outside of the guessing span
          if(this.guessedNumber < this.lowNumber || this.guessedNumber > this.highNumber) {
              this.message = "Number to high or to low, try again"
              return
              // checks if the player guesses right
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
              this.botFirstGuess = false;
              this.highNumber = this.$store.state.number
              // stops the guessing timer
              clearInterval(this.$store.state.timerInterval)
              this.$store.state.numberInterval = setInterval(() => {
                this.message = ''
                this.hideNum = false
                // gives new random number
                this.$store.commit('newRandomNumber')
                // erases the previously guessed numbers
                this.allGuessedNumbers = [];
                this.guessedNumber = '';
                this.inputDisabled = true
                this.timer = 3
                this.botGuessNumber = ''
                // checks if the number of games is up
                if(this.numberOfTries == 0) {
                    this.message = "Tries up, my man!"
                    this.$refs.timeLeft.value = ''
                    this.timerShow = false
                    setInterval(() => {
                      this.message = ''
                      this.showHighScore = true
                    }, 2000)
                } else {
                    this.startCountdown()
                }
                clearInterval(this.$store.state.numberInterval)
              }, 2000);
          // checks if the number the player guessed is lower than the right answer
          } else if (this.$store.state.randomNumber > this.guessedNumber) {
              this.lowNumber = this.guessedNumber+1
              this.message = "The number is higher, human!";
              this.botGuessing()
          // checks if the number the player guessed is higher than the right answer
          } else if (this.$store.state.randomNumber < this.guessedNumber) {
              this.highNumber = this.guessedNumber-1
              this.message = "The number is lower, human!";
              this.botGuessing()
          }
          // puts the guessed number into an array
          this.allGuessedNumbers.push(this.guessedNumber)
        },
        // how long the player has to guess
        timerFunction() {
            this.focus()
            this.$store.state.timerInterval = setInterval(() => {
                this.timer--
                // checks if times up
                if(this.timer == 0) {
                    clearInterval(this.$store.state.timerInterval)
                    this.inputDisabled = true
                    this.timer = 3
                    this.numberOfTries--
                    this.lowNumber = 1
                    this.highNumber = this.$store.state.number
                    this.botGuessNumber = ''
                    this.allGuessedNumbers = []
                    this.message = ''
                    this.botFirstGuess = false;
                    this.botHasGuessed = false
                    if (this.numberOfTries == 0) {
                        this.message = "Tries up, my man!"
                        this.timerShow = false
                        setInterval(() => {
                          this.message = ''
                          this.showHighScore = true
                        }, 2000)
                    } else {
                        this.startCountdown()
                    }
                }
              }, 1000);
          },
          // wall-e: boten gissar på EN siffra högre eller lägre än sin senaste gissning
          chooseOneUpDown: function() {

            // bot need to guess lower
              if (this.botGuessNumber > this.$store.state.randomNumber) {
                this.newBotGuess = this.botGuessNumber++;
                // if the guess is higher than the highest number guessed, go one number lower
                if (this.newBotGuess > this.highNumber) {
                  this.newBotGuess = this.highNumber--;
                }
                // if the number has already been guessed, go one number lower
                if (this.allGuessedNumbers.includes(this.newBotGuess)) {
                  this.newBotGuess--;
                }
              }
            // bot needs to guess higher
              else if (this.botGuessNumber < this.$store.state.randomNumber) {
                this.newBotGuess = this.botGuessNumber++;
                if (this.newBotGuess < this.lowNumber) {
                  this.newBotGuess = this.lowNumber++;
                }
                // checks if the bot's guess has already been guessed and changes it if that's the case
                if (this.allGuessedNumbers.includes(this.newBotGuess)) {
                  this.newBotGuess++;
                }
              }
            return this.newBotGuess;
          },
          // creates a random number between highest and lowest last guess
          chooseRandom: function () {
              let randomUpper = this.highNumber - this.lowNumber + 1
              return Math.floor(Math.random() * randomUpper) + this.lowNumber;
          },
          // focuses on the player input
          focus: function () {
              this.$store.state.focusInterval = setInterval(() => {
                clearInterval(this.$store.state.focusInterval)
                if(this.inputDisabled == false) {
                    this.$refs.guessInput.focus();
                }
              },200)
          }
      },
      mounted() {
        // stops every interval just in case
        clearInterval(this.$store.state.numberInterval)
        clearInterval(this.$store.state.timerInterval)
        clearInterval(this.$store.state.countdownInterval)
        clearInterval(this.$store.state.timerBotInterval)
        clearInterval(this.$store.state.focusInterval)
          console.log("WHY?!")
        // resets the players score each turn
        this.$store.state.correctAnswers = 0;
        this.$store.state.botWins = 0;
        if(this.$store.state.levelChosen == true) {
            this.$store.commit('levelNumber');
            this.$store.commit('newRandomNumber')
            this.startCountdown()
            // makes sure that the the player doesn't guess outside the guess span
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
            // changes player avatar image
            if(this.$store.state.imageNumber == 1) {
                this.avatar = "homer_mindre.jpg"
            } else if(this.$store.state.imageNumber == 2) {
                this.avatar = "kenny.jpg"
            } else if(this.$store.state.imageNumber == 3) {
                this.avatar = "kermit.jpg"
            } 
        } else {
            window.location.href = '/'
        }
      }
    }
</script>

<style scoped>
.gradient-heading {
  font-size: 2em;
  text-transform: uppercase;
  font-family: 'Black Ops One'; /*Impact, Haettenschweiler, 'Arial Narrow Bold', sans-serif*/
  background: -webkit-linear-gradient(#FF03A4,#F9F871);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
.gradient-font-big {
  font-size: 3.5em;
  text-transform: uppercase;
  font-family: 'Black Ops One'; /*Impact, Haettenschweiler, 'Arial Narrow Bold', sans-serif*/
  background: -webkit-linear-gradient(#FF03A4,#F9F871);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
.gradient-game-div {
  background-image: linear-gradient(to right, #FF03A4 , #FF407E , #FF755F, #FFA64C, #FFD150, #F9F871);
  padding: 2%;
  border-radius: 10px;
  width: 80%;
}
.flex {
  display: flex;
  flex-flow: column;
  width: 125px;
  max-width: 100%;
  justify-content: flex-end;
  /* padding-bottom: 40px; */
}

.border-controll {
  border-radius: 5px;
  opacity: 0.85;
  border: solid 2px yellow;
}
/* hide the empty columns in mobile mode */
.no-mobile {
  visibility: hidden;
}
.players img {
  width: 60%;
  height: 60%
}
.player {
    border-radius: 50%;
}
#desktopDivider {
  visibility: hidden;
}
.high-low {
  padding: 1%;
  margin: -10px;
}
.column {
  height: auto;
  margin: auto;
  text-align: center;
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
.message-body {
  border: none;
  color: white;
}
.bot-message {
  color: White;
  padding: 5px;
}
    .players img {
        width: 60%;
        height: 60%
    }
    #desktopDivider {
        visibility: hidden;
    }
    .high-low {
        padding: 1%;
        margin: -10px;
    }
    .column {
        height: auto;
        margin: auto;
        text-align: center;
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
    .message-body {
        border: none;
        color: white;
    }
    .bot-message {
        color: White;
        padding: 5px;
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
        padding: 10px;
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
    .guessInput {
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
    .guessInput:hover {
        box-shadow: 0px 0px 150px grey;
        z-index: 2;
        -webkit-transition: all 200ms ease-in;
        -webkit-transform: scale(1.5);
        -ms-transition: all 200ms ease-in;
        -ms-transform: scale(1.5);
        -mozd-transition: all 200ms ease-in;
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
    /* Balloon for bot message */
    .bot {
        position: relative;
    }
    .speech-bubble {
        position: absolute;
        padding: 10px;
        top: -80px;
        right: 0px;
        border-radius: 1em;
        max-width: 200px;
    }
    .speech-bubble:after {
        content: '';
        position: absolute;
        bottom: 0;
        left: 40%;
        width: 0;
        border: 20px solid transparent;
        border-top-color: #FF755F;
        border-bottom: 0;
        border-left: 0;
        margin-bottom: -20px;
    }
    @media only screen and (max-width: 1087px) {
        .container, .game-div {
            width: 100%;
        }
    }
    @media only screen and (max-width: 768px) {
        .is-medium {
            width: 100%;
            margin-top: 20px;
            background-color: #59057b;
        }
    }
    /* Mobile
    @media only screen and (max-width: 600px) {
    .container {
        padding: 1%;
    }
    .column {
        max-width: 300px;
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
        font-size: 15px;
    }
    .guessInput {
        width: 80px;
        height: 80px;
        border-radius: 4px;
        font-size: 35px;
        text-align: center;
        margin: 10px;
    }
    .guessInput:hover {
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
    } */
</style>