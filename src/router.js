import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/gamepage',
      name: 'gamepage',
      component: () => import( './views/Gamepage.vue')

    },
    {
      path: '/highScore',
      name: 'highscore',
      component: () => import( './views/HighScore.vue'),
    },
    {
      path: '/rules',
      name: 'rules',
        component: () => import( './components/Rules.vue')
    },
    {
      path: '/levels',
      name: 'levels',
      component: () => import(/* webpackChunkName: "about" */ './components/Levels.vue')
    }
  ]
});
