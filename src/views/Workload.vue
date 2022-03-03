<template>
  <v-row>
    <v-col>
      <v-card class="pa-2" offset-sm="3" outlined tile>
        <h1 class="pa-3">IT Formation</h1>
        <v-divider></v-divider>
        <v-row>
          <v-col>
            <v-data-table
              :headers="headers"
              :items="workload"
              :search="search"
              :loading="loadingPlaylist"
              sort-by="nama"
              class="elevation-1"
              v-bind="size"
            >
              <template v-slot:top>
                <v-toolbar flat>
                  <h1>Gap IT Formation</h1>
                  <v-spacer></v-spacer>
                  <div class="pa-5" max-width:100>
                    <v-text-field
                      class="shrink"
                      outlined
                      v-bind="size"
                      v-model="search"
                      append-icon="mdi-magnify"
                      label="Search"
                      single-line
                      hide-details
                      dense
                    ></v-text-field>
                  </div>
                  <v-btn
                    v-bind="size"
                    class="white--text"
                    @click="editItem()"
                    color="#004483"
                  >
                    + Create New Data
                  </v-btn>
                  <v-dialog v-model="dialog" max-width="400px">
                    <v-card>
                      <v-card color="#004483">
                        <v-card-title class="white--text">
                          <span class="text-h6"
                            ><h4>{{ formTitle }}</h4></span
                          >
                          <v-spacer></v-spacer>
                          <v-icon @click="close" color="white"
                            >mdi-close</v-icon
                          >
                        </v-card-title>
                      </v-card>
                      <v-card-text>
                        <v-form ref="form" v-model="valid">
                          <v-container>
                            <v-row>
                              <v-col cols="12" sm="7" md="5">
                                Active Date

                                <VueDatePicker
                                  placeholder="Start date"
                                  fullscreen-mobile
                                  v-model="editedItem.startDate"
                                  :rules="nameRules"
                                />
                              </v-col>
                              <v-col cols="12" sm="7" md="7">
                                Last Working Date

                                <VueDatePicker
                                  placeholder="End date"
                                  fullscreen-mobile
                                  v-model="editedItem.endDate"
                                  :rules="nameRules"
                                />
                              </v-col>
                            </v-row>

                            <v-autocomplete
                              v-model="editedItem.divisiId"
                              v-on:click="filter(editedItem.divisiId)"
                              label="Divisi*"
                              :rules="nameRules"
                              required
                              outlined
                              :items="divisi"
                            ></v-autocomplete>
                            <v-autocomplete
                              @click="filter(editedItem.divisiId)"
                              v-model="editedItem.unit"
                              label="Kelompok*"
                              :rules="nameRules"
                              outlined
                              :items="tempkel"
                            ></v-autocomplete>
                          </v-container>
                        </v-form>
                      </v-card-text>
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
                        <v-btn color="#004483" dark v-if="valid" @click="save">
                          Save
                        </v-btn>
                      </v-card-actions>
                    </v-card>
                  </v-dialog>
                  <v-dialog v-model="dialog2" max-width="400px">
                    <v-card>
                      <v-card color="#004483">
                        <v-card-title class="white--text">
                          <span class="text-h6"
                            ><h4>{{ formTitle }}</h4></span
                          >
                          <v-spacer></v-spacer>
                          <v-icon @click="close2" color="white"
                            >mdi-close</v-icon
                          >
                        </v-card-title>
                      </v-card>
                      <v-card-text>
                        <v-form ref="form" v-model="valid">
                          <v-container>
                            <v-autocomplete
                              v-model="editedItem.jenjangJabatan"
                              label="Jenjang Jabatan*"
                              :rules="nameRules"
                              required
                              outlined
                              :items="tempj"
                            ></v-autocomplete>
                            <v-text-field
                            v-model="editedItem.jumlah"
                            label="Jumlah"
                            required
                            outlined
                          ></v-text-field>
                          </v-container>
                        </v-form>
                      </v-card-text>
                      <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn
                          outlined
                          color="blue darken-1"
                          text
                          @click="close2"
                        >
                          Cancel
                        </v-btn>
                        <v-btn color="#004483" dark v-if="valid" @click="save2">
                          Save
                        </v-btn>
                      </v-card-actions>
                    </v-card>
                  </v-dialog>
                  <v-dialog v-model="dialogDelete" max-width="700">
                    <v-card>
                      <v-card color="#004483">
                        <v-card-title class="white--text">
                          <span class="text-h6"><h4>IT Formation</h4></span>
                          <v-spacer></v-spacer>

                          <v-icon @click="close" color="white"
                            >mdi-close</v-icon
                          >
                        </v-card-title>
                      </v-card>
                      <v-row class="pa-3">
                        <v-col>
                          <h3 class="pa-3">
                            Detail Kelompok {{ editedItem.unit }}
                          </h3>
                        </v-col>
                        <v-col>
                          <v-text-field
                            class="shrink"
                            outlined
                            v-bind="size"
                            v-model="search2"
                            append-icon="mdi-magnify"
                            label="Search"
                            single-line
                            hide-details
                            dense
                          ></v-text-field>
                        </v-col>
                        <v-col>
                          <v-btn
                            v-bind="size"
                            class="white--text"
                            @click="editItem2()"
                            color="#004483"
                          >
                            + Create New Data
                          </v-btn>
                        </v-col>
                      </v-row>
                      <v-col cols="12" sm="13" offset-sm="0.2">
                        <v-card class="pa-2" offset-sm="3" outlined tile>
                          <v-data-table
                            :headers="headers2"
                            :items="workload2"
                            :search="search2"
                            :loading="loadingPlaylist"
                            sort-by="nama"
                            class="elevation-1"
                            v-bind="size"
                          >
                            <template v-slot:[`item.action`]="{ item }">
                              <v-btn
                                v-bind="size"
                                class="mx-3"
                                @click="editItem2(item)"
                                >Edit</v-btn
                              >
                            </template>
                          </v-data-table>
                        </v-card>
                      </v-col>
                    </v-card>
                  </v-dialog>
                </v-toolbar>
              </template>
              <template v-slot:[`item.action`]="{ item }">
                <button class="sa-2" @click="deleteItem(item)">Detail</button>
                <button @click="editItem(item)">Edit</button>
              </template>
              <template v-slot:[`item.statusName`]="{ item }">
                <p v-if="item.status == 0" class="red--text">Inactive</p>
                <p v-else class="green--text">Active</p>
              </template>
              <template v-slot:[`item.no`]="{ item }">
                <td>
                  {{ resources.indexOf(item) + 1 }}
                </td>
              </template>
              <template v-slot:no-data>
                <v-progress-circular
                  :size="70"
                  :width="7"
                  color="#004483"
                  indeterminate
                ></v-progress-circular>
              </template>
            </v-data-table>
          </v-col>
        </v-row>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import { Axios } from "./Axios";
const apiService = new Axios();
export default {
  name: "Workload",
  data: (vm) => ({
    snackbar1: false,
    snackbar: false,
    text: `Hello, I'm a snackbar`,
    valid: false,
    nameRules: [(v) => !!v || "Required"],
    resourceType: [],
    search: "",
    tab: null,
    menus: ["Resource", "Kelompok"],
    items: [
      {
        text: "Master Admin",
        disabled: false,
        href: "/usermanagement",
      },
      {
        text: "User Management",
        disabled: true,
        href: "/usermanagement",
      },
    ],
    dialog: false,
    dialog2: false,
    editedIndex: -1,
    dialogDetail: false,
    dialogDelete: false,
    headers: [
      { text: "Divisi", value: "divisi" },
      {
        text: "Kelompok",
        align: "start",
        sortable: true,
        value: "unit",
      },
      { text: "Formasi", value: "formasi" },
      { text: "Eksisting", value: "eksisting" },
      { text: "GAP", value: "gap" },
      { text: "Action", value: "action" },
    ],
    headers2: [
      { text: "Divisi", value: "divisi" },
      {
        text: "Jenjab",
        align: "start",
        sortable: true,
        value: "jenjangJabatan",
      },
      { text: "Formasi", value: "jumlah" },
      { text: "Eksisting", value: "eksisting" },
      { text: "GAP", value: "gap" },
      { text: "Action", value: "action" },
    ],
    users: [],
    workload: [],
    workload2: [],
    skills: [],
    skillid: [],
    obj: {},
    tempk: [],
    tempr: [],
    temptipe: [],
    tempj: [],
    tempskill: [],
    kelompok: [],
    kelompokid: [],
    divisi: [],
    tempd: [],
    divisiid: [],
    tipeid: [],
    roleid: [],
    tipe: [],
    role: [],
    status: ["Active", "Inactive"],
    statusId: [],
    tstatus: [],
    jenjab: [],
    jenjabid: [],
    resources: [],
    temp: {},
    s: [],
    editedItem: {
      password: "Proteam@12345",
    },
    defaultItem: {},
    detailItem: {},
    newEditedItem: {},
    detailID: {},
    editID: "",
    nowdate: new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
      .toISOString()
      .substr(0, 10),
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
    activeSend: "",
    lastSend: "",
    menu3: false,
    menu2: false,
    rt: {},
    no: [],
    keldiv: [],
    tempkel: [],
    sumkd: "",
    search2: "",
    wlaHeaderId:0,
    divisiId:0,
    unitid:0
  }),
  computed: {
    size() {
      const size = { xs: "x-small" }[this.$vuetify.breakpoint.name];
      return size ? { [size]: true } : {};
    },
    formTitle() {
      return this.editedIndex === -1 ? "Create New Data" : "Edit IT Formation";
    },
    dateActive() {
      return this.formatDate(this.date);
    },
    dateLast() {
      return this.formatDate(this.date2);
    },
  },
  watch: {
    dialog(val) {
      val || this.close();
    },
    dialog2(val) {
      val || this.close2();
    },
    dialogDetail(val) {
      val || this.closeDetail();
    },
    dialogDelete(val) {
      val || this.closeDelete();
    },
  },
  created() {
    this.initialize();
    this.getData();
    this.getData2();
    this.getjenjab()
  },
  methods: {
    filter(div) {
      const response = apiService
        .getKelompokByDivisi(div, 1)
        .then((response) => {
          this.keldiv = response.newKelompok;
        })
        .catch((err) => err);
      response;
      if (this.sumkd == 1) {
        this.tempkel = [];
        this.sumkd = 0;
      }
      if (this.sumkd == 0) {
        this.keldiv.map((item) => {
          this.tempkel.push(item.kelompokName);
        });
        this.sumkd = 1;
      }
    },
    async getData() {
      const response = await apiService
        .getWla()
        .then((response) => {
          this.workload = response.data;
        })
        .catch((err) => err);
      response;
    },
    async getjenjab() {
      const response = await apiService
        .getJenjab()
        .then((response) => {
          console.log("data"+response)
          response.map((item) => {
              this.tempj.push(item.jenjangJabatan);
              this.jenjabid.push(item.jenjabId);
          })
        })
        .catch((err) => err);
      response;
      for (var k = 0; k < this.tempj.length; k++) {
        //this.tempskill.push(obj2)
        let oo = {};
        oo.text = this.tempj[k];
        oo.value = this.jenjabid[k];
        this.jenjab.push(oo);
      }
      console.log(this.jenjab)
    },
    async getData2() {
      //let rt = { text: "", value: 0 };
      //const obj = {}
      const response = await apiService
        .getLookup()
        .then((response) => {
          response.map((item) => {
            if (item.type == "Divisi") {
              this.tempd.push(item.name);
              this.divisiid.push(item.value);
            }
            if (item.type == "Kelompok") {
              this.tempk.push(item.name);
              this.kelompokid.push(item.value);
            }
            // if (item.type == "Jenjab") {
            //   this.tempj.push(item.name);
            //   this.jenjabid.push(item.value);
            // }
          });
        })
        .catch((err) => err);
      response;
      console.log("aa", this.tstatus);
      console.log("aa", this.statusId);
      for (var m = 0; m < this.tempk.length; m++) {
        //this.tempskill.push(obj2)
        let oo = {};
        oo.text = this.tempk[m];
        oo.value = this.kelompokid[m];
        this.kelompok.push(oo);
      }
      console.log("kel", this.status);
      for (var p = 0; p < this.tempd.length; p++) {
        let oo = {};
        oo.text = this.tempd[p];
        oo.value = this.divisiid[p];
        this.divisi.push(oo);
      }
      // for (var l = 0; l < this.tempj.length; l++) {
      //   //this.tempskill.push(obj2)
      //   let oo = {};
      //   oo.text = this.tempj[l];
      //   oo.value = this.jenjabid[l];
      //   this.jenjab.push(oo);
      // }
    },
    initialize() {
      this.users = [];
    },
    createItem(item) {
      this.createItem = item;
      this.$router.push("/createNewResource");
    },
    editItem(item) {
      this.editedIndex = this.workload.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },
    editItem2(item) {
      this.editedIndex = this.workload2.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog2 = true;
    },
    detailItem(item) {
      this.editedIndex = this.workload.indexOf(item);
      this.detailItem = Object.assign({}, item);
      this.dialogDetail = true;
    },
    deleteItem(item) {
      const response = apiService
        .getWla2(item.wlaHeaderId)
        .then((response) => {
          if (response.data) this.workload2 = response.data;
        })
        .catch((err) => err);
      response;
      this.editedIndex = this.workload.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialogDelete = true;
      this.wlaHeaderId = item.wlaHeaderId
      this.divisiId = item.divisiId
      this.unitid = item.unitId
      //       const format = item.cost.toString().split('').reverse().join('');
      // const convert = format.match(/\d{1,3}/g);
      // this.editedItem.cost = 'Rp ' + convert.join('.').split('').reverse().join('')
    },
    deleteItemConfirm() {
      this.resources.splice(this.editedIndex, 1);
      this.closeDelete();
    },
    close() {
      this.s = [];
      this.dialog = false;
      this.dialogDelete = false;
      this.$refs.form.resetValidation();
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
        // this.$router.go();
      });
    },
    close2() {
      this.dialog2 = false;
      this.$refs.form.resetValidation();
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
        // this.$router.go();
      });
    },
    closeDetail() {
      this.s = [];
      this.dialog = false;
      this.$refs.form.resetValidation();
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
        //this.$router.go();
      });
    },
    closeDelete() {
      this.s = [];
      for (let prop in this.workload2) {
        delete this.workload2[prop];
      }
      this.dialogDelete = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
        //this.$router.go();
      });
    },
    showAlert() {
      const Toast = this.$swal.mixin({
        toast: true,
        position: "top-end",
        confirmButtonText: "go",
        timer: 2000,
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
        text: "GAP IT Formation successfully changed.",
        confirmButtonText: "OK",
      }).then((result) => {
        if (result.isConfirmed) {
          this.$router.go();
        }
      });
      //this.$router.go()
    },
    showAlertFail() {
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
        icon: "error",
        title: "Fail",
        text: "Users fail changed.",
        confirmButtonText: "OK",
      }).then((result) => {
        if (result.isConfirmed) {
          this.$router.go();
        }
      });
      //this.$router.go()
    },
    createData(Data) {
      const response = apiService
        .createWlaHeader(Data)
        .then((succ) => {
          this.showAlert();
          succ;
        })
        .catch(() => {
          this.showAlertFail();
        });
      response;
    },
    createData2(Data) {
      const response = apiService
        .createWlaDetail(Data)
        .then((succ) => {
          this.showAlert();
          succ;
        })
        .catch(() => {
          this.showAlertFail();
        });
      response;
    },
    updateData(Data, id) {
      const response = apiService
        .updateWlaHeader(Data, id)
        .then((succ) => {
          this.showAlert();
          succ;
        })
        .catch((err) => {
          this.showAlertFail();
          err;
        });
      response;
    },
    updateData2(Data, id) {
      const response = apiService
        .updateWlaDetail(Data, id)
        .then((succ) => {
          this.showAlert();
          succ;
        })
        .catch((err) => {
          this.showAlertFail();
          err;
        });
      response;
    },
    getkelompokId() {
      for (var i = 0; i < this.tempk.length; i++) {
        if (this.editedItem.unit == this.kelompok[i].text) {
          this.newEditedItem.unitId = this.kelompok[i].value;
        }
      }
    },
    getjenjabId() {
       
        for (var i = 0; i < this.tempj.length; i++) {
          if (this.editedItem.jenjangJabatan == this.jenjab[i].text) {
            this.newEditedItem.jenjabId = this.jenjab[i].value;
          }
        }
      
    },

    save() {
      if (this.editedIndex > -1) {
        this.newEditedItem.updatedBy = localStorage.getItem("name,");
        this.newEditedItem.divisiId = this.editedItem.divisiId;
        this.newEditedItem.startDate = this.editedItem.startDate;
        this.newEditedItem.endDate = this.editedItem.endDate;
        this.getkelompokId();
        this.updateData(this.newEditedItem, this.editedItem.wlaHeaderId);
      } else {
        this.newEditedItem.createdBy = localStorage.getItem("name,");
        this.newEditedItem.divisiId = this.editedItem.divisiId;
        this.newEditedItem.startDate = this.editedItem.startDate;
        this.newEditedItem.endDate = this.editedItem.endDate;
        this.getkelompokId();
        this.createData(this.newEditedItem);
      }
      this.close();
    },
    save2() {
      if (this.editedIndex > -1) {
        this.newEditedItem.updatedBy = localStorage.getItem("name,");
        this.getjenjabId()
        this.newEditedItem.wlaHeaderId=this.editedItem.wlaHeaderId
        this.newEditedItem.jumlah = this.editedItem.jumlah;
        this.newEditedItem.divisiId = this.divisiId
        this.newEditedItem.unitId = this.unitid
        this.updateData2(this.newEditedItem, this.editedItem.wlaDetailId);
      } else {
        this.newEditedItem.wlA_header_id = this.wlaHeaderId
        this.newEditedItem.createdBy = localStorage.getItem("name,");
        this.getjenjabId()
        this.newEditedItem.jumlah = this.editedItem.jumlah;
        this.newEditedItem.divisiId = this.divisiId
        this.newEditedItem.unitId = this.unitid
        this.createData2(this.newEditedItem);
      }
      this.close();
    },
    formatDate(date) {
      if (!date) return null;
      const [year, month, day] = date.split("-");
      return `${month}/${day}/${year}`;
    },
  },
};
</script>

<style lang="scss" scoped>
.v-progress-circular {
  margin: 1rem;
}
.bor {
  outline: 1;
}
button {
  padding: 5px 10px;
  font-size: inherit;
  background: transparent;
  border: 2px solid #ccc;
  transition: 0.4s;
}
.v-icon {
  border: 2px;
}
</style>
