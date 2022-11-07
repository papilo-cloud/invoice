import { createRouter, createWebHashHistory } from 'vue-router'
import Invoices from '../views/Invoices.vue';
import Details from '../components/DetailedInvoice.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: Invoices 
  },
  // {
  //     path: '/bookmarked',
  //     name: 'Bookmarked',
  //     // route level code-splitting
  //     // this generates a separate chunk (about.[hash].js) for this route
  //     // which is lazy-loaded when the route is visited.
  //     // component: () => import(/* webpackChunkName: "about" */ '../views/Bookmarked.vue'),
  //     // component: Bookmarked
  //   },
   {
    path: '/:id',  
    name: 'details',
    component: Details
   }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
