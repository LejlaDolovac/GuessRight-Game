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
    correctNumber: ''
  },
  mutations: {
  /*  newRandomNumber(state) {
      state.number = Math.floor(Math.random() * (10 - 1 + 1)) + 1;
    }, */
    showRules(state) {
      state.show = !state.show
    },
    levelNumber(state) {
      if (state.easy == true) {
        state.number = Math.floor(Math.random() * (10 - 1 + 1)) + 1;
      }
      else if (state.medium == true) {
        state.number = Math.floor(Math.random() * (30 - 1 + 1)) + 1;
      }
      else if (state.hard == true) {
        state.number = Math.floor(Math.random() * (50 - 1 + 1)) + 1;
      }
      console.log("Correct number: " + state.number)
    }
  },
  actions: {

  }
});
