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
  { path: '/dashboard', name: 'dashboard', component: Dashboard },
  { path: '/profile', name: 'profile', component: Profile },
  { path: '/classroom/:classroomId', name: 'classroom', component: Classroom },
  { path: '/courses/:courseId', name: 'course', component: Course },
  { path: '/courses/:courseId/overview', name: 'course-overview', component: CourseOverview },
  { path: '/courses/:courseId/chapters/:chapterId', name: 'chapter', component: Chapter },
  { path: '/courses/:courseId/chapters/:chapterId/exercises', name: 'chapter-exercises', component: ChapterExercises },
  { path: '/courses/:courseId/chapters/:chapterId/exercises/:exerciseId', name: 'exercise', component: Exercise },
  { path: '/courses/:courseId/student/:userId', name: 'student-profile', component: StudentProfileView},
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
