const routes = [
  {
    path: '/',
    name: 'login',
    component: () => import('@/views/LoginPage.vue'),
    meta: {
      title: 'Login - Focus Timer',
    },
  },
  {
    path: '/app',
    name: 'home',
    component: () => import('@/views/HomePage.vue'),
    meta: {
      title: 'Dashboard - Focus Timer',
    },
  },
]

export default routes
