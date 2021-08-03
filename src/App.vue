<template>
  <v-app>
    <!-- <login/> -->
    <v-content>
      <router-view></router-view>
    </v-content>
  </v-app>
</template>

<script>
//  import Navbar from './components/Navbar.vue'
  // import Login from './components/Login.vue'
 

export default {
  name: 'App',

  components: {
    // Navbar,
    // Login
  },

  data: () => ({
    //
  }),
};
</script>
