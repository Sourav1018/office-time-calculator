const routes = [
  {
    path: '/',
    name: 'login',
    component: () => import('@/views/LoginPage.vue'),
    meta: {
      title: 'Login - Office Time Calculator',
    },
  },
  {
    path: '/app',
    name: 'home',
    component: () => import('@/views/HomePage.vue'),
    meta: {
      title: 'Office Time Calculator',
    },
  },
]

export default routes
