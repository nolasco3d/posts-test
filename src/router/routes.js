
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/IndexPage.vue') }
    ]
  },
  {
    path: '/post/',
    props: { goBack: true },
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: ':id', component: () => import('pages/Posts/PostPage.vue')},
      { path: 'new', component: () => import('pages/Posts/PostForm.vue') },
      { path: 'meus-posts', component: () => import('pages/Posts/UserPosts.vue') },
      { path: ':id/edit', component: () => import('pages/Posts/EditPost.vue') }
    ]
  },
  // {
  //   path: '/meus-posts/:id',
  //   component: () => import('layouts/MainLayout.vue'),
  //   children: [
  //     { path: '', component: () => import('pages/PostPage.vue') }
  //   ]
  // },
  {
    path: '/user',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/UserView.vue') },
      { path: 'form', component: () => import('pages/UserForm.vue') }
    ]
  },
  {
    path: '/login',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/LoginPage.vue') },
    ]
  },
  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes
