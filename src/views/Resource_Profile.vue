<template>
  <div>
    <v-breadcrumbs :items="items" divider="/"></v-breadcrumbs>

    <v-container>
      <v-row no-gutters>
        <v-col cols="12" sm="13" offset-sm="0.2">
          <v-card class="pa-2" offset-sm="3" outlined tile>
            <h1>Profile {{resources}} </h1>
            <v-row>
              <v-col>
                <v-data-table
                  :headers="headers"
                  :items="resources"
                  :search="search"
                  class="elevation-1"
                >
                  <template v-slot:top>
                    <v-toolbar flat>
                      <v-toolbar-title>Data Mandays Vendor</v-toolbar-title>
                      <v-divider class="mx-4" inset vertical></v-divider>

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
                      <v-spacer></v-spacer>
                      <v-dialog v-model="dialog" max-width="900px">
                        <template v-slot:activator="{ on, attrs }">
                          <v-btn
                            color="primary"
                            dark
                            class="mb-2"
                            v-bind="attrs"
                            v-on="on"
                          >
                            + Create New Data
                          </v-btn>
                        </template>
                        <v-card>
                          <v-card-title>
                            <span class="text-h5">{{ formTitle }}</span>
                          </v-card-title>

                          <v-card-text>
                            <v-container>
                              <v-row>
                                <v-col cols="12" md="6">
                                  <h4>Nama Vendor</h4>
                                  <v-text-field
                                    v-model="editedItem.vendorName"
                                    label="ex: PT. ABC"
                                    outlined
                                    dense
                                    required
                                  ></v-text-field>
                                </v-col>

                                <v-col cols="12" md="6">
                                  <h4>Contract Number</h4>
                                  <v-text-field
                                    v-model="editedItem.contractNumber"
                                    label="ex: STI/123/123"
                                    outlined
                                    dense
                                    required
                                  ></v-text-field>
                                </v-col>
                                <v-col cols="12" md="6">
                                  <h4>Total Mandays</h4>
                                  <v-text-field
                                    v-model="editedItem.totalMandays"
                                    label="ex: 10000"
                                    outlined
                                    dense
                                  ></v-text-field>
                                </v-col>
                                <v-col cols="12" sm="6" md="3">
                                  <v-menu
                                    v-model="menu2"
                                    :close-on-content-click="false"
                                    :nudge-right="40"
                                    transition="scale-transition"
                                    offset-y
                                    min-width="auto"
                                  >
                                    <template v-slot:activator="{ on, attrs }">
                                      <v-text-field
                                        outlined
                                        v-model="startdate"
                                        label="Start Contract Date"
                                        prepend-icon="mdi-calendar"
                                        readonly
                                        v-bind="attrs"
                                        v-on="on"
                                      ></v-text-field>
                                    </template>
                                    <v-date-picker
                                      v-model="startdate"
                                      @input="menu2 = false"
                                    ></v-date-picker>
                                  </v-menu>
                                </v-col>
                                <v-col cols="12" sm="6" md="3">
                                  <v-menu
                                    v-model="menu"
                                    :close-on-content-click="false"
                                    :nudge-right="40"
                                    transition="scale-transition"
                                    offset-y
                                    min-width="auto"
                                  >
                                    <template v-slot:activator="{ on, attrs }">
                                      <v-text-field
                                        outlined
                                        v-model="lastdate"
                                        label="Last Contract Date"
                                        prepend-icon="mdi-calendar"
                                        readonly
                                        v-bind="attrs"
                                        v-on="on"
                                      ></v-text-field>
                                    </template>
                                    <v-date-picker
                                      v-model="lastdate"
                                      @input="menu = false"
                                    ></v-date-picker>
                                  </v-menu>
                                </v-col>
                                <v-col cols="12" sm="6">
                                  <h4>Notes</h4>
                                  <v-textarea
                                    v-model="editedItem.notes"
                                    outlined
                                    name="input-7-4"
                                    label="ex: Need information"
                                  ></v-textarea>
                                </v-col>
                                <v-col cols="12" sm="6">
                                  <h4>Status</h4>
                                  <v-select
                                    outlined
                                    v-model="editedItem.status"
                                    :items="statuss"
                                    label="Status"
                                  ></v-select>
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
                            <v-snackbar v-model="snackbar" :timeout="timeout">
                              {{ text }}

                              <template v-slot:action="{ attrs }">
                                <v-btn
                                  color="blue"
                                  text
                                  v-bind="attrs"
                                  @click="snackbar = false"
                                >
                                  Close
                                </v-btn>
                              </template>
                            </v-snackbar>
                          </v-card-actions>
                        </v-card>
                      </v-dialog>
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
                                            {{ editedItem.vendorName }}
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
                                              | str_limit(10)
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
                                          >Vendor Name</v-list-item-subtitle
                                        >
                                        <v-list-item-title>{{
                                          editedItem.vendorName
                                        }}</v-list-item-title>
                                      </v-list-item-content>
                                    </v-list-item>
                                    <v-list-item two-line>
                                      <v-list-item-content>
                                        <v-list-item-subtitle
                                          >Contract Number</v-list-item-subtitle
                                        >
                                        <v-list-item-title>{{
                                          editedItem.contractNumber
                                        }}</v-list-item-title>
                                      </v-list-item-content>
                                    </v-list-item>
                                    <v-list-item two-line>
                                      <v-list-item-content>
                                        <v-list-item-subtitle
                                          >Status</v-list-item-subtitle
                                        >
                                        <v-list-item-title>{{
                                          editedItem.status
                                        }}</v-list-item-title>
                                      </v-list-item-content>
                                    </v-list-item>
                                  </v-col>
                                  <v-divider vertical></v-divider>
                                  <v-col cols="4" md="3">
                                    <v-list-item two-line>
                                      <v-list-item-content>
                                        <v-list-item-subtitle
                                          >Start Contract
                                          Date</v-list-item-subtitle
                                        >
                                        <v-list-item-title>
                                          {{
                                            editedItem.startContract
                                              | str_limit(10)
                                          }}
                                        </v-list-item-title>
                                      </v-list-item-content>
                                    </v-list-item>
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
                                          >Usage Mandays</v-list-item-subtitle
                                        >
                                        <v-list-item-title>
                                          {{ editedItem.usageMandays }}
                                        </v-list-item-title>
                                      </v-list-item-content>
                                    </v-list-item>
                                  </v-col>
                                  <v-col cols="4" md="3">
                                    <v-list-item two-line>
                                      <v-list-item-content>
                                        <v-list-item-subtitle
                                          >Last Contract
                                          Date</v-list-item-subtitle
                                        >
                                        <v-list-item-title>{{
                                          editedItem.lastContract
                                            | str_limit(10)
                                        }}</v-list-item-title>
                                      </v-list-item-content>
                                    </v-list-item>
                                    <v-list-item two-line>
                                      <v-list-item-content>
                                        <v-list-item-subtitle
                                          >Available
                                          Mandays</v-list-item-subtitle
                                        >
                                        <v-list-item-title>
                                          {{ editedItem.availableMandays }}
                                        </v-list-item-title>
                                      </v-list-item-content>
                                    </v-list-item>
                                    <v-list-item two-line>
                                      <v-list-item-content>
                                        <v-list-item-subtitle
                                          >Notes</v-list-item-subtitle
                                        >
                                        <p>{{ editedItem.notes }}</p>
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
                    <v-icon small class="mr-2" @click="editItem(item)">
                      mdi-account-edit-outline
                    </v-icon>
                    <v-icon small @click="deleteItem(item)">
                      mdi-account-details-outline
                    </v-icon>
                  </template>
                  <!-- <template v-slot:[`item.status`]="{ item }">
                    <p v-if="item.status == 0" class="red--text" >inactive</p>
                    <p v-else class="green--text" >active</p>
                  </template> -->
                  <template v-slot:no-data>
                    <v-btn color="red" @click="initialize"> No Data </v-btn>
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
  name: "MandaysVendor",
  data: () => ({
    snackbar: false,
    text: "Berhasil ditambah.",
    timeout: 2000,
    startdate: new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
      .toISOString()
      .substr(0, 10),
    lastdate: new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
      .toISOString()
      .substr(0, 10),
    nowdate: new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
      .toISOString()
      .substr(0, 10),
    menu: false,
    modal: false,
    menu2: false,
    statuss: ["active", "inactive"],
    search: "",
    dialog: false,
    dialogDelete: false,
    mandays: [],
    editedIndex: -1,
    editedItem: {
      nama: "",
      npp: "",
      email: "",
      phone: "",
      skills: [""],
      dateActive: "",
      dateLast: "",
      jenjab: "",
      kelompok: "",
      tipe: "",
      role: "",
      status: "",
      price: "",
    },
    defaultItem: {
      nama: "",
      npp: "",
      email: "",
      phone: "",
      skills: [""],
      dateActive: "",
      dateLast: "",
      jenjab: "",
      kelompok: "",
      tipe: "",
      role: "",
      status: "",
      price: "",
    },

    tab: null,
    menus: ["Resource", "Kelompok"],
    headers: [
      {
        text: "Nama",
        align: "start",
        sortable: true,
        value: "employeeName",
      },
      { text: "NPP", value: "npp" },
      { text: "Kelompok", value: "kelompok" },
      { text: "Role", value: "nama_role" },
      { text: "Status", value: "status" },
      { text: "Action", value: "actions" },
    ],

    items: [
      {
        text: "Profile",
        disabled: true,
        href: "breadcrumbs_dashboard",
      },
      {
        text: "Resource",
        disabled: false,
        href: "/resourceProfile",
      },
    ],
    resources: [],
  }),
  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "Create Data" : "Update Data";
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
   async getData() {
      const response = await apiService
        .getResourceProfile()
        .then((response) => {
          this.resources = response.employee;
        })
        .catch((err) => err);
      response;
    },
    initialize() {
    //   this.resources = [
    //   ];
    },

    editItem(item) {
      this.editedIndex = this.mandaysvendor.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    deleteItem(item) {
      this.editedIndex = this.mandays.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialogDelete = true;
    },

    deleteItemConfirm() {
      this.mandays.splice(this.editedIndex, 1);
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
    createData(Data) {
      const response = apiService
        .createManday(Data)
        .then((succ) => succ)
        .catch((err) => err);
      response;
      if(response){
        if(response)
        this.getData()
      }
    },
    updateData(Data, id) {
      const response = apiService
        .updateManday(Data, id)
        .then((succ) => succ)
        .catch((err) => err);
      response;
      if(response){
        if(response)
        this.getData()
      }
    },
    save() {
      if (this.editedIndex > -1) {
        // Object.assign(this.mandays[this.editedIndex], this.editedItem);
     if(this.editedItem.status=="active"){
          this.editedItem.status = 1 
        }else this.editedItem.status = 0
     this.updateData(this.editedItem, this.editedItem.mandaysId);
     
     }
       else {
        this.editedItem.startContract = this.startdate;
        this.editedItem.lastContract = this.lastdate;
        this.editedItem.createdTime = this.nowdate;
        
        if(this.editedItem.status=="active"){
          this.editedItem.status = 1 
        }else this.editedItem.status = 0
        this.snackbar = true;
      this.createData(this.editedItem);
      }
      this.close();
    },
  },
};
</script>

<style lang="scss" scoped>
</style>