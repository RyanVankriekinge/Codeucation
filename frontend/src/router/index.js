// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/HomeView.vue';
import Login from '../views/LoginView.vue';
import Register from '../views/RegisterView.vue';
import Dashboard from '../views/DashboardView.vue';
import Profile from '../views/ProfileView.vue';
import Classroom from '../views/ClassroomView.vue';
import Course from '../views/CourseView.vue';
import CourseOverview from '../views/CourseOverviewView.vue';
import Chapter from '../views/ChapterView.vue';
import ChapterExercises from '../views/ChapterExercisesView.vue';
import Exercise from '../views/ExerciseView.vue';
import StudentProfileView from '../views/StudentProfileView.vue';

const routes = [
  { path: '/', name: 'home', component: Home },
  { path: '/login', name: 'login', component: Login },
  { path: '/register', name: 'register', component: Register },
  { path: '/dashboard', name: 'dashboard', component: Dashboard, meta: { requiresAuth: true } },
  { path: '/profile', name: 'profile', component: Profile, meta: { requiresAuth: true } },
  { path: '/classroom/:classroomId', name: 'classroom', component: Classroom, meta: { requiresAuth: true } },
  { path: '/courses/:courseId', name: 'course', component: Course, meta: { requiresAuth: true } },
  { path: '/courses/:courseId/overview', name: 'course-overview', component: CourseOverview, meta: { requiresAuth: true } },
  { path: '/courses/:courseId/chapters/:chapterId', name: 'chapter', component: Chapter, meta: { requiresAuth: true } },
  { path: '/courses/:courseId/chapters/:chapterId/exercises', name: 'chapter-exercises', component: ChapterExercises, meta: { requiresAuth: true } },
  { path: '/courses/:courseId/chapters/:chapterId/exercises/:exerciseId', name: 'exercise', component: Exercise, meta: { requiresAuth: true } },
  { path: '/courses/:courseId/student/:userId', name: 'student-profile', component: StudentProfileView, meta: { requiresAuth: true } },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach(async (to, from, next) => {
  if (to.meta.requiresAuth) {
    try {
      const response = await fetch('http://localhost:3000/api/users/check-login', {
        credentials: 'include',
      });
      const result = await response.json();
      if (result.success) {
        next();
      } else {
        next({ name: 'home' });
      }
    } catch (err) {
      next({ name: 'home' });
    }
  } else {
    next();
  }
});

export default router;
