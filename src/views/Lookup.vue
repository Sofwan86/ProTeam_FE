<template>
  <div>
    <v-breadcrumbs :items="items" divider="/"></v-breadcrumbs>

    <v-container>
      <v-row no-gutters>
        <v-col cols="12" sm="13" offset-sm="0.2">
          <v-card class="pa-2" offset-sm="3" outlined tile>
            <h1>Master Admin</h1>
            <!-- <v-tabs>
            <v-tab>User Management</v-tab>
            <v-tab href="/mandaysvendor">Mandays Vendor</v-tab>
            <v-tab href="/lookup">Lookup</v-tab>
          </v-tabs> -->
            <v-row>
              <v-col>
                <h3>Manage Lookup</h3>
              </v-col>
              <v-col cols="12" sm="4" md="2">
                <v-text-field
                  label="Search"
                  outlined
                  dense
                  append-icon="mdi-file-find"
                ></v-text-field>
              </v-col>
              <v-col cols="3" sm="2" md="3">
                <v-btn color="primary" dark href="/createresource">
                  + Create New Data
                </v-btn>
              </v-col>
            </v-row>
            <v-row>
              <v-col>
                <v-data-table
                  :headers="headers"
                  :items="desserts"
                  sort-by="calories"
                  class="elevation-1"
                >
                  <template v-slot:top>
                    <v-toolbar flat>
                      <v-toolbar-title>Jenjang Jabatan</v-toolbar-title>
                      <v-divider class="mx-4" inset vertical></v-divider>
                      <v-spacer></v-spacer>
                      <v-dialog v-model="dialog" max-width="500px">
                        <template v-slot:activator="{ on, attrs }">
                          <v-btn
                            color="primary"
                            dark
                            class="mb-2"
                            v-bind="attrs"
                            v-on="on"
                          >
                            New Item
                          </v-btn>
                        </template>
                        <v-card>
                          <v-card-title>
                            <span class="text-h5">{{ formTitle }}</span>
                          </v-card-title>

                          <v-card-text>
                            <v-container>
                              <v-row>
                                <v-col cols="12" sm="6" md="4">
                                  <v-text-field
                                    v-model="desserts"
                                    label="Type name"
                                  ></v-text-field>
                                </v-col>
                              </v-row>
                            </v-container>
                          </v-card-text>

                          <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn color="blue darken-1" text @click="close">
                              Cancel
                            </v-btn>
                            <v-btn color="blue darken-1" text @click="save">
                              Save
                            </v-btn>
                          </v-card-actions>
                        </v-card>
                      </v-dialog>
                      <v-dialog v-model="dialogDelete" max-width="500px">
                        <v-card>
                          <v-card-title class="text-h5"
                            >Are you sure you want to delete this
                            item?</v-card-title
                          >
                          <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn
                              color="blue darken-1"
                              text
                              @click="closeDelete"
                              >Cancel</v-btn
                            >
                            <v-btn
                              color="blue darken-1"
                              text
                              @click="deleteItemConfirm"
                              >OK</v-btn
                            >
                            <v-spacer></v-spacer>
                          </v-card-actions>
                        </v-card>
                      </v-dialog>
                    </v-toolbar>
                  </template>
                  <template v-slot:[`item.actions`]="{ item }">
                    <v-icon small class="mr-2" @click="editItem(item)">
                      mdi-pencil
                    </v-icon>
                  </template>
                  <template v-slot:no-data>
                    <v-btn color="primary" @click="initialize"> Reset </v-btn>
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
import { Axios } from "./Axios";

const apiService = new Axios();

export default {
  name: "Lookup",
  data: () => ({
    tab: null,
    menus: ["Resource", "Kelompok"],
    dataMhs: [

    ],
    headerss: [
      {
        text: "Vendor Name",
        align: "start",
        sortable: true,
        value: "nama",
      },
      { text: "Contact", value: "contact" },
      { text: "Total Mandays", value: "sumMandays" },
      { text: "Usage Mandays", value: "usageMandays" },
      { text: "Avilable Mandays", value: "avilableMandays" },
      { text: "Status", value: "status" },
      { text: "Action", value: "" },
    ],

    items: [
      {
        text: "Master Admin",
        disabled: false,
        href: "/usermanagement",
      },
      {
        text: "Lookup",
        disabled: true,
        href: "/lookup",
      },
    ],
    dialog: false,
    dialogDelete: false,
    headers: [
      { text: "No.", value: "nomor" },
      {
        text: "Type",
        align: "start",
        sortable: false,
        value: "type",
      },
      { text: "Name", value: "name" },
      { text: "Value", value: "value" },
      { text: "Updated Time", value: "time" },
      { text: "Actions", value: "actions", sortable: false },
    ],
    desserts: [

    ],
    editedIndex: -1,
    editedItem: {
      name: "",
      nomor: 0,
      type: "",
      value: "",
      time: "",
    },
    defaultItem: {
      name: "",
      nomor: 0,
      type: "",
      value: "",
      time: "",
    },
  }),
  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "New Item" : "Edit Item";
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
    this.createData();
  },

  methods: {
    async getData() {
      const response = await apiService
        .getLookup()
        .then((succ) => succ)
        .catch((err) => err);
      alert(response);
    },
    async createData() {
      const Data = {
        type: "string",
        name: "string",
        orderNumber: 0,
        value: 0,
        status: 0,
        createdBy: "string",
        updatedBy: "string",
        createdTime: "2021-08-03T02:03:53.772Z",
        updateTime: "2021-08-03T02:03:53.772Z",
      };
      const response = await apiService
        .createLookup(Data)
        .then((succ) => succ)
        .catch((err) => err);
      alert(response);
    },

    initialize() {
      this.desserts = [
        {
          name: "AMGR",
          nomor: 1,
          type: "Jenjab",
          value: "1",
          time: "21 Juli 2021, 13.21",
        },
        {
          name: "AMGR",
          nomor: 2,
          type: "Jenjab",
          value: "1",
          time: "21 Juli 2021, 13.21",
        },
        {
          name: "AMGR",
          nomor: 3,
          type: "Jenjab",
          value: "1",
          time: "21 Juli 2021, 13.21",
        },
      ];
    },

    editItem(item) {
      this.editedIndex = this.desserts.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    deleteItem(item) {
      this.editedIndex = this.desserts.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialogDelete = true;
    },

    deleteItemConfirm() {
      this.desserts.splice(this.editedIndex, 1);
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

        this.push(this.desserts);
      
      this.close();
    },
  },
};
</script>

<style lang="scss" scoped>
</style>