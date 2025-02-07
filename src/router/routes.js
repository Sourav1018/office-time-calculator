const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('@/views/HomePage.vue'),
    meta: {
      title: 'Home - Countdown Timer',
    },
  },
  {
    path:'/test',
    name: 'test',
    component: () => import('@/layouts/MainLayout.vue'),
  }
]

export default routes
