
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {path: '', name: 'home', component: () => import('pages/Home.vue')},
      // Users
      {path: '/register', name: 'Register', component: () => import('pages/user/Register')},

      // User sections
      {
        path: '/account/profile', name: 'Profile', component: () => import('pages/user/Profile'),
        meta: {authRequired: true}
      },
      {
        path: '/account/inventory', name: 'Inventory', component: () => import('../pages/user/Inventory'),
        meta: {authRequired: true}
      },
      // {
      //   path: '/account/wishlist', name: 'Wishlist', component: () => import('../pages/user/Wishlist'),
      //   meta: {authRequired: true}
      // },


      // items
      {path: '/:productName', name: 'ProductPage', component: () => import('../pages/ProductPage'), props: true},
      {path: '/cart', name: 'Cart', component: () => import('../pages/user/Cart')},

      {path: '/checkout', name: 'Checkout', component: () => import('../pages/Checkout')},
      {path: '/thank-you', name: 'ThankYou', component: () => import('../pages/ThankYou')},

      // management
      {
        path: '/admin', name: 'Admin', component: () => import('../pages/admin/Admin'),
        meta: {authRequired: true, adminRequired: true}
      },
      {
        path: '/admin/stock', name: 'Stock', component: () => import('../pages/admin/Stock'),
        meta: {authRequired: true, adminRequired: true}
      },
      {
        path: '/admin/orders', name: 'Orders', component: () => import('../pages/admin/Orders'),
        meta: {authRequired: true, adminRequired: true}
      },
      {
        path: '/admin/users', name: 'Users', component: () => import('../pages/admin/Users'),
        meta: {authRequired: true, adminRequired: true}
      },
      {
        path: '/item/new',
        name: 'Item',
        component: () => import(/* webpackChunkName: "about" */ '../pages/admin/Item.vue'),
        meta: {authRequired: true, adminRequired: true}
      },
      {
        path: '/item/:itemId',
        name: 'Item',
        component: () => import(/* webpackChunkName: "about" */ '../pages/admin/Item.vue'),
        meta: {authRequired: true, adminRequired: true}
      },

      {path: '/tests', name: 'Tests', component: () => import('../pages/Tests')},
    ]
  },

  {path: '/404', name: '404', component: () => import('pages/Error404.vue')},
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes
