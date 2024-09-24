import Home from './pages/home.vue'
import Combined from './pages/combined.vue'
import Markers from './pages/Markers.vue'
import GeoJson from './pages/geo-json.vue'
import { createWebHistory, createRouter } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/combined',
    name: 'Combined',
    component: Combined,
  },
  {
    path: '/geo',
    name: 'GeoJson',
    component: GeoJson,
  },
  {
    path: '/markers',
    name: 'Markers',
    component: Markers,
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export { router }
