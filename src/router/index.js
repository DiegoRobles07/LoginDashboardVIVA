import { createRouter, createWebHistory } from 'vue-router'
import LoginForm from '../components/LoginForm.vue'
import DashBoardWithSideBar from '@/views/DashBoardWithSideBar.vue'
import TableAgentsSchedule from '@/views/TableAgentsSchedule.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    redirect: '/login' //cuando el path es /, osea vacio, se redirige automaticamente al componente de login
  },
  {
    path: '/login',
    name: 'Login',
    component: LoginForm //ruta para ir al componente de login desde la ruta de busqueda
  },
  {
    path: '/dashboard',
    name: 'DashBoardWithSideBar',
    component: DashBoardWithSideBar //ruta para mostrar el dashboard
  },
  {
    path: '/table',
    name: 'tableview',
    component: TableAgentsSchedule
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
