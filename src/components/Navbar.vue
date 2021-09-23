<template>
  <div>
    <nav>
      <v-app-bar color="#FFF" app>
        <v-app-bar-nav-icon
          absolute
          left
          class="hidden-md-and-up"
          @click.stop="drawer = !drawer"
        ></v-app-bar-nav-icon>
        <v-spacer></v-spacer>
        <div class="mx-1300">
          <v-list-item class="mx-100">
            <v-list-item-content class="text-right px-1 mx-1">
              <v-list-item-title> {{ nama }} </v-list-item-title>
              <v-list-item-subtitle> {{ role }} </v-list-item-subtitle>
            </v-list-item-content>
            <v-avatar id="ava" color="black">
              <v-icon dark> mdi-account-circle </v-icon>
            </v-avatar>
            <v-menu offset-y :close-on-content-click="false">
              <template v-slot:activator="{ on, attrs }">
                <v-btn v-ripple="false" icon v-bind="attrs" v-on="on">
                  <v-icon>mdi-chevron-down</v-icon>
                </v-btn>
              </template>
              <v-list max-width="250">
                <v-list-item>
                  <v-list-item-title
                    ><v-expansion-panels>
                      <v-expansion-panel>
                        <v-expansion-panel-header>
                          Change Password
                        </v-expansion-panel-header>
                        <v-expansion-panel-content class="text-center">
                          <v-form v-model="valid">
                            <v-text-field
                              outlined
                              label="Current Password"
                              v-model="currentPassword"
                              :type="show1 ? 'text' : 'password'"
                              dense
                              :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                              @click:append="show1 = !show1"
                              color="indigo darken-4"
                            />
                            <v-text-field
                              outlined
                              label="New Password"
                              v-model="newPassword"
                              :rules="passwordRules"
                              counter
                              dense
                              :type="show2 ? 'text' : 'password'"
                              :append-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'"
                              @click:append="show2 = !show2"
                              color="indigo darken-4"
                            />
                            <v-btn
                              v-if="valid"
                              class="text-center white--text"
                              color="green"
                              rounded
                              @click="save()"
                              >Change</v-btn
                            >
                          </v-form>
                        </v-expansion-panel-content>
                      </v-expansion-panel>
                    </v-expansion-panels>
                  </v-list-item-title>
                </v-list-item>
                <v-list-item>
                  <v-list-item-title class="text-center">
                    <v-btn
                      rounded
                      color="red"
                      class="white--text"
                      @click="logout()"
                    >
                      Logout</v-btn
                    >
                  </v-list-item-title>
                </v-list-item>
              </v-list>
            </v-menu>
          </v-list-item>
        </div>
      </v-app-bar>

      <v-navigation-drawer
        app
        color="#004483"
        v-model="drawer"
        class="hidden-xs-only"
        :permanent="$vuetify.breakpoint.mdAndUp"
      >
        <v-list-item href="/dashboard">
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
              <v-list-item-title @click="profile()" class="white--text"
                >Profile</v-list-item-title
              >
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
              <v-list-item-title @click="master()" class="white--text"
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
    <v-dialog v-model="popChangePass" width="500">
      <v-card color="#004483" height="50">
        <v-row align-sm="2" md="3">
          <h3 sm="30">Change Password</h3>
          <v-spacer></v-spacer>
          <v-icon>mdi-close</v-icon>
        </v-row>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { Axios } from "../views/Axios";
const apiService = new Axios();
export default {
  data() {
    return {
      currentPassword: "",
      newPassword: "",
      show1: false,
      show2: false,
      popChangePass: false,
      valid: false,
      send: {},
      drawer: false,
      status: 1,
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
      passwordRules: [
        (v) => !!v || "Password is required",
        (v) => (v && v.length >= 8) || "Password must have 8+ characters",
        (v) => /(?=.*[A-Z])/.test(v) || "Must have one uppercase character",
        (v) => /(?=.*\d)/.test(v) || "Must have one number",
        (v) => /([!@$%])/.test(v) || "Must have one special character [!@#$%]",
      ],
      items: [
        { title: "Change Password", route: "/a" },
        { title: "Logout", route: "/a" },
      ],
      items1: [
        {
          title: "Dashboard",
          icon: "mdi-view-dashboard-outline",
          route: "/dashboard",
        },
      ],
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
          title: "Man Month",
          icon: "mdi-table-account",
          route: "/manmonth",
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
      role: localStorage.getItem("role"),
    };
  },
  created() {
    this.getData();
  },
  methods: {
    profile() {
      this.$router.push("/profile");
    },
    master() {
      this.$router.push("/masteradmin");
    },
    async getData() {
      const npp = localStorage.getItem("npp");
      const response = await apiService
        .getStatusUser(npp)
        .then((response) => {
          console.log(response.data.newuserdata.status);
          response.data.newuserdata.map((item) => {
            console.log(item.status);
            this.status = item.status;
          });
        })
        .catch((err) => err);
      response;
      console.log("dsfs" + response);
      if (this.status == 0) {
        this.logout();
      }
    },

    logout() {
      localStorage.removeItem("TOKEN");
      localStorage.removeItem("name,");
      localStorage.removeItem("npp");
      localStorage.removeItem("role");
      this.$router.push("/");
    },
    updatePass(Data, id) {
      const response = apiService
        .updatePass(Data, id)
        .then((succ) => {
          alert(succ);

          this.$router.go();
          succ;
        })
        .catch(() => alert("Gagal Update (Password salah)"));
      response;
    },
    save() {
      this.send.currentPassword = this.currentPassword;
      this.send.newPassword = this.newPassword;
      this.updatePass(this.send, localStorage.getItem("npp"));
    },
  },
};
</script>

<style lang="scss" scoped>
.v-btn::before {
  background-color: transparent;
}
</style>
