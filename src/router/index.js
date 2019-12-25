import Vue from 'vue'
import Router from 'vue-router'
import routes from './router'
import store from '../store/index'
// import router from './router'


Vue.use(Router)


const router = new Router({
  mode: 'history',
  base: process.env.Base_url,
  routes: routes
})

router.beforeEach((to, from, next) => {
  store.dispatch('check_login_state')
  if (to.meta.auth === true) {
    if (store.state.isLogin == 1) {
      next()
    } else {
      router.push({
        path: '/login',
        query: {
          Rurl: decodeURI(to.fullPath)
        }
      })
    }
  } else {
    next()
  }
})

export default router;