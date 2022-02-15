import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import views from '../views'

Vue.use(VueRouter)

const routes = [
  {
    path: '/home',
    name: 'Home',
    component: Home
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: views.Dashboard
  },
  {
    path: '/embeds',
    name: 'Embeds',
    component: views.Embeds
  },
  {
    path: '/clanes',
    name: 'Clanes',
    component: views.Clanes
  },
  {
    path: '/roles',
    name: 'Roles',
    component: views.Roles
  },
  {
    path: '/logs',
    name: 'Logs',
    component: views.Logs
  },
  {
    path: '/login/:userid',
    name: 'Login',
    component: Login
  },
  {
    path: '*',
    name: 'default',
    redirect: '/home'
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
