// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/HomeView.vue'
import Login from '../views/LoginView.vue'
import Register from '../views/RegisterView.vue'
import Dashboard from '../views/DashboardView.vue'
import Profile from '../views/ProfileView.vue'


const routes = [
  { path: '/', name: 'home', component: Home },
  { path: '/login', name: 'login', component: Login },
  { path: '/register', name: 'register', component: Register },
  { path: '/dashboard', name: 'dashboard', component: Dashboard },
  { path: '/profile', name: 'profile', component: Profile }


]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
