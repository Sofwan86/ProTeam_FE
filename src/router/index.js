import Vue from 'vue'
import VueRouter from 'vue-router'
// import Home from '../views/Home.vue'
import ProfileResource from '../views/resourceProfile.vue'
import KelompokDetail from '../views/KelompokDetail.vue'
// import Profile from '../views/Profile.vue'
import KelompokProfile from '../views/KelompokProfile.vue'
import UserManagement from '../views/UserManagement.vue'
import MandaysVendor from '../views/MandaysVendor.vue'
import Lookup from '../views/Lookup.vue'
import Hello from '../views/Hello.vue'
import CreateResource from '../views/createNewResource.vue'
import CreateMandays from '../views/createNewMandays.vue'
import EditResource from '../views/editResource.vue'
// import Login from '../views/login/Login.vue'
import Register from '../views/register/Register.vue'
import ForgotPassword from '../views/login/ForgotPassword.vue'
import RecoverPassword from '../views/login/RecoverPassword.vue'
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
    beforeEnter(to, from, next){
        if(localStorage.getItem('TOKEN')){
            next();
        }else{
          alert('Silahkan Login')
          to( this.$router.push("/login"))
         
          next(false);

        }
    },
    children: [
      {
        path: "/hello",
        name: "Hello",
        // meta : {title: 'Hello'},
        component: Hello,
      },
      {
        path: '/dashboard',
        name: 'dashboard',
        component: Dashboard
      },
      {
        path: '/createmandays',
        name: 'createmandays',
        component: CreateMandays
      },
      {
        path: '/profileresource',
        name: 'profileresource',
        component: ProfileResource
      },
      // {
      //   path: '/profile',
      //   name: 'profile',
      //   component: Profile
      // },
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
      {
        path: '/kelompokprofiledetail',
        name: 'kelompokprofiledetail',
        component: KelompokDetail
      },
      {
        path: '/editresource',
        name: 'editresource',
        component: EditResource
      },
      {
        path: '/createresource',
        name: 'createresource',
        component: CreateResource
      },
    ]
  },
  {
    path: '/hello',
    name: 'hello',
    component: Hello
  },
 
  // {
  //   path: '/home',
  //   name: 'home',
  //   component: Home
  // },
  {
    path: '/register',
    name: 'register',
    component: Register
  },
  {
    path: '/forgotpassword',
    name: 'forgotpassword',
    component: ForgotPassword
  },
  {
    path: '/recoverpassword',
    name: 'recoverpassword',
    component: RecoverPassword
  },

  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
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
