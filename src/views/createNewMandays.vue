<template>
  <div>
    <v-breadcrumbs :items="items" divider="/"></v-breadcrumbs>

    <v-container>
      <v-row no-gutters>
        <v-col cols="12" sm="14" offset-sm="0.2">
          <v-card class="pa-2" offset-sm="3" outlined tile>
            <h1>Create New Data Mandays Vendor</h1>
            <v-row>
              <v-col cols="12" md="6">
                <h4>Nama Vendor</h4>
                <v-text-field
                  v-model="namadepan"
                  label="ex: PT. ABC"
                  :rules="nameRules"
                  outlined
                  dense
                  required
                ></v-text-field>
              </v-col>
              
              
              <v-col cols="12" md="6">
                <h4>Contact Number</h4>
                <v-text-field
                  v-model="npp"
                  label="ex: STI/123/123"
                  :rules="nppRules"
                  outlined
                  dense
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12" md="6">
                <h4>Total Mandays</h4>
                <v-text-field
                  v-model="email"
                  label="ex: 10000"
                  outlined
                  dense
                ></v-text-field>
              </v-col>
              <v-col
                ><h4>Start Contract Date</h4>
                <v-menu
                  v-model="menu2"
                  :close-on-content-click="false"
                  transition="scale-transition"
                  offset-y
                  max-width="290px"
                  min-width="auto"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field outlined
                      v-model="dateActive"
                      label=""
                      hint="MM/DD/YYYY format"
                      persistent-hint
                      prepend-icon="mdi-calendar"
                      readonly
                      v-bind="attrs"
                      v-on="on"
                    ></v-text-field>
                  </template>
                  <v-date-picker
                    v-model="date"
                    no-title
                    @input="menu2 = false"
                  ></v-date-picker>
                </v-menu>
              </v-col>
              <v-col cols="12" sm="3">
                <h4>Last Contract Date</h4>
                <v-menu
                  v-model="menu3"
                  :close-on-content-click="false"
                  transition="scale-transition"
                  offset-y
                  max-width="290px"
                  min-width="auto"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field outlined
                      v-model="dateLast"
                      label=""
                      hint="MM/DD/YYYY format"
                      persistent-hint
                      prepend-icon="mdi-calendar"
                      readonly
                      v-bind="attrs"
                      v-on="on"
                    ></v-text-field>
                  </template>
                  <v-date-picker
                    v-model="date2"
                    no-title
                    @input="menu3 = false"
                  ></v-date-picker>
                </v-menu>
              </v-col>
              <v-col cols="12" sm="6">
                <h4>Notes</h4>
                <v-textarea
                  outlined
                  name="input-7-4"
                  label="ex: Need information"
                ></v-textarea>
              </v-col>
              <v-col cols="12" sm="6">
                <h4>Status</h4>
                <v-combobox
                  v-model="Status"
                  :items="statuss"
                  label="Select Status"
                  outlined
                  dense
                ></v-combobox>
              </v-col>
            </v-row>
          </v-card>
        </v-col>
      </v-row>
      <div class="text-right">
        <v-btn class="mr-4" href="/profile"> Cancel </v-btn>
        <v-btn type="submit" color="primary" @click="createResource"
          >Create New Resource
        </v-btn>
        <v-snackbar v-model="snackbar" :multi-line="multiLine">
          {{ message }}

          <template v-slot:action="{ attrs }">
            <v-btn color="red" text v-bind="attrs" @click="snackbar = false">
              Close
            </v-btn>
          </template>
        </v-snackbar>
      </div>
    </v-container>
  </div>
</template>

<script>
export default {
  name: "createNewResource",
  data: (vm) => ({
    nama: "",
    npp: "",
    email: "",
    phone: "",
    kelompoks: ["OFA"],
    skills: ["React", "Vue", "Java", "Phyton"],
    tipes: ["FTE"],
    jenjabs: ["AMGR"],
    roles: ["FrontEnd Developer", "Backend Developer", "UI/UX"],
    statuss: ["Active", "Inactive"],
    items: [
      {
        text: "Master Admin",
        disabled: true,
        href: "breadcrumbs_dashboard",
      },
      {
        text: "Mandays Vendor",
        disabled: false,
        href: "/mandaysvendor",
      },
      {
        text: "Create New Mandays Vendor",
        disabled: true,
        href: "breadcrumbs_link_2",
      },
    ],
    multiLine: true,
    snackbar: false,
    nameRules: [(v) => !!v || "Name is required"],
    nppRules: [(v) => !!v || "NPP is required"],
    date: new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
      .toISOString()
      .substr(0, 10),
    date2: new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
      .toISOString()
      .substr(0, 10),
    dateFormatted: vm.formatDate(
      new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
        .toISOString()
        .substr(0, 10)
    ),
    menu3: false,
    menu2: false,
    message: "",
  }),
  computed: {
    dateActive() {
      return this.formatDate(this.date);
    },
    dateLast() {
      return this.formatDate(this.date2);
    },
  },
  methods: {
    formatDate(date) {
      if (!date) return null;
      const [year, month, day] = date.split("-");
      return `${month}/${day}/${year}`;
    },
    createResource() {
      this.message = "Berhasil Create Resource";
      this.snackbar = true;
    },
  },
};
</script>

<style lang="scss" scoped>
</style>