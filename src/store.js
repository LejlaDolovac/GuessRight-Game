import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);


export default new Vuex.Store({
  state: {
    number: Math.floor(Math.random() * (10 - 1 + 1)) + 1,
    correctAnswers: 0
  },
  mutations: {
    newRandomNumber(state) {
      state.number = Math.floor(Math.random() * (10 - 1 + 1)) + 1;
      console.log(state.number);
      state.number = Math.floor(Math.random() * (10 - 1 + 1)) + 1
    }
  },
  actions: {

  }
});