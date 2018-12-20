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
<<<<<<< HEAD
    radndomNumbers: '',
    timer: ''
    
  },
  mutations: {
    newRandomNumber(state) {
      state.number = Math.floor(Math.random() * (state.number - 1 + 1)) + 1;
=======
    levelChosen: false,
    randomNumbers: '',
    timer: '',
  },
  mutations: {
    newRandomNumber(state) {
      state.randomNumber = Math.floor(Math.random() * (state.number - 1 + 1)) + 1;
>>>>>>> 770d6670e6b76648dd5676bb9a3a4ce030754e0b
    },
    showRules(state){
      state.show = !state.show
    },
<<<<<<< HEAD
    levelNumber(state) {  // säger att medium är endast upp till 30 nummer 
      if(state.medium == true){
        state.medium =  state.number = Math.floor(Math.random() * (30 - 1 + 1)) + 1;
        state.timer= 10;
        state.number= 30;
        console.log(state.number);
=======
    levelNumber(state) {
      if (state.hard == true) {
        state.timer = 15;
        state.number = 50;
        state.randomNumbers = Math.floor(Math.random() * (50 - 1 + 1)) + 1;
      } else if (state.medium == true) {
        state.timer = 10;
        state.number = 30;
        state.randomNumbers = Math.floor(Math.random() * (30 - 1 + 1)) + 1;
>>>>>>> 770d6670e6b76648dd5676bb9a3a4ce030754e0b
      }
    }
      
  },
  actions: {

  }
});