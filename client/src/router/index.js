import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    component: () => import('../page/HomePage.vue'),
    children: [
      {
        path: 'course',
        component: () => import('../page/course.vue'),
        // children: [{
        //     path: 'detail',
        //     component: () => import('../page/detail.vue')
        //   }
        // ]
      },
      {
        path: 'detail',
            component: () => import('../page/detail.vue')
      },
      {
        path: 'paper',
        component: () => import('../page/paper.vue'),
      },
      {
        path: 'component1',
        component: () => import('../page/component1.vue'),
      },
      {
        path: 'component2',
        component: () => import('../page/component2.vue'),
      },
    ]
  },
  {
    path: '/login',
    component: () => import('../page/login.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

export default router