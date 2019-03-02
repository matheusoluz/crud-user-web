const routes = [
  {
    path: '/',
    redirect: '/usuarios'
  },
  {
    path: '/login',
    component: () => import('layouts/login'),
    children: [{
      path: '',
      component: () => import('pages/login/main.vue'),
      meta: {
        rule: 'isEveryone'
      }
    },
    {
      path: 'token',
      component: () => import('pages/login/token.vue'),
      meta: {
        rule: 'isEveryone'
      }
    },
    {
      path: 'logout',
      component: () => import('pages/login/logout.vue'),
      meta: {
        rule: 'isAuthenticated'
      }
    }
    ]
  },
  {
    path: '/usuarios',
    meta: { rule: 'isAuthenticated' },
    component: () => import('layouts/index.vue'),
    children: [{
      path: '/',
      meta: { rule: 'isAuthenticated' },
      component: () => import('pages/usuario/list.vue')
    }]
  }
]

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: () => import('pages/Error404.vue')
  })
}

export default routes
