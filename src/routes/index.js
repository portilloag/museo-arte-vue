import { createRouter, createWebHistory } from "vue-router"
import HomeView from '@/views/HomeView.vue'
import DetallesView from '@/views/DetallesView.vue'
import FavoritesView from '@/views/FavoritesView.vue'
import ContactView from '@/views/ContactView.vue'
import NotFoundView from '@/views/NotFoundView.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      name:'home',
      component: () => import("@/views/HomeView.vue")
    },
    {
      path: '/detalle/:id',
      name: 'detalle',
      component: () => import("@/views/DetallesView.vue")
    },
    {
      path: "/museo",
      name: 'museo',
      component: () => import("@/views/MuseoView.vue")
    },
    {
      path: "/favorites",
      name: 'favorites',
      component: () => import("@/views/FavoritesView.vue")
    },
    {
      path: "/contact",
      name: 'contact',
      component: () => import("@/views/ContactView.vue")
    },
    {
      //https://router.vuejs.org/guide/essentials/dynamic-matching.html#Catch-all-404-Not-found-Route
      path: "/:pathMatch(.*)*",
      component: () => import("@/views/NotFoundView.vue")
    }
  ]
})
export default router
