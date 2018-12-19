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
    radndomNumbers: '',
    timer: ''
    
  },
  mutations: {
    newRandomNumber(state) {
      state.number = Math.floor(Math.random() * (state.number - 1 + 1)) + 1;
    },
    showRules(state){
      state.show = !state.show
    },
    levelNumber(state) {  // säger att medium är endast upp till 30 nummer 
      if(state.medium == true){
        state.medium =  state.number = Math.floor(Math.random() * (30 - 1 + 1)) + 1;
        state.timer= 10;
        state.number= 30;
        console.log(state.number);
      }
    }
      
  },
  actions: {

  }
});