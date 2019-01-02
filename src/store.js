import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);


export default new Vuex.Store({
  state: {
    number: '',
    correctAnswers: 0,
    showRules: false,
    showLevels: false,
    show: false,
    easy: false,
    medium: false,
    hard: false,
    levelChosen: false,
    randomNumbers: '',
    timer: '',
    currentUser: null,
    loggedIn: false,
    botWins: 0
  },
  mutations: {
    newRandomNumber(state) {
      state.randomNumber = Math.floor(Math.random() * (state.number - 1 + 1)) + 1;
    },
    showRules(state) {
      state.show = !state.show
    },
    levelNumber(state) {
      if (state.easy == true) {
        state.timer = 10;
        state.number = Math.floor(Math.random() * (10 - 1 + 1)) + 1;
        state.botName = 'Wall-E';
        state.botImg = 'http://gb.images.s3.amazonaws.com/wp-content/uploads/2012/01/WALLE.png';
      } else if (state.medium == true) {
        state.timer = 15;
        state.number = Math.floor(Math.random() * (30 - 1 + 1)) + 1;
        state.botName = 'R2-D2'; // fixa snyggare bilder, gärna png
        state.botImg = 'http://icons.iconarchive.com/icons/artua/star-wars/256/R2D2-icon.png';
      } else if (state.hard == true) {
        state.timer = 100;
        state.number = 50;
        state.randomNumbers = Math.floor(Math.random() * (50 - 1 + 1)) + 1;
        state.botName = 'Terminator';
        state.botImg = 'http://icons.iconarchive.com/icons/iconka/persons/128/terminator-icon.png';
      }
      // console.log("Correct number: " + state.number)
    }
  },
  actions: {

  }
});
