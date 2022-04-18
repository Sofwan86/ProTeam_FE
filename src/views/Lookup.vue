<template>
  <div>
    <v-container>
      <v-row no-gutters>
        <v-col cols="12" sm="13" offset-sm="0.2">
          <v-card class="pa-2" offset-sm="3" outlined tile>
            <v-row>
              <v-col>
                <h2>Manage Lookup</h2>
              </v-col>

              <v-spacer></v-spacer>
              <v-col>
                <v-autocomplete
                  v-model="selected"
                  :items="itemm"
                  @click="save2"
                  label="Select Type"
                  item-text="name"
                  item-value="item"
                  return-object
                  outlined
                  dense
                >
                </v-autocomplete>
              </v-col>
            </v-row>
            <v-divider></v-divider>  

            <v-row>
              <v-col>
                <v-data-table
                  v-if="selected.name"
                  v-bind:headers="headers"
                  :items="selected.data"
                  :search="search"
                  hide-actions
                >
                  <template v-slot:top>
                    <v-toolbar flat>
                      <v-toolbar-title
                        ><h3 v-if="selected.name">
                          {{ selected.name }}
                        </h3></v-toolbar-title
                      >

                      <v-divider class="mx-4" inset vertical></v-divider>
                      <v-spacer></v-spacer>
                      <v-col cols="12" sm="5" md="3">
                        <v-text-field
                          class="shrink"
                          outlined
                          v-if="selected.name"
                          v-model="search"
                          append-icon="mdi-magnify"
                          label="Search"
                          single-line
                          hide-details
                          dense
                        ></v-text-field>
                      </v-col>
                      <v-dialog v-model="dialog" max-width="500px">
                        <template v-slot:activator="{ on, attrs }">
                          <v-btn
                            class="mb-2 white--text"
                            @click="save2(selected.name)"
                            color="#004483"
                            dark
                            v-bind="attrs"
                            v-on="on"
                          >
                            New Data
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
                                <v-btn
                                  v-if="editedIndex == -1"
                                  color="#004483"
                                  dark
                                  @click="save(selected.name)"
                                >
                                  Create New Data
                                </v-btn>
                                <v-btn
                                  v-else
                                  color="#004483"
                                  dark
                                  @click="save"
                                >
                                  Update Data
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
                    <!-- <button class="sa-2" @click="deleteItem(item)">Detail</button> -->
                <button @click="editItem(item)">Edit</button>
                    <!-- <v-icon small class="mr-2" @click="editItem(item)">
                      mdi-pencil
                    </v-icon> -->
                  </template>
                  <template v-slot:[`item.updateTime`]="{ item }">
                    <h4>{{ item.updateTime | str_limit(10) }}</h4>
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
import { Axios } from "../Axios";

const apiService = new Axios();

export default {
  name: "Lookup",
  data: () => ({
    selected: [],
    dataType: [],
    tab: null,
    menus: ["Resource", "Kelompok"],
    dataMhs: [],
    dialog: false,
    dialogDelete: false,
    headers: [
      {
        text: "Type",
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
    value: [],
    editedIndex: -1,
    editedItem: {
      name: "",
      type: "",
      value: "",
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
    search: "",
    nowdate: new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
      .toISOString()
      .substr(0, 10),
  }),
  computed: {
    size() {
      const size = { xs: "x-small" }[this.$vuetify.breakpoint.name];
      return size ? { [size]: true } : {};
    },
    formTitle() {
      return this.editedIndex === -1 ? "New Data" : "Edit Data";
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
            this.dataType.push(item.type);
            
          });
          let uniqueChars = [...new Set(this.dataType)];
          this.dataType = uniqueChars;
          
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
            
          }
          
          this.itemm = arr;
        })
        .catch((err) => err);
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
    },
    editItem(item) {
      this.editedIndex = this.selected.data.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    editItemT(item) {
      this.editedItem.name = item;
      this.editedIndex = 1;
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
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
    showAlert() {
      const Toast = this.$swal.mixin({
        toast: true,
        position: "top-end",
        confirmButtonText: "go",
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.addEventListener("mouseenter", this.$swal.stopTimer);
          toast.addEventListener("mouseleave", this.$swal.resumeTimer);
        },
        willClose: () => {
          this.$router.go();
        },
      });

      Toast.fire({
        icon: "success",
        title: "Success",
        text: "Data type successfully changed.",
        confirmButtonText: "OK",
      }).then((result) => {
        if (result.isConfirmed) {
          this.$router.go();
        }
      });
      //this.$router.go()
    },
    updateData(Data, id) {
      const response = apiService
        .updateDataLookup(Data, id)
        .then((succ) => {
          // alert(succ);
          this.snackbar = true;
          this.getData();
          // this.$router.go();
          this.showAlert();
          succ;
        })
        .catch((err) => err);
      response;
    },
    createData(Data) {
      const response = apiService
        .createDataLookup(Data)
        .then((succ) => {
          // alert(succ);
          this.snackbar = true;
          this.getData();
          // this.$router.go();
          this.showAlert();
          succ;
        })
        .catch((err) => err);
      response;
    },
    save(tipe) {
      if (this.editedIndex > -1) {
        this.editedItem.updateTime = this.nowdate;
        this.updateData(this.editedItem, this.editedItem.lookupId);
      } else {
        const a = this.value.length;
        this.editedItem.value = a + 1;
        this.editedItem.orderNumber = a + 1;
        this.editedItem.status = 1;
        this.editedItem.updateTime = this.nowdate;
        this.editedItem.type = tipe;
        this.createData(this.editedItem);
      }
      this.close();
    },
    save2(tipe) {
      const response = apiService.getLookup().then((response) => {
        response.map((item) => {
          this.dataType.push(item.type);
          if (item.type == tipe) {
            this.value.push(item.value);
          }
        });
      });
      const a = this.value.length;
      this.editedItem.value = this.value[a];
      response;
    },
  },
};
</script>

<style lang="scss" scoped>
button {
  padding: 5px 10px;
  font-size: inherit;
  background: transparent;
  border: 2px solid #ccc;
  transition: 0.4s;
}

</style>