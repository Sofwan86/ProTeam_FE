<template>
  <v-row>
    <v-col>
      <v-data-table
        :headers="headers"
        :items="manmonth"
        :search="search"
        class="elevation-1"
      >
        <template v-slot:top>
          <v-toolbar flat>
            <v-toolbar-title>Data Man Month</v-toolbar-title>
            <v-spacer></v-spacer>
            <div class="pa-5" max-width:100>
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
            </div>
            <v-btn v-bind="size"  class="white--text" @click="editItem()" color="#004483">
              + Create New Manmonth
            </v-btn>
            <v-dialog v-model="dialog" max-width="1000px">
              <!-- <template v-slot:activator="{ on, attrs }">
                <v-btn color="#004483" dark v-bind="attrs" v-on="on">
                  + Create New Manmonth
                </v-btn>
              </template> -->
              <v-card>
                <v-card color="#004483">
                  <v-card-title class="white--text">
                    <span class="text-h5"
                      ><h3>{{ formTitle }}</h3></span
                    >
                    <v-spacer></v-spacer>
                  </v-card-title>
                </v-card>
                <v-card-text>
                  <v-form ref="form" v-model="valid">
                    <v-container>
                      <v-row>
                        <v-col cols="12" sm="6" md="4">
                          <v-text-field
                            v-model="editedItem.vendorName"
                            label="Nama Vendor*"
                            :rules="nameRules"
                            required
                            outlined
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6" md="4">
                          <v-text-field
                            v-model="editedItem.contractNumber"
                            label="Contract Number*"
                            :rules="nameRules"
                            required
                            outlined
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6" md="4">
                          <v-text-field
                            v-model="editedItem.totalManmonth"
                            label="Total Manmonth"
                            required
                            outlined
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6" md="4">
                          <v-select
                            v-model="editedItem.nama_status"
                            label="Status"
                            :items="status"
                            outlined
                          ></v-select>
                        </v-col>
                        <v-col cols="12" sm="6" md="4">
                          Start Contract Date
                          <!-- <v-btn outlined color="grey" width="900" height="35"> -->
                          <VueDatePicker
                            placeholder="Start Contract Date"
                            fullscreen-mobile
                            v-model="editedItem.startContract"
                            :rules="nameRules"
                          />
                          <!-- </v-btn> -->
                        </v-col>

                        <v-col cols="12" sm="6" md="4">
                          Last Contract Date
                          <!-- <v-btn outlined color="grey" width="900" height="35"> -->
                          <VueDatePicker
                            placeholder="Last Contract Date"
                            fullscreen-mobile
                            v-model="editedItem.lastContract"
                            :rules="nameRules"
                          />
                          <!-- </v-btn> -->
                        </v-col>

                        
                        <v-col cols="12" sm="6" md="4">
                          <v-textarea
                            v-model="editedItem.notes"
                            label="Notes"
                            required
                            outlined
                            rows="1"
                          ></v-textarea>
                        </v-col>
                      </v-row>
                    </v-container>
                  </v-form>
                </v-card-text>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn outlined color="blue darken-1" text @click="close">
                    Cancel
                  </v-btn>
                  <v-btn color="#004483" dark v-if="valid" @click="save">
                    Save
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
            <v-dialog v-model="dialogDelete" max-width="1100px">
              <v-card>
                <v-card color="#004483">
                <v-card-title>
                  <span class="white--text">Detail Manmonth</span>
                </v-card-title>
                </v-card>
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
                                  editedItem.createdTime | str_limit(10)
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
                              <v-list-item-title>
                                <!-- {{
                                          editedItem.nama_status
                                        }} -->
                                <p
                                  v-if="editedItem.nama_status == 'Inactive'"
                                  class="red--text"
                                >
                                  {{ editedItem.nama_status }}
                                </p>
                                <p v-else class="green--text">
                                  {{ editedItem.nama_status }}
                                </p>
                              </v-list-item-title>
                            </v-list-item-content>
                          </v-list-item>
                        </v-col>
                        <v-divider vertical></v-divider>
                        <v-col cols="4" md="3">
                          <v-list-item two-line>
                            <v-list-item-content>
                              <v-list-item-subtitle
                                >Start Contract Date</v-list-item-subtitle
                              >
                              <v-list-item-title>
                                {{ editedItem.startContract | str_limit(10) }}
                              </v-list-item-title>
                            </v-list-item-content>
                          </v-list-item>
                          <v-list-item two-line>
                            <v-list-item-content>
                              <v-list-item-subtitle
                                >Total Manmonth</v-list-item-subtitle
                              >
                              <v-list-item-title>{{
                                editedItem.totalManmonth
                              }}</v-list-item-title>
                            </v-list-item-content>
                          </v-list-item>
                          <v-list-item two-line>
                            <v-list-item-content>
                              <v-list-item-subtitle
                                >Usage Manmonth</v-list-item-subtitle
                              >
                              <v-list-item-title>
                                {{ editedItem.usageManmonth }}
                              </v-list-item-title>
                            </v-list-item-content>
                          </v-list-item>
                        </v-col>
                        <v-col cols="4" md="3">
                          <v-list-item two-line>
                            <v-list-item-content>
                              <v-list-item-subtitle
                                >Last Contract Date</v-list-item-subtitle
                              >
                              <v-list-item-title>{{
                                editedItem.lastContract | str_limit(10)
                              }}</v-list-item-title>
                            </v-list-item-content>
                          </v-list-item>
                          <v-list-item two-line>
                            <v-list-item-content>
                              <v-list-item-subtitle
                                >Available Manmonth</v-list-item-subtitle
                              >
                              <v-list-item-title>
                                {{ editedItem.availableManmonth }}
                              </v-list-item-title>
                            </v-list-item-content>
                          </v-list-item>
                          <v-list-item two-line>
                            <v-list-item-content>
                              <v-list-item-subtitle>Notes</v-list-item-subtitle>
                              <p>{{ editedItem.notes }}</p>
                            </v-list-item-content>
                          </v-list-item>
                        </v-col>
                      </v-row>
                    </v-card>
                  </v-col>
                </v-row>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="blue darken-1" text @click="closeDelete">
                    Close
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </v-toolbar>
        </template>
        <template v-slot:[`item.actions`]="{ item }">
          <!-- <v-btn v-bind="size" @click="deleteItem(item)">Detail</v-btn>
          <v-btn v-bind="size" class="mx-3" @click="editItem(item)">Edit</v-btn> -->
          <button class="sa-2" @click="deleteItem(item)">Detail</button>
                <button @click="editItem(item)">Edit</button>
        </template>
        <template v-slot:[`item.status`]="{ item }">
          <p v-if="item.status == 0" class="red--text">Inactive</p>
          <p v-else class="green--text">Active</p>
        </template>
        <template v-slot:[`item.no`]="{ item }">
          <td>
            {{ mandaysvendor.indexOf(item) + 1 }}
          </td>
        </template>
        <template v-slot:no-data>
          <v-progress-circular
            :size="70"
            :width="7"
            color="purple"
            indeterminate
          ></v-progress-circular>
        </template>
      </v-data-table>
    </v-col>
  </v-row>
</template>

<script>
import { Axios } from "./Axios";
const apiService = new Axios();
export default {
  name: "Manmonth",
  data: (vm) => ({
    valid: false,
    nameRules: [(v) => !!v || "Required"],
    ss: [],
    sss: "",
    snackbar: false,
    snackbar1: false,
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
        text: "Data Mandays Vendor",
        disabled: true,
        href: "/mandaysvendor",
      },
    ],
    dialog: false,
    editedIndex: -1,
    dialogDetail: false,
    dialogDelete: false,
    headers: [
      {
        text: "Vendor Name",
        align: "start",
        sortable: true,
        value: "vendorName",
      },
      { text: "Contract", value: "contractNumber" },
      { text: "Total Manmonth", value: "totalManmonth" },
      { text: "Usage Manmonth", value: "usageManmonth" },
      { text: "Avilable Manmonth", value: "availableManmonth" },
      { text: "Status", value: "status" },
      { text: "Action", value: "actions" },
    ],
    status: [],
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
    tipeid: [],
    roleid: [],
    tipe: [],
    role: [],
    jenjab: [],
    jenjabid: [],
    resources: [],
    editedItem: {
      vendorName: "",
      contractNumber: "",
      totalMandays: "",
      usageMandays: "",
      availableMandays: "",
      status: "",
      notes: "",
      createdTime: "",
      createdBy: "",
      updatedBy: "",
      mandaysId: "",
    },
    defaultItem: {
      nama: "",
      npp: "",
      email: "",
      phone: "",
      skills: [],
      dateActive: "",
      dateLast: "",
      jenjab: "",
      kelompok: "",
      tipe: "",
      role: "",
      status: "",
      price: "",
    },
    detailItem: {
      nama: "",
      npp: "",
      email: "",
      phone: "",
      skills: [],
      dateActive: "",
      dateLast: "",
      jenjab: "",
      kelompok: "",
      tipe: "",
      role: "",
      status: "",
    },
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
    manmonth: [],
  }),
  computed: {
    size () {
      const size = {xs:'x-small'}[this.$vuetify.breakpoint.name];
      return size ? { [size]: true } : {}
    },
    formTitle() {
      return this.editedIndex === -1 ? "Create New Manmonth" : "Edit Manmonth";
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
    dialogDetail(val) {
      val || this.closeDetail();
    },
    dialogDelete(val) {
      val || this.closeDelete();
    },
  },
  created() {
    this.getData();
    this.getData2();
  },
  methods: {
    async getData() {
      const response = await apiService
        .getVendor()
        .then((response) => {
          this.manmonth = response.data;
        })
        .catch((err) => err);
      response;
    },
    async getData2() {
      //let rt = { text: "", value: 0 };
      //const obj = {}
      const response = await apiService
        .getLookup()
        .then((response) => {
          response.map((item) => {
            if (item.type == "StatusActive") this.status.push(item.name);
          });
        })
        .catch((err) => err);
      response;
    },
    createItem(item) {
      this.createItem = item;
      this.$router.push("/createNewResource");
    },
    editItem(item) {
      this.editedIndex = this.manmonth.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },
    detailItem(item) {
      this.editedIndex = this.manmonth.indexOf(item);
      this.detailItem = Object.assign({}, item);
      this.dialogDetail = true;
    },
    deleteItem(item) {
      this.editedIndex = this.manmonth.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialogDelete = true;
      console.log(this.sss);
    },
    deleteItemConfirm() {
      this.mandaysvendor.splice(this.editedIndex, 1);
      this.closeDelete();
    },
    close() {
      this.dialogDelete = false;
      this.dialog = false;
                       this.$refs.form.reset();
      this.$refs.form.resetValidation();
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
        //this.$router.go();
      });
    },
    closeDetail() {
      this.dialog = false;
                       this.$refs.form.reset();
      this.$refs.form.resetValidation();
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
        //this.$router.go();
      });
    },
    closeDelete() {
      this.dialogDelete = false;
                       this.$refs.form.reset();
      this.$refs.form.resetValidation();
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
        text: "Manmonth successfully changed.",
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
        text: "Manmonth fail changed.",
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
        .createManmonth(Data)
        .then((succ) => {
          this.getData();
          this.showAlert()
          succ;
        })
        .catch(() => this.showAlertFail());
      response;
    },
    updateData(Data, id) {
      const response = apiService
        .updateManmonth(Data, id)
        .then((succ) => {
          succ
          this.showAlert()
        })
        .catch((err) => {
          // alert("Sukses Update");
          //this.snackbar = true;
          err;
           this.showAlertFail()
        });
      response;
    },

    save() {
      if (this.editedIndex > -1) {
        this.newEditedItem.vendorName = this.editedItem.vendorName;
        this.newEditedItem.contractNumber = this.editedItem.contractNumber;
        this.newEditedItem.totalManmonth = this.editedItem.totalManmonth;
        this.newEditedItem.usageManmonth = this.editedItem.usageManmonth;
        this.newEditedItem.availableManmonth =
          this.editedItem.availableManmonth;
        this.newEditedItem.updatedBy = localStorage.getItem("name,");
        this.newEditedItem.notes = this.editedItem.notes;
        this.newEditedItem.startContract = this.editedItem.startContract;
        this.newEditedItem.lastContract = this.editedItem.lastContract;
        if (this.editedItem.nama_status == "Active") {
          this.newEditedItem.status = 1;
        } else this.newEditedItem.status = 0;
        this.updateData(this.newEditedItem, this.editedItem.manmonthId);
      } else {
        this.newEditedItem.vendorName = this.editedItem.vendorName;
        this.newEditedItem.contractNumber = this.editedItem.contractNumber;
        this.newEditedItem.totalManmonth = this.editedItem.totalManmonth;
        this.newEditedItem.usageManmonth = this.editedItem.usageManmonth;
        this.newEditedItem.availableManmonth =
          this.editedItem.availableManmonth;
        this.newEditedItem.createdBy = localStorage.getItem("name,");
        this.newEditedItem.notes = this.editedItem.notes;

        this.newEditedItem.startContract = this.editedItem.startContract;
        this.newEditedItem.lastContract = this.editedItem.lastContract;
        if (this.editedItem.nama_status == "Active") {
          this.newEditedItem.status = 1;
        } else this.newEditedItem.status = 0;
        //this.resources.push(this.editedItem);
        if (this.valid) this.createData(this.newEditedItem);
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
button {
  padding: 5px 10px;
  font-size: inherit;
  background: transparent;
  border: 2px solid #ccc;
  transition: 0.4s;
}
</style>
