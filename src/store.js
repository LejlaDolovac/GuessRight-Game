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
    botTimer: ''
  },
  mutations: {
    newRandomNumber(state) {
      state.randomNumber = Math.floor(Math.random() * (state.number - 1 + 1)) + 1;
      console.log("ran n " + state.number)
      console.log("ran r " + state.randomNumber)
    },
    showRules(state) {
      state.show = !state.show
    },
    levelNumber(state) {
      if (state.hard == true) {
        state.timer = 15;
        state.number = 50;
        state.randomNumbers = Math.floor(Math.random() * (50 - 1 + 1)) + 1;
        console.log("lev n " + state.number)
        console.log("lev r " + state.randomNumber)
      } else if (state.medium == true) {
        
        state.timer = 10;
        state.number = 30;
        state.randomNumbers = Math.floor(Math.random() * (30 - 1 + 1)) + 1;
        console.log("lev n " + state.number)
        console.log("lev r " + state.randomNumber)
      }
    }
  },
  actions: {

  }
});