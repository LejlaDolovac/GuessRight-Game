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
        state.timer = 100;
        state.number = 50;
        state.randomNumber = Math.floor(Math.random() * (10 - 1 + 1)) + 1;
      }
      if (state.hard == true) {
        state.timer = 100;
        state.number = 50;
        state.randomNumbers = Math.floor(Math.random() * (50 - 1 + 1)) + 1;
      } else if (state.medium == true) {
        state.timer = 10;
        state.number = 30;
        state.randomNumbers = Math.floor(Math.random() * (30 - 1 + 1)) + 1;
      }
      console.log("Correct number: " + state.number)
    }
  },
  actions: {

  }
});
