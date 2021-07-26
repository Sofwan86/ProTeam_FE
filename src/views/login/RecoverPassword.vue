<template>
  <v-app id="inspire">
    <v-content>
      <v-parallax height="800" src="../../assets/bg_login.png">
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
                                  src="../../assets/logo_proteam.png"
                                ></v-img>
                              </v-flex>
                            </v-layout>
                          </v-container>
                          <v-divider></v-divider>
                          <h4 class="text-center mt-4">
                            Recover password now
                          </h4>

                          <v-form class="text-center mt-4">
                            <v-text-field
                            outlined
                              label="New Password"
                              name="Password"
                              prepend-icon="lock"
                              type="text"
                              color="indigo darken-4"
                            />
                            <v-text-field
                            outlined
                              label="Retype Password"
                              name="Password"
                              prepend-icon="lock"
                              type="text"
                              color="indigo darken-4"
                            />
                          </v-form>
                        </v-card-text>
                        <div class="text-center">
                          <v-btn rounded color="indigo darken-4" dark
                            >Change Password</v-btn
                          >
                        </div>
                        <div class="mt-3"></div>
                       
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
export default {
  data: () => ({
    step: 1,
  }),
  props: {
    source: String,
  },
};
</script>