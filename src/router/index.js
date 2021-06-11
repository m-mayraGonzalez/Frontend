import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/about',
    name: 'about',
    component: () => import('../views/About.vue')
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/Login.vue')
  },
  {
    path: '/categorias',
    name: 'Categorias',
    component: () => import('../views/Categorias.vue')
  },
  {
    path: '/articulos',
    name: 'Articulos',
    component: () => import('../views/Articulos.vue')
  },
  {
    path: '/ingresos',
    name: 'Ingresos',
    component: () => import('../views/Ingresos.vue')
  },
  {
    path: '/proveedores',
    name: 'Proveedores',
    component: () => import('../views/Proveedores.vue')
  },
  {
    path: '/ventas',
    name: 'Ventas',
    component: () => import('../views/Ventas.vue')
  },
  {
    path: '/clientes',
    name: 'Clientes',
    component: () => import('../views/Clientes.vue')
  },
  {
    path: '/usuario',
    name: 'Usuarios',
    component: () => import('../views/Usuarios.vue')
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to,from,next)=>{
  if(! store.state.token && to.path != '/login'){
    next({name:'Login'})
  }else{
    next()
  }
})

export default router