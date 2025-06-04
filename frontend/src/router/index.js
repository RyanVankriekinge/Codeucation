// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/HomeView.vue'
import Login from '../views/LoginView.vue'
import Register from '../views/RegisterView.vue'
import Dashboard from '../views/DashboardView.vue'
import Profile from '../views/ProfileView.vue'
import Classroom from '../views/ClassroomView.vue'
import Course from '../views/CourseView.vue'


const routes = [
  { path: '/', name: 'home', component: Home },
  { path: '/login', name: 'login', component: Login },
  { path: '/register', name: 'register', component: Register },
  { path: '/dashboard', name: 'dashboard', component: Dashboard },
  { path: '/profile', name: 'profile', component: Profile },
  { path: '/classroom', name: 'classroom', component: Classroom },
  { path: '/course', name: 'course', component: Course }


]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
