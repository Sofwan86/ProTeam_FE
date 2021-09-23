<template>
  <div>
    <!-- <v-breadcrumbs :items="items" divider="/"></v-breadcrumbs> -->

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
              
              <v-col cols="12" sm="5" md="3">
                
              <v-text-field
                class="shrink"
                outlined
                v-model="search"
                append-icon="mdi-magnify"
                label="Search"
                single-line
                hide-details
                dense
              ></v-text-field>
            
              </v-col>
              <v-col cols="12" sm="4" md="2">
                
                
                  

                  <v-select
                    v-model="selected"
                    :items="itemm"
                    label="Select Type"
                    item-text="name"
                    item-value="item"
                    return-object
                    outlined
                    dense
                  >
                  </v-select>
                
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
                   v-if="selected.name"
                v-bind:headers="headers"
                :items="selected.data"
                hide-actions
                >
                  <template v-slot:top>
                    <v-toolbar flat>
                      <v-toolbar-title><h3 v-if="selected.name">
                {{ selected.name }}
                <v-icon @click="editItem(selected.name)">mdi-pencil</v-icon>
                <v-icon>mdi-plus</v-icon>
              </h3></v-toolbar-title>
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
                          <v-card color="#004483">
                            <v-card-title class="white--text text-center">
                              <span class="text-h5">{{ formTitle }}</span>
                            </v-card-title></v-card
                          >

                          <v-card-text>
                            <v-container>
                              <v-text-field
                                class="text-center mt-10"
                                v-model="editedItem.name"
                                label="Type name"
                                outlined
                              ></v-text-field>
                              <v-card-actions>
                                <v-spacer></v-spacer>
                                <v-btn
                                  outlined
                                  color="blue darken-1"
                                  text
                                  @click="close"
                                >
                                  Cancel
                                </v-btn>
                                <v-btn color="#004483" dark @click="save">
                                  Create New Type
                                </v-btn>
                              </v-card-actions>
                            </v-container>
                          </v-card-text>
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
    selected: ["Role"],
    dataType: [],
    tab: null,
    menus: ["Resource", "Kelompok"],
    dataMhs: [],
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
      {
        text: "Type",
        align: "start",
        sortable: false,
        value: "type",
      },
      { text: "Name", value: "name" },
      { text: "Value", value: "value" },
      { text: "Updated Time", value: "updateTime" },
      { text: "Actions", value: "actions", sortable: false },
    ],
    mandays: [],
    data: [],
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
    obj: {},
    itemm: [],
    itemss: [
      {
        value: false,
        id: 0,
        name: "Finch Conway",
        age: 49,
        weight: 66,
        height: 61.69,
        bloodsugars: [
          {
            value: 86,
            time: "12/17 02:56:18",
          },
          {
            value: 92,
            time: "12/17 06:12:47",
          },
          {
            value: 98,
            time: "12/08 12:45:01",
          },
          {
            value: 82,
            time: "11/21 05:31:09",
          },
          {
            value: 86,
            time: "11/25 09:35:45",
          },
          {
            value: 83,
            time: "12/02 02:43:38",
          },
          {
            value: 84,
            time: "11/30 05:29:29",
          },
          {
            value: 90,
            time: "12/08 04:27:22",
          },
          {
            value: 98,
            time: "11/28 09:18:24",
          },
        ],
      },
      {
        value: false,
        id: 1,
        name: "Patrick Odonnell",
        age: 37,
        weight: 52,
        height: 64.36,
        bloodsugars: [
          {
            value: 93,
            time: "12/02 07:39:07",
          },
          {
            value: 98,
            time: "12/02 11:47:32",
          },
          {
            value: 93,
            time: "11/30 08:24:25",
          },
          {
            value: 81,
            time: "11/21 09:56:25",
          },
          {
            value: 98,
            time: "12/13 03:03:37",
          },
          {
            value: 99,
            time: "12/24 04:14:42",
          },
          {
            value: 101,
            time: "12/06 12:02:28",
          },
        ],
      },
      {
        value: false,
        id: 2,
        name: "Alyson Finch",
        age: 60,
        weight: 63,
        height: 71.23,
        bloodsugars: [
          {
            value: 90,
            time: "12/17 12:38:49",
          },
          {
            value: 80,
            time: "12/19 09:33:01",
          },
          {
            value: 105,
            time: "12/15 07:42:52",
          },
          {
            value: 92,
            time: "12/24 06:59:48",
          },
          {
            value: 75,
            time: "12/05 05:04:14",
          },
          {
            value: 98,
            time: "12/11 02:22:55",
          },
          {
            value: 79,
            time: "12/17 10:24:27",
          },
        ],
      },
      {
        value: false,
        id: 3,
        name: "Marva Oneil",
        age: 75,
        weight: 32,
        height: 71.9,
        bloodsugars: [
          {
            value: 88,
            time: "12/20 04:36:09",
          },
          {
            value: 85,
            time: "12/15 09:33:38",
          },
          {
            value: 97,
            time: "12/17 09:37:49",
          },
          {
            value: 75,
            time: "11/21 05:29:54",
          },
          {
            value: 99,
            time: "12/04 03:59:08",
          },
          {
            value: 83,
            time: "12/12 07:59:39",
          },
          {
            value: 96,
            time: "11/27 10:28:51",
          },
        ],
      },
      {
        value: false,
        id: 4,
        name: "Mavis Mcguire",
        age: 72,
        weight: 66,
        height: 61.44,
        bloodsugars: [
          {
            value: 89,
            time: "11/22 12:00:20",
          },
          {
            value: 104,
            time: "12/13 09:53:57",
          },
          {
            value: 100,
            time: "12/13 10:24:02",
          },
          {
            value: 102,
            time: "12/12 01:29:38",
          },
          {
            value: 104,
            time: "12/08 07:16:21",
          },
          {
            value: 80,
            time: "12/26 07:44:18",
          },
          {
            value: 99,
            time: "12/21 12:49:04",
          },
          {
            value: 91,
            time: "12/01 05:36:21",
          },
          {
            value: 105,
            time: "12/19 01:17:25",
          },
        ],
      },
      {
        value: false,
        id: 5,
        name: "Paul Watson",
        age: 23,
        weight: 24,
        height: 59.58,
        bloodsugars: [
          {
            value: 96,
            time: "12/13 04:02:20",
          },
          {
            value: 96,
            time: "12/26 04:58:19",
          },
          {
            value: 75,
            time: "12/12 04:16:00",
          },
          {
            value: 80,
            time: "12/05 05:35:08",
          },
          {
            value: 98,
            time: "11/24 01:56:01",
          },
          {
            value: 83,
            time: "12/05 10:19:18",
          },
          {
            value: 104,
            time: "12/17 05:57:27",
          },
          {
            value: 86,
            time: "12/01 08:19:39",
          },
          {
            value: 103,
            time: "12/15 04:49:34",
          },
        ],
      },
      {
        value: false,
        id: 6,
        name: "Fernandez Matthews",
        age: 49,
        weight: 51,
        height: 70.76,
        bloodsugars: [
          {
            value: 96,
            time: "12/21 05:14:04",
          },
          {
            value: 94,
            time: "11/22 08:42:01",
          },
          {
            value: 76,
            time: "12/26 05:25:51",
          },
          {
            value: 83,
            time: "12/08 11:33:56",
          },
          {
            value: 93,
            time: "12/24 07:16:02",
          },
          {
            value: 86,
            time: "11/21 11:55:26",
          },
          {
            value: 89,
            time: "11/23 02:08:45",
          },
          {
            value: 99,
            time: "12/05 03:45:01",
          },
          {
            value: 97,
            time: "12/23 08:05:11",
          },
        ],
      },
      {
        value: false,
        id: 7,
        name: "Lindsay Long",
        age: 76,
        weight: 75,
        height: 62.65,
        bloodsugars: [
          {
            value: 98,
            time: "12/03 08:29:15",
          },
          {
            value: 105,
            time: "12/15 12:26:06",
          },
          {
            value: 91,
            time: "11/25 11:34:06",
          },
          {
            value: 100,
            time: "12/20 09:00:24",
          },
          {
            value: 89,
            time: "12/05 08:38:34",
          },
          {
            value: 76,
            time: "12/26 02:37:50",
          },
          {
            value: 84,
            time: "12/22 03:41:40",
          },
          {
            value: 85,
            time: "12/07 09:34:51",
          },
          {
            value: 78,
            time: "11/24 10:50:34",
          },
        ],
      },
    ],
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
      //let rt = { text: "", value: 0 };
      //const obj = {}
      const arr = [];
      const response = await apiService
        .getLookup()
        .then((response) => {
          response.map((item) => {
            // let data={}
            // data.name = item.type
            // data.datas = item
            // arr.push(data)

            this.dataType.push(item.type);
            // if (item.type == "Role") {
            //   this.tempr.push(item.name);
            //   this.roleid.push(item.value);
            // }
            // if (item.type == "Kelompok") {
            //   this.tempk.push(item.name);
            //   this.kelompokid.push(item.value);
            // }
            // if (item.type == "Jenjab") {
            //   this.tempj.push(item.name);
            //   this.jenjabid.push(item.value);
            // }
            // if (item.type == "StatusActive") this.status.push(item.name);
            // if (item.type == "Skillset") {
            //   this.skills.push(item.name);
            //   this.skillid.push(item.value);
            // }
            console.log(data);
          });
          let uniqueChars = [...new Set(this.dataType)];
          this.dataType = uniqueChars;
          console.log("aaa" + arr);
          let data = [];
          for (var i = 0; i < this.dataType.length; i++) {
            response.map((item) => {
              item.type === this.dataType[i] ? data.push(item) : data;
            });
            let dat = {};
            dat.name = this.dataType[i];
            dat.data = data;
            dat.value = false;
            data = [];
            arr.push(dat);
            console.log(arr);
          }
          console.log("asa" + arr);
          this.itemm = arr;
        })
        .catch((err) => err);
      console.log(this.dataType);
      response;
      for (var k = 0; k < this.skills.length; k++) {
        //this.tempskill.push(obj2)
        let oo = {};
        oo.text = this.skills[k];
        oo.value = this.skillid[k];
        this.tempskill.push(oo);
      }
      for (var l = 0; l < this.tempj.length; l++) {
        //this.tempskill.push(obj2)
        let oo = {};
        oo.text = this.tempj[l];
        oo.value = this.jenjabid[l];
        this.jenjab.push(oo);
      }
      console.log(this.jenjab);
      for (var m = 0; m < this.tempk.length; m++) {
        //this.tempskill.push(obj2)
        let oo = {};
        oo.text = this.tempk[m];
        oo.value = this.kelompokid[m];
        this.kelompok.push(oo);
      }
      for (var n = 0; n < this.tempr.length; n++) {
        //this.tempskill.push(obj2)
        let oo = {};
        oo.text = this.tempr[n];
        oo.value = this.roleid[n];
        this.role.push(oo);
      }
      for (var o = 0; o < this.temptipe.length; o++) {
        //this.tempskill.push(obj2)
        let oo = {};
        oo.text = this.temptipe[o];
        oo.value = this.tipeid[o];
        this.resourceType.push(oo);
      }
      console.log("aaa" + this.resourceType);
    },
    //     async createData() {
    //       const Data = {
    //   "mandaysId": 0,
    //   "vendorName": "PT. ABC Sejahtera",
    //   "contractNumber": "STI/123/123",
    //   "startContract": "1 January 2020",
    //   "lastContract": "1 January 2021",
    //   "totalMandays": 1000,
    //   "usageMandays": 400,
    //   "availableMandays": 600,
    //   "status": 1,
    //   "createdBy": "Supervisor",
    //   "updatedBy": "string",
    //   "notes": "Vendor ini belum menyediakan komputer merk asus"
    // }
    //       const response = await apiService
    //         .createLookup(Data)
    //         .then((succ) => succ)
    //         .catch((err) => err);
    //       response
    //     },

    initialize() {
      this.mandays = [
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
      this.editedIndex = this.mandays.indexOf(item);
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

    save() {
      this.push(this.mandays);

      this.close();
    },
  },
};
</script>

<style lang="scss" scoped>
</style>