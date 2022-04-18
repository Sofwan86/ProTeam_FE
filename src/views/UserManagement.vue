<template>
  <v-row>
    <v-col>
      <v-data-table
        :headers="headers"
        :items="users"
        :search="search"
        sort-by="nama"
        class="elevation-1"
        v-bind="size"
      >
        <template v-slot:top>
          <v-toolbar flat>
            <v-toolbar-title>User Management</v-toolbar-title>
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
              @click="editItem(7, 'dfsf')"
              color="#004483"
            >
              + Create New User
            </v-btn>
            <v-dialog v-model="dialog" max-width="800px">
              <!-- <template v-slot:activator="{ on }">
                <v-btn color="#004483" dark v-bind="size" v-on="on">
                  + Create New User
                </v-btn>
              </template> -->
              <v-card>
                <v-alert dense text type="success" v-model="snackbar">
                  <strong>Data sukses diupdate</strong>
                </v-alert>
                <v-alert dense text type="success" v-model="snackbar1">
                  <strong>Data sukses ditambah</strong>
                </v-alert>
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
                            v-model="editedItem.fullName"
                            label="Full Name*"
                            :rules="nameRules"
                            required
                            outlined
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6" md="4">
                          <v-text-field
                            v-if="editedIndex > -1"
                            v-model="editedItem.npp"
                            :rules="nameRules"
                            label="NPP*"
                            required
                            disabled
                            filled
                            outlined
                          ></v-text-field>
                          <v-text-field
                            v-else
                            v-model="editedItem.npp"
                            :rules="nameRules"
                            label="NPP*"
                            required
                            outlined
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6" md="4">
                          <v-autocomplete
                            v-model="editedItem.kelompokId"
                            label="Kelompok*"
                            :rules="nameRules"
                            required
                            outlined
                            :items="kelompok"
                          ></v-autocomplete>
                        </v-col>
                        <v-col cols="12" sm="6" md="4">
                          <v-text-field
                            v-model="editedItem.email"
                            label="Email"
                            required
                            outlined
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6" md="4">
                          <v-text-field
                            v-if="editedIndex > -1"
                            v-model="editedItem.password"
                            label="Password"
                            filled
                            value="Proteam@12345"
                            required
                            outlined
                            :type="show1 ? 'text' : 'password'"
                            :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                            @click:append="show1 = !show1"
                            color="indigo darken-4"
                          ></v-text-field>
                          <v-text-field
                            v-else
                            v-model="editedItem.password"
                            label="Password"
                            filled
                            value="Proteam@12345"
                            required
                            outlined
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6" md="4">
                          <v-autocomplete
                            v-model="editedItem.role"
                            label="Role*"
                            :rules="nameRules"
                            outlined
                            :items="role"
                          ></v-autocomplete>
                        </v-col>

                        <v-col cols="12" sm="6" md="4">
                          <v-select
                            v-model="editedItem.statusName"
                            :rules="nameRules"
                            label="Status*"
                            :items="status"
                            outlined
                          ></v-select>
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
            <v-dialog v-model="dialogDelete" max-width="700">
              <v-card>
                <v-card color="#004483">
                  <v-card-title>
                    <span class="white--text">Detail User</span>
                  </v-card-title>
                </v-card>
                <v-row>
                  <v-col cols="12" md="6">
                    <v-list-item two-line>
                      <v-list-item-content>
                        <v-list-item-title
                          ><h2>
                            {{ editedItem.fullName }}
                          </h2></v-list-item-title
                        >
                        <h3>
                          {{ editedItem.npp }}
                        </h3>
                        <v-list-item-subtitle
                          >Added
                          {{ editedItem.createdTime | str_limit(10) }}
                        </v-list-item-subtitle>
                      </v-list-item-content>
                    </v-list-item>
                  </v-col>
                </v-row>
                <h2 class="mx-4">Information</h2>
                <v-row>
                  <v-col cols="7" md="6">
                    <v-list-item two-line>
                      <v-list-item-content>
                        <v-list-item-subtitle>Name</v-list-item-subtitle>
                        <v-list-item-title>
                          {{ editedItem.fullName }}
                        </v-list-item-title>
                      </v-list-item-content>
                    </v-list-item>
                    <v-list-item two-line>
                      <v-list-item-content>
                        <v-list-item-subtitle>NPP</v-list-item-subtitle>
                        <v-list-item-title>{{
                          editedItem.npp
                        }}</v-list-item-title>
                      </v-list-item-content>
                    </v-list-item>
                    <v-list-item two-line>
                      <v-list-item-content>
                        <v-list-item-subtitle>Unit</v-list-item-subtitle>
                        <v-list-item-title>
                          {{ editedItem.kelompok }}
                        </v-list-item-title>
                      </v-list-item-content>
                    </v-list-item>
                  </v-col>
                  <v-divider vertical></v-divider>
                  <v-col cols="5" md="4">
                    <v-list-item two-line>
                      <v-list-item-content>
                        <v-list-item-subtitle>Role</v-list-item-subtitle>
                        <v-list-item-title>
                          {{ editedItem.roleName }}
                        </v-list-item-title>
                      </v-list-item-content>
                    </v-list-item>
                    <v-list-item two-line>
                      <v-list-item-content>
                        <v-list-item-subtitle>Email</v-list-item-subtitle>
                        <v-list-item-title>
                          {{ editedItem.email }}
                        </v-list-item-title>
                      </v-list-item-content>
                    </v-list-item>
                    <v-list-item two-line>
                      <v-list-item-content>
                        <v-list-item-subtitle>Status</v-list-item-subtitle>
                        <v-list-item-title>
                          <p
                            v-if="editedItem.statusName == 'Active'"
                            class="green--text"
                          >
                            Active
                          </p>
                          <p v-else class="red--text">Inactive</p>
                        </v-list-item-title>
                      </v-list-item-content>
                    </v-list-item>
                  </v-col>
                </v-row>
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
</template>

<script>
import { Axios } from "../Axios";
const apiService = new Axios();
export default {
  name: "userManagement",
  data: (vm) => ({
    show1: false,
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
    editedIndex: -1,
    dialogDetail: false,
    dialogDelete: false,
    headers: [
      {
        text: "Name",
        align: "start",
        sortable: true,
        value: "fullName",
      },
      { text: "NPP", value: "npp" },
      { text: "Email", value: "email" },
      { text: "Status", value: "statusName" },
      { text: "Action", value: "action" },
    ],
    users: [],
    skills: [],
    skillid: [],
    obj: {},
    objkel: {},
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
  }),
  computed: {
    size() {
      const size = { xs: "x-small" }[this.$vuetify.breakpoint.name];
      return size ? { [size]: true } : {};
    },
    formTitle() {
      return this.editedIndex === -1 ? "Create New User" : "Edit User";
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
    this.initialize();
    this.getData();
    this.getData2();
    this.getKelompok();
  },
  methods: {
    async getData() {
      this.editedItem.password = "Proteam@12345";
      const response = await apiService
        .getUsers()
        .then((response) => {
          this.users = response.newuserdata;
        })
        .catch((err) => err);
      response;
      for (var i = 1; i <= this.resources.length; i++) {
        this.resources.no.push(i);
      }
      this.resources.no = this.no;
    },
    async getData2() {
      //let rt = { text: "", value: 0 };
      //const obj = {}
      const response = await apiService
        .getLookup()
        .then((response) => {
          response.map((item) => {
            if (item.type == "RoleApp") {
              this.tempr.push(item.name);
              this.roleid.push(item.value);
            }
          });
        })
        .catch((err) => err);
      response;
      for (var n = 0; n < this.tempr.length; n++) {
        //this.tempskill.push(obj2)
        let oo = {};
        oo.text = this.tempr[n];
        oo.value = this.roleid[n];
        this.role.push(oo);
      }
    },
    async getKelompok() {
      const response = await apiService
        .getKelompok()
        .then((response) => {
          this.objkel = response.newKelompok;
        })
        .catch((err) => err);
      response;
      this.objkel.map((item) => {
        this.tempk.push(item.kelompokName);
        this.kelompokid.push(item.kelompokId);
      });
      for (var k = 0; k < this.tempk.length; k++) {
        //this.tempskill.push(obj2)
        let oo = {};
        oo.text = this.tempk[k];
        oo.value = this.kelompokid[k];
        this.kelompok.push(oo);
      }
     
    },
    initialize() {
      this.users = [];
    },
    createItem(item) {
      this.createItem = item;
      this.$router.push("/createNewResource");
    },
    editItem(item, pw) {
      if (pw) this.editedItem.password = pw;
      this.editedItem.email = "fdss";
      this.editedIndex = this.users.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
      this.getData();
    },
    deleteItem(item) {
      this.editedIndex = this.users.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialogDelete = true;
    },
    deleteItemConfirm() {
      this.resources.splice(this.editedIndex, 1);
      this.closeDelete();
    },
    close() {
      this.s = [];
      this.dialog = false;
      this.dialogDelete = false;
      this.$refs.form.reset();
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
      this.$refs.form.reset();
      this.$refs.form.resetValidation();
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
        //this.$router.go();
      });
    },
    closeDelete() {
      this.s = [];
      this.dialogDelete = false;
      this.$refs.form.reset();
      this.$refs.form.resetValidation();
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
        text: "Users successfully changed.",
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
        .createUsers(Data)
        .then((succ) => {
          // alert(succ);
          //this.snackbar1 = true;
          this.getData();
          // this.$router.go();
          this.showAlert();
          succ;
        })
        .catch(() => {
          this.showAlertFail();
        });
      response;
      if (response) {
        if (response) this.getData();
      }
    },
    updateData(Data, id) {
      const response = apiService
        .updateUsers(Data, id)
        .then((succ) => {
          // alert(succ);
          //this.snackbar = true;
          this.getData();
          // this.$router.go();
          this.showAlert();
          succ;
        })
        .catch((err) => {
          this.showAlertFail();
          err;
        });
      response;
    },

    save() {
      if (this.editedIndex > -1) {
        this.newEditedItem.password = "Proteam@12345";
        this.newEditedItem.updatedBy = localStorage.getItem("name,");
        this.newEditedItem.createdBy = localStorage.getItem("name,");
        this.newEditedItem.fullName = this.editedItem.fullName;
        this.newEditedItem.npp = this.editedItem.npp;
        this.newEditedItem.email = this.editedItem.email;
        this.newEditedItem.role = this.editedItem.role;
        this.newEditedItem.kelompokId = this.editedItem.kelompokId;
        if (this.editedItem.statusName === "Active") {
          this.newEditedItem.status = 1;
        } else this.newEditedItem.status = 0;
        this.updateData(this.newEditedItem, this.editedItem.id);
      } else {
        this.newEditedItem.password = "Proteam@12345";
        this.newEditedItem.createdBy = localStorage.getItem("name,");
        this.newEditedItem.fullName = this.editedItem.fullName;
        this.newEditedItem.npp = this.editedItem.npp;
        this.newEditedItem.email = this.editedItem.email;
        this.newEditedItem.role = this.editedItem.role;
        this.newEditedItem.kelompokId = this.editedItem.kelompokId;
        // this.newEditedItem.status = this.editedItem.status
        this.editedItem.statusName === "Active"
          ? (this.newEditedItem.status = 1)
          : (this.newEditedItem.status = 0);
        this.createData(this.newEditedItem);
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
