import Vue from 'vue'
import VueRouter from 'vue-router'
import ProfileResource from '../views/resourceProfile.vue'
import Profile from '../views/Profile.vue'
import MasterAdmin from '../views/MasterAdmin.vue'
import KelompokProfile from '../views/UnitProfile.vue'
import UserManagement from '../views/UserManagement.vue'
import MandaysVendor from '../views/MandaysVendor.vue'
import Manmonth from '../views/ManMonth.vue'
import Lookup from '../views/Lookup.vue'
import Dashboard from '../views/dashboard/Dashboard.vue'
import Navbar from '../components/Navbar.vue'
import Login from '../components/Login.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'login',
    component: Login
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: "/navbar",
    component: Navbar,
    meta: { requiresAuth: true },
    beforeEnter(to, from, next) {
      if (localStorage.getItem('TOKEN')) {
        next();
      } else {
        alert('Silahkan Login')
        to(this.$router.push("/login"))

        next(false);

      }
    },
    children: [
      {
        path: '/dashboard',
        name: 'dashboard',
        component: Dashboard
      },
      {
        path: '/profile',
        name: 'profile',
        component: Profile
      },
      {
        path: '/masteradmin',
        name: 'masteradmin',
        component: MasterAdmin
      },
      {
        path: '/manmonth',
        name: 'manmonth',
        component: Manmonth
      },
      {
        path: '/profileresource',
        name: 'profileresource',
        component: ProfileResource
      },
      {
        path: '/kelompokprofile',
        name: 'kelompokprofile',
        component: KelompokProfile
      },
      {
        path: '/usermanagement',
        name: 'usermanagement',
        component: UserManagement
      },
      {
        path: '/mandaysvendor',
        name: 'mandaysvendor',
        component: MandaysVendor
      },
      {
        path: '/lookup',
        name: 'lookup',
        component: Lookup
      },
    ]
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})


export default router

// router.beforeEach((to, from, next) => {
//   if (to.matched.some(record => record.meta.requiresAuth)) {
//     if (!userses()) {
//       next('/login')
//       const answer = window.confirm('Terjadi kesalahan pada server, silahkan login ulang.')
//       if (answer) {
//         next('/login')
//       }
//     } else {
//       if (to.path === '/') {
//         next()
//       } else if (!roleUser(to.meta.requireRole) && to.path !== '/') {
//         next('/404')
//       } else {
//         next()
//       }
//     }
//   } else {
//     next()
//   }
// })
