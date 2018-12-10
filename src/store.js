import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);


export default new Vuex.Store({
  state: {
    count: 0,
    number: 6
  },
  mutations: {
    increment(state) {
      if (state.count < 100) {
        state.count += 1;
      }
    },
    decrement(state) {
      if (state.count > 0) {
        state.count += -1;
      }
    }
  },
  actions: {

  }
});
