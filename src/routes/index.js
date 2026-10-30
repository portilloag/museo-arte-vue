import { createRouter, createWebHistory } from "vue-router"
const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      component: () => import("@/views/HomeView.vue")
    },
    {
      path: "/contact",
      component: () => import("@/views/ContactView.vue")
    },
    {
      path: "/personajes",
      component: () => import("@/views/PersonajesView.vue")
    },
    {
      path: "/detalle/:id",
      component: () => import("@/views/DetalleView.vue")
    },
    {
      //https://router.vuejs.org/guide/essentials/dynamic-matching.html#Catch-all-404-Not-found-Route
      path: "/:pathMatch(.*)*",
      component: () => import("@/views/NotFoundView.vue")
    }
  ]
})
export default router
