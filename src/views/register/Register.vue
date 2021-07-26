<template>
  <v-app id="inspire">
    <v-content>
      <v-parallax height="900" src="../../assets/bg_login.png">
        <v-container class="fill-height" fluid>
          <v-row align="center" justify="center">
            <v-col cols="11" sm="6" md="6">
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
                            Register a new account
                          </h4>

                          <validation-observer
                            ref="observer"
                            v-slot="{ invalid }"
                          >
                            <form @submit.prevent="submit">
                              <v-container>
                                <v-row>
                                  <v-col cols="12" md="3">
                                    <validation-provider
                                      v-slot="{ errors }"
                                      name="First Name"
                                      rules="required|max:10"
                                    >
                                      <v-text-field
                                        outlined
                                        v-model="fname"
                                        :counter="10"
                                        :error-messages="errors"
                                        label="First Name"
                                        required
                                      ></v-text-field>
                                    </validation-provider>
                                  </v-col>
                                  <v-col cols="12" md="3">
                                    <validation-provider
                                      v-slot="{ errors }"
                                      name="Last Name"
                                      rules="required|max:10"
                                    >
                                      <v-text-field
                                        outlined
                                        v-model="lname"
                                        :counter="10"
                                        :error-messages="errors"
                                        label="Last Name"
                                        required
                                      ></v-text-field>
                                    </validation-provider>
                                  </v-col>
                                  <v-col cols="12" md="6">
                                    <validation-provider
                                      v-slot="{ errors }"
                                      name="Userame"
                                      rules="required|max:10"
                                    >
                                      <v-text-field
                                        outlined
                                        v-model="uname"
                                        :error-messages="errors"
                                        label="Username"
                                        required
                                      ></v-text-field>
                                    </validation-provider>
                                  </v-col>
                                  <v-col cols="12" md="6">
                                    <validation-provider
                                      v-slot="{ errors }"
                                      name="NPP"
                                      :rules="{
                                        required: true,
                                        digits: 7,
                                        regex:
                                          '^(71|72|74|76|81|82|84|85|86|87|88|89)\\d{5}$',
                                      }"
                                    >
                                      <v-text-field
                                        outlined
                                        v-model="NPP"
                                        :counter="7"
                                        :error-messages="errors"
                                        label="NPP"
                                        required
                                      ></v-text-field>
                                    </validation-provider>
                                  </v-col>
                                  <v-col cols="12" md="6">
                                    <validation-provider
                                      v-slot="{ errors }"
                                      name="email"
                                      rules="required|email"
                                    >
                                      <v-text-field
                                        outlined
                                        v-model="email"
                                        :error-messages="errors"
                                        label="E-mail"
                                        required
                                      ></v-text-field>
                                    </validation-provider>
                                  </v-col>
                                  <v-col cols="12" md="6">
                                    <validation-provider
                                      v-slot="{ errors }"
                                      name="unit"
                                      rules="required"
                                    >
                                      <v-select
                                        outlined
                                        v-model="unit"
                                        :items="unititems"
                                        :error-messages="errors"
                                        label="Unit"
                                        data-vv-name="unit"
                                        required
                                      ></v-select>
                                    </validation-provider>
                                  </v-col>
                                  <v-col cols="12" sm="6">
                                    <v-text-field
                                      outlined
                                      v-model="password"
                                      :append-icon="
                                        show1 ? 'mdi-eye' : 'mdi-eye-off'
                                      "
                                      :rules="[rules.required, rules.min]"
                                      :type="show1 ? 'text' : 'password'"
                                      name="input-10-1"
                                      label="Password"
                                      hint="At least 8 characters"
                                      counter
                                      @click:append="show1 = !show1"
                                    ></v-text-field>
                                  </v-col>
                                  <v-col cols="12" md="6">
                                    <validation-provider
                                      v-slot="{ errors }"
                                      name="role"
                                      rules="required"
                                    >
                                      <v-select
                                        outlined
                                        v-model="role"
                                        :items="roleitems"
                                        :error-messages="errors"
                                        label="Role"
                                        data-vv-name="role"
                                        required
                                      ></v-select>
                                    </validation-provider>
                                  </v-col>
                                  <v-col cols="12" sm="6">
                                    <v-text-field
                                      outlined
                                      v-model="repassword"
                                      :append-icon="
                                        show1 ? 'mdi-eye' : 'mdi-eye-off'
                                      "
                                      :rules="[
                                        rules.required,
                                        rules.min,
                                        passwordConfirmationRule,
                                      ]"
                                      :type="show1 ? 'text' : 'password'"
                                      name="input-10-1"
                                      label="Re-type Password"
                                      hint="At least 8 characters"
                                      counter
                                      @click:append="show1 = !show1"
                                    ></v-text-field>
                                  </v-col>

                                  <!-- <v-btn @click="clear"> clear </v-btn> -->
                                </v-row>
                                <validation-provider
                                  v-slot="{ errors }"
                                  rules="required"
                                  name="must agree"
                                >
                                  <v-checkbox
                                    v-model="checkbox"
                                    :error-messages="errors"
                                    value="1"
                                    label="I agree"
                                    type="checkbox"
                                    
                                  ></v-checkbox>
                                </validation-provider>
                                <div class="text-center">
                                  <v-btn
                                    class="mr-4"
                                    type="submit"
                                    :disabled="invalid"
                                    rounded
                                    color="indigo darken-4"
                                  >
                                    Sign Up
                                  </v-btn>
                                </div>
                              </v-container>
                            </form>
                          </validation-observer>
                        </v-card-text>
                        <!-- <div class="text-center">
                          <v-btn rounded color="indigo darken-4" dark
                            >Login</v-btn
                          >
                        </div> -->
                        <div class="mt-3"></div>
                        <p class="text-center">
                          Already have Account?<a href="/">Login</a>
                        </p>
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
import { required, digits, email, max, regex} from "vee-validate/dist/rules";
import {
  extend,
  ValidationObserver,
  ValidationProvider,
  setInteractionMode,
} from "vee-validate";

setInteractionMode("eager");

extend("digits", {
  ...digits,
  message: "{_field_} needs to be {length} digits. ({_value_})",
});

extend("required", {
  ...required,
  message: "{_field_} can not be empty",
});

extend("max", {
  ...max,
  message: "{_field_} may not be greater than {length} characters",
});

extend("regex", {
  ...regex,
  message: "{_field_} {_value_} does not match {regex}",
});

extend("email", {
  ...email,
  message: "Email must be valid",
});

export default {
  components: {
    ValidationProvider,
    ValidationObserver,
  },
  data: () => ({
    fname: "",
    lname: "",
    uname: "",
    NPP: "",
    email: "",
    unit: null,
    role: null,
    unititems: ["Unit 1", "Unit 2", "Unit 3"],
    roleitems: ["Role 1", "Role 2", "Role 3"],
    show1: false,
    password: "",
    repassword: "",
    rules: {
      required: (value) => !!value || "Required.",
      min: (v) => v.length >= 8 || "Min 8 characters",
      emailMatch: () => `The email and password you entered don't match`,
    },
    checkbox: null,
  }),

  methods: {
    submit() {
      this.$refs.observer.validate();
    },
    clear() {
      this.fname = "";
      this.lname = "";
      this.uname = "";
      this.NPP = "";
      this.email = "";
      this.unit = null;
      this.role = null;
      this.checkbox = null;
      this.$refs.observer.reset();
    },
  },
  computed: {
    passwordConfirmationRule() {
      return () => this.password === this.repassword || "Password must match";
    },
  },
};
</script>