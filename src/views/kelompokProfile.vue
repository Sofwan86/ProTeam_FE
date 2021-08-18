<template>
<<<<<<< HEAD
    <div>
    <v-breadcrumbs
      :items="items"
      divider="/"
    ></v-breadcrumbs>
  
  <v-container>
    <v-row no-gutters>
      <v-col
        cols="12"
        sm="13"
        offset-sm="0.2">
    
        <v-card class="pa-2" offset-sm="3" outlined tile>
          <h1>Profile</h1>
          <v-tabs>
            <v-tab>Kelompok</v-tab>
          </v-tabs>
          <v-row>
            <v-col>
              <h2 >Kelompok Profile</h2>
            </v-col>
              <v-col
                  cols="12"
                  sm="4"
                  md="2"
=======
  <div>
    <v-breadcrumbs :items="items" divider="/"></v-breadcrumbs>

    <v-container>
      <v-row no-gutters>
        <v-col cols="12" sm="13" offset-sm="0.2">
          <v-card class="pa-2" offset-sm="3" outlined tile>
            <h1>Profile</h1>
            <v-row>
              <v-col>
                <v-data-table
                  :headers="headers"
                  :items="units"
                  :search="search"
                  sort-by="calories"
                  class="elevation-1"
>>>>>>> 6d20cd9474dff1d0cf466019b549d7b015ae1060
                >
                  <template v-slot:top>
                    <v-toolbar flat>
                      <v-toolbar-title
                        ><h2>Kelompok Profile</h2></v-toolbar-title
                      >
                      <v-divider class="mx-4" inset vertical></v-divider>

                      <v-spacer></v-spacer>
                      <div max-width:100>
                        <v-text-field
                          outlined
                          v-model="search"
                          append-icon="mdi-magnify"
                          label="Search"
                          single-line
                          hide-details
                        ></v-text-field>
                      </div>
                      <v-dialog v-model="dialogDelete" max-width="900">
                        <v-card>
                          <v-row no-gutters>
                            <v-col cols="12" sm="13" offset-sm="0.2">
                              <v-card class="pa-2" offset-sm="3" outlined tile>
                                <v-row>
                                  <v-col cols="12" md="6">
                                    <v-list-item two-line>
                                      <v-list-item-content>
                                        <v-list-item-title
                                          ><h2>
                                            {{ editedItem.kelompok }}
                                          </h2></v-list-item-title
                                        >
                                        <v-list-item-subtitle
                                          ><h4>
                                            {{ editedItem.contractNumber }}
                                          </h4></v-list-item-subtitle
                                        >
                                        <v-list-item-subtitle
                                          >Added
                                          {{
                                            editedItem.createdTime
                                          }}</v-list-item-subtitle
                                        >
                                      </v-list-item-content>
                                    </v-list-item>
                                  </v-col>
                                </v-row>
                                <v-row>
                                  <v-col cols="4" md="3">
                                    <v-list-item two-line>
                                      <v-list-item-content>
                                        <v-list-item-subtitle
                                          >Skillset</v-list-item-subtitle
                                        >
                                        <v-list-item-title
                                          v-for="skill in editedItem.skills"
                                          :key="skill"
                                          >{{ skill }}</v-list-item-title
                                        >
                                      </v-list-item-content>
                                    </v-list-item>
                                    <v-list-item two-line>
                                      <v-list-item-content>
                                        <v-list-item-subtitle
                                          >Status</v-list-item-subtitle
                                        >
                                        <v-list-item-title>{{
                                          editedItem.statuss
                                        }}</v-list-item-title>
                                      </v-list-item-content>
                                    </v-list-item>
                                  </v-col>
                                  <v-divider vertical></v-divider>
                                  <v-col cols="4" md="3">
                                    <v-list-item two-line>
                                      <v-list-item-content>
                                        <v-list-item-subtitle
                                          >Total Mandays</v-list-item-subtitle
                                        >
                                        <v-list-item-title>{{
                                          editedItem.totalMandays
                                        }}</v-list-item-title>
                                      </v-list-item-content>
                                    </v-list-item>
                                    <v-list-item two-line>
                                      <v-list-item-content>
                                        <v-list-item-subtitle
                                          >Total Pegawai</v-list-item-subtitle
                                        >
                                        <v-list-item-title>
                                          {{ editedItem.totalPeg }}
                                        </v-list-item-title>
                                      </v-list-item-content>
                                    </v-list-item>
                                  </v-col>
                                </v-row>
                              </v-card>
                            </v-col>
                          </v-row>
                        </v-card>
                      </v-dialog>
                    </v-toolbar>
                  </template>
                  <template v-slot:[`item.actions`]="{ item }">
                    <v-btn dense color="primary" @click="deleteItem(item)"
                      >Detail</v-btn
                    >
                  </template>
                  <template v-slot:no-data>
                    <v-btn color="primary" @click="initialize"> Do Data </v-btn>
                  </template>
                </v-data-table>
              </v-col>
            </v-row>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
// import { Axios } from "./Axios";

// const apiService = new Axios();
export default {
  name: "kelompokProfile",
  data: () => ({
    nama: "Marvin Janitra Akmal",
    npp: "12345678",
    email: "marvinjanitra@gmail.com",
    phone: "081212786101",
    kelompok: "OFA",
    skills: ["React", "Vue", "Java", "Phyton"],
    tipe: "FTE",
    date: new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
      .toISOString()
      .substr(0, 10),
    menu: false,
    modal: false,
    menu2: false,
    statuss: ["Active", "Inactive"],
    search: "",
    dialog: false,
    dialogDelete: false,
    units: [],
    editedIndex: -1,
    editedItem: {
      kelompok: "",
      skills: [""],
      totalMandays: "",
      totalPeg: "",
      statuss: "",
    },
    defaultItem: {
      kelompok: "",
      skills: [""],
      totalMandays: "",
      totalPeg: "",
      statuss: "",
    },

    tab: null,
    menus: ["Resource", "Kelompok"],
    headers: [
      {
        text: "Kelompok Name",
        align: "start",
        sortable: true,
        value: "kelompok",
      },
      { text: "Total Mandays", value: "totalMandays" },
      { text: "Total Pegawai", value: "totalPeg" },
      { text: "Status", value: "statuss" },
      { text: "Action", value: "actions" },
    ],

    items: [
      {
        text: "Profile",
        disabled: false,
        href: "/kelompokProfile",
      },
      {
        text: "Kelompok Profile",
        disabled: true,
        href: "/kelompokProfile",
      },
    ],
    mandaysvendor: [],
  }),
  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "New Data" : "Edit Item";
    },
  },

  watch: {
    dialog(val) {
      val || this.close();
    },
    dialogDelete(val) {
      val || this.closeDelete();
    },
  },

  created() {
    this.initialize();
    this.getData();
  },

  methods: {
    // async getData() {
    //   const response = await apiService
    //     .getManday()
    //     .then((response) => {
    //       this.mandaysvendor = response;
    //     })
    //     .catch((err) => err);
    //   response;
    // },
    initialize() {
      this.units = [
        {
          kelompok: "OFA",
          skills: ["Google"],
          totalMandays: "15",
          totalPeg: "25",
          statuss: "Active",
        },
      ];
    },

    editItem(item) {
      this.editedIndex = this.units.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

<<<<<<< HEAD
<style lang="scss" scoped>
</style>
=======
    deleteItem(item) {
      this.editedIndex = this.units.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialogDelete = true;
    },

    deleteItemConfirm() {
      this.units.splice(this.editedIndex, 1);
      this.closeDelete();
    },

    close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    closeDelete() {
      this.dialogDelete = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    save() {
      if (this.editedIndex > -1) {
        Object.assign(this.units[this.editedIndex], this.editedItem);
      } else {
        this.units.push(this.editedItem);
      }
      this.close();
    },
  },
};
</script>

<style lang="scss" scoped></style>
>>>>>>> 6d20cd9474dff1d0cf466019b549d7b015ae1060
