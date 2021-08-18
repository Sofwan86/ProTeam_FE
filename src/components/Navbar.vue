<template>
  <nav>
    <v-app-bar color="#FFF" app>
      <v-spacer></v-spacer>
      <v-spacer></v-spacer>
      <v-spacer></v-spacer>
      <v-spacer></v-spacer>
      <v-spacer></v-spacer>
      <v-spacer></v-spacer>
      <v-spacer></v-spacer>
      <v-spacer></v-spacer>
      <v-avatar id="ava" color="black">
        <v-icon dark> mdi-account-circle </v-icon>
      </v-avatar>
      <v-list-item-content class="px-2 mx-2">
        <v-list-item-title> {{ nama }} </v-list-item-title>
        <v-list-item-subtitle> {{ role }} </v-list-item-subtitle>
      </v-list-item-content>
      <v-icon @click="logout">mdi-logout</v-icon>
    </v-app-bar>

    <v-navigation-drawer app color="#004483" permanent>
      <v-list-item>
        <v-img
          max-height="150"
          max-width="190"
          class=".rounded-pill"
          src="../assets/proteam2.png"
        ></v-img>
      </v-list-item>

      <v-divider></v-divider>
      <v-list outlined dense nav>
        <v-list-item
          v-for="item in items1"
          :key="item.title"
          router
          :to="item.route"
        >
          <v-list-item-icon>
            <v-icon color="#FFF">{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content color="#FFF">
            <v-list-item-title class="white--text" color="#FFF">{{
              item.title
            }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-group
          color="#FFF"
          no-action
          :value="false"
          prepend-icon="mdi-account-circle"
        >
          <template v-slot:activator>
            <v-list-item-title class="white--text">Profile</v-list-item-title>
          </template>

          <v-list-item
            v-for="item in itemProfile"
            :key="item.title"
            router
            :to="item.route"
          >
            <v-list-item-title class="white--text">
              {{ item.title }}
            </v-list-item-title>

            <v-list-item-icon>
              <v-icon color="#FFF"> {{ item.icon }} </v-icon>
            </v-list-item-icon>
          </v-list-item>
        </v-list-group>
        <v-list-item
          v-for="item in items2"
          :key="item.title"
          router
          :to="item.route"
        >
          <v-list-item-icon>
            <v-icon color="#FFF">{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content color="#FFF">
            <v-list-item-title class="white--text" color="#FFF">{{
              item.title
            }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-group
          color="#FFF"
          no-action
          :value="false"
          prepend-icon="mdi-cog-outline"
        >
          <template v-slot:activator>
            <v-list-item-title class="white--text"
              >Master Admin</v-list-item-title
            >
          </template>

          <v-list-item
            v-for="item in itemMaster"
            :key="item.title"
            router
            :to="item.route"
          >
            <v-list-item-title class="white--text">{{
              item.title
            }}</v-list-item-title>

            <v-list-item-icon>
              <v-icon color="#FFF"> {{ item.icon }} </v-icon>
            </v-list-item-icon>
          </v-list-item>
        </v-list-group>
      </v-list>
    </v-navigation-drawer>
    <div class="pa-5">
      <router-view> </router-view>
    </div>
  </nav>
</template>

<script>
export default {
  data() {
    return {
      admins: [
        ["Management", "mdi-account-multiple-outline"],
        ["Settings", "mdi-cog-outline"],
      ],
      cruds: [
        ["Create", "mdi-plus-outline"],
        ["Read", "mdi-file-outline"],
        ["Update", "mdi-update"],
        ["Delete", "mdi-delete"],
      ],
      items1: [{ title: "Dashboard", icon: "mdi-buffer", route: "/dashboard" }],
      items2: [
        {
          title: "WLA",
          icon: "mdi-chart-line-variant",
          route: "/wla",
        },
        {
          title: "Planning",
          icon: "mdi-notebook-outline",
          route: "/planning",
        },
        {
          title: "Report",
          icon: "mdi-file-chart-outline",
          route: "/report",
        },
      ],
      itemProfile: [
        {
          title: "Resource",
          icon: "mdi-account-tie-outline",
          route: "/profileresource",
        },
        {
          title: "Kelompok",
          icon: "mdi-account-group-outline",
          route: "/kelompokprofile",
        },
      ],
      itemMaster: [
        {
          title: "User Management",
          icon: "mdi-account-cog-outline",
          route: "/usermanagement",
        },
        {
          title: "Mandays Vendor",
          icon: "mdi-account-supervisor-circle",
          route: "/mandaysvendor",
        },
        {
          title: "Lookup",
          icon: "mdi-account-search-outline",
          route: "/lookup",
        },
      ],
      right: null,
      nama: localStorage.getItem("name,"),
      // role: localStorage.getItem('role')
      role: "Project Manager",
    };
  },
  methods: {
    logout() {
      localStorage.removeItem("TOKEN");
      localStorage.removeItem("name,");
      this.$router.push("/");
    },
  },
};
</script>

<style lang="scss" scoped></style>
