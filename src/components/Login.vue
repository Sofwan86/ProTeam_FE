<template>
  <v-app id="inspire">
    <v-content>
      <v-parallax height="800" src="../assets/bg_login.png">
        <v-container class="fill-height" fluid>
          <v-row align="center" justify="center">
            <v-col cols="11" sm="5" md="5">
              <v-card class="elevation-12">
                <v-window v-model="step">
                  <v-window-item :value="1">
                    <v-row>
                      <v-col cols="12">
                        <v-card-text class="mt-19">
                          <v-container fluid>
                            <v-layout justify-center align-center>
                              <v-flex shrink>
                                <v-img
                                  width="150"
                                  src="../assets/logo_proteam.png"
                                ></v-img>
                              </v-flex>
                            </v-layout>
                          </v-container>
                          <v-divider></v-divider>
                          <h4 class="text-center mt-4">
                            Login to start your session
                          </h4>

                          <v-form v-model="valid" class="text-center mt-4">
                            <v-text-field
                              label="NPP"
                              name="NPP"
                              outlined
                              prepend-icon="people"
                              type="text"
                              color="indigo darken-4"
                              v-model="npp"
                            />

                            <v-text-field
                              label="Password"
                              name="password"
                              :rules="passwordRules"
                              prepend-icon="lock"
                              outlined
                              :type="show1 ? 'text' : 'password'"
                              color="indigo darken-4"
                              v-model="password"
                              :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                              @click:append="show1 = !show1"
                            />
                            <!-- <p>
                              Update your password ?<a href="/updatepassword"
                                >klik here</a
                              >
                            </p> -->
                            <!-- <v-checkbox
                              v-model="checkbox"
                              :label="`Remember Me`"
                            ></v-checkbox> -->

                            <v-btn
                              v-if="valid"
                              v-on:click="handleSubmit()"
                              class="submit"
                              rounded
                              :loading="loading"
                              @click="loader = 'loading'"
                              color="indigo darken-4"
                              dark
                              >Login</v-btn
                            >
                            <v-btn
                              v-else
                              v-on:click="handleSubmit()"
                              class="submit"
                              rounded
                              :loading="loading"
                              @click="loader = 'loading'"
                              color="indigo darken-4"
                              disabled
                              >Login</v-btn
                            >
                          </v-form>
                        </v-card-text>

                        <div class="mt-3"></div>
                        <!-- <p class="text-center">Don't have Account?<a href="/register">Signin</a> </p> -->
                      </v-col>
                    </v-row>
                  </v-window-item>
                </v-window>
              </v-card>
            </v-col>
          </v-row>
        </v-container>
      </v-parallax>
    </v-content>
  </v-app>
</template>

<script>
// import axios from "axios";
import { Axios } from "../views/Axios";
const apiService = new Axios();
export default {
  data: () => ({
    valid: false,
    show1: false,
    step: 1,
    npp: "",
    password: "",
    passwordRules: [
      (v) => !!v || "Password is required",
      (v) => (v && v.length >= 8) || "Password must have 8+ characters",
      (v) => /(?=.*[A-Z])/.test(v) || "Must have one uppercase character",
      (v) => /(?=.*\d)/.test(v) || "Must have one number",
      (v) => /([!@$%])/.test(v) || "Must have one special character [!@#$%]",
    ],
    // checkbox: nul,
  }),
  methods: {
    async handleSubmit() {
      const data = {
        npp: this.npp,
        password: this.password,
      };
      const response = await apiService
        .login(data)
        .then((succ) => succ)
        .catch((err) => err);
      if (response.status === 200) {
        // this.$session.start();
        // this.$session.set("loginStat", true);
        // this.$session.set("token", response.token);
        localStorage.TOKEN = response.data.token;
        localStorage.setItem("name,", response.data.fullName);
        localStorage.setItem("role", response.data.roleName);
        localStorage.setItem("npp", response.data.npp);
        response.data.status === 1
          ? this.$router.push("/dashboard")
          : alert("akun tidak active");
      } else {
        alert("Gagal masuk, akun tidak cocok / tidak aktif");
      }
    },
  },
  props: {
    source: String,
  },
};
// const response = await axios.post(
//     "https://kelompok4-api-gateway.azurewebsites.net/api/auth/login",
//     {
//       "username": this.username,
//       "password": this.password,
//     })
//     .then(response => {
//       localStorage.TOKEN = response.data.token;
//       localStorage.setItem('name',this.username);
//       // localStorage.setItem('name',response.data.role);
//       this.$router.push('/dashboard')
//       // console.log(localStorage.TOKEN);
//     })
//     response
</script>