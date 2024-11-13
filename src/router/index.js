import { createRouter, createWebHistory } from 'vue-router'
import LoginForm from '../components/LoginForm.vue'
import DashBoardWithSideBar from '@/views/DashBoardWithSideBar.vue'

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: LoginForm
  },
  {
    path: '/dash',
    name: 'DashBoardWithSideBar',
    component: DashBoardWithSideBar
  }
]
const router = createRouter({
  history: createWebHistory(),
  routes
})
export default router
