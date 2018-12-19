import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);


export default new Vuex.Store({
  state: {
    number: '',
    correctAnswers: 0,
    show: false,
    easy: false,
    medium: false,
    hard: false,
    randomNumbers: '',
    timer: ''
  },
  mutations: {
    newRandomNumber(state) {
      state.randomNumber = Math.floor(Math.random() * (state.number - 1 + 1)) + 1;
      console.log(state.number)
      console.log(state.randomNumber)
    },
    showRules(state) {
      state.show = !state.show
    },
    levelNumber(state) {
      if (state.hard == true) {
        state.randomNumbers = Math.floor(Math.random() * (50 - 1 + 1)) + 1;
        state.timer = 15;
        state.number = 50;
        console.log(state.number)
        console.log(state.randomNumber)
      }
    }
  },
  actions: {

  }
});