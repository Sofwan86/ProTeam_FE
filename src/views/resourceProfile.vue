<template>
  <div>
    <v-breadcrumbs :items="items" divider="/"></v-breadcrumbs>
    <v-container>
      <v-row no-gutters>
        <v-col cols="12" sm="13" offset-sm="0.2">
          <v-card class="pa-2" offset-sm="3" outlined tile>
            <h1 class="pl-5 pt-3">Profile</h1>
            <v-tabs class="pl-3">
              <v-tab>Resource</v-tab>
              <v-tab disabled>Kelompok</v-tab>
            </v-tabs>
            <v-row>
              <v-col>
                <v-data-table
                  :headers="headers"
                  :items="resources"
                  :search="search"
                  :loading="loadingPlaylist"
                  sort-by="nama"
                  class="elevation-1"
                >
                  <template v-slot:top>
                    <v-toolbar flat>
                      <v-toolbar-title
                        ><h2>Resource Profile</h2></v-toolbar-title
                      >
                      <v-spacer></v-spacer>
                      <div class="pa-5" max-width:100>
                        <v-text-field
                          outlined
                          v-model="search"
                          append-icon="mdi-magnify"
                          label="Search"
                          single-line
                          hide-details
                          dense
                        ></v-text-field>
                      </div>
                      <v-dialog v-model="dialog" max-width="1000px">
                        <template v-slot:activator="{ on, attrs }">
                          <v-btn color="primary" dark v-bind="attrs" v-on="on">
                            + Create New Resource
                          </v-btn>
                        </template>
                        <v-card>
                          <v-card-title>
                            <span class="text-h5"
                              ><h2>{{ formTitle }}</h2></span
                            >
                          </v-card-title>
                          <v-card-text>
                            <v-container>
                              <v-row>
                                <v-col cols="12" sm="6" md="4">
                                  <v-text-field
                                    v-model="editedItem.employeeName"
                                    label="Nama"
                                    required
                                    outlined
                                  ></v-text-field>
                                </v-col>
                                <v-col cols="12" sm="6" md="4">
                                  <v-text-field
                                    v-model="editedItem.npp"
                                    label="NPP"
                                    required
                                    outlined
                                  ></v-text-field>
                                </v-col>
                                <v-col cols="12" sm="6" md="4">
                                  <v-select
                                    v-model="editedItem.jenjangJabatan"
                                    label="Jenjang Jabatan"
                                    required
                                    outlined
                                    :items="jenjab"
                                  ></v-select>
                                </v-col>
                                <v-col cols="12" sm="6" md="4">
                                  <v-text-field
                                    v-model="editedItem.phone"
                                    label="Phone Number"
                                    required
                                    outlined
                                  ></v-text-field>
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
                                  <v-select
                                    v-model="editedItem.tipe_resource"
                                    :items="resourceType"
                                    label="Resource Type"
                                    required
                                    outlined
                                  ></v-select>
                                </v-col>
                                <v-col cols="12" sm="6" md="4">
                                  <v-text-field
                                    v-model="editedItem.totalManhour"
                                    label="ManHour/Day"
                                    value="7"
                                    required
                                    outlined
                                  ></v-text-field>
                                </v-col>
                                <v-col cols="12" sm="6" md="4">
                                  <v-combobox
                                    v-model="editedItem.skills"
                                    label="Skills"
                                    :items="skills"
                                    multiple
                                    outlined
                                    small-chips
                                  ></v-combobox>
                                </v-col>
                                <v-col cols="12" sm="6" md="4">
                                  <v-select
                                    v-model="editedItem.kelompok"
                                    label="Kelompok"
                                    outlined
                                    :items="kelompok"
                                  ></v-select>
                                </v-col>
                                <v-col cols="12" sm="6" md="4">
                                  <v-select
                                    v-model="editedItem.nama_role"
                                    label="Role"
                                    outlined
                                    :items="role"
                                  ></v-select>
                                </v-col>
                                <v-col cols="12" sm="6" md="4">
                                  <v-menu
                                    v-model="menu2"
                                    :close-on-content-click="false"
                                    transition="scale-transition"
                                    offset-y
                                    max-width="290px"
                                    min-width="auto"
                                  >
                                    <template v-slot:activator="{ on, attrs }">
                                      <v-text-field
                                        v-model="dateActive"
                                        label="Activate Date"
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
                                <v-col cols="12" sm="6" md="4">
                                  <v-menu
                                    v-model="menu3"
                                    :close-on-content-click="false"
                                    transition="scale-transition"
                                    offset-y
                                    max-width="290px"
                                    min-width="auto"
                                  >
                                    <template v-slot:activator="{ on, attrs }">
                                      <v-text-field
                                        v-model="dateLast"
                                        label="Last Working Date"
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
                                <v-col cols="12" sm="6" md="4">
                                  <v-select
                                    v-model="editedItem.status"
                                    label="Status"
                                    :items="status"
                                    outlined
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
                          </v-card-actions>
                        </v-card>
                      </v-dialog>
                      <v-dialog v-model="dialogDelete" max-width="1100px">
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
                                            {{ editedItem.employeeName }}
                                          </h2></v-list-item-title
                                        >
                                        <v-list-item-subtitle
                                          ><h4>
                                            {{ editedItem.npp }}
                                          </h4></v-list-item-subtitle
                                        >
                                        <v-list-item-subtitle
                                          >Added
                                          {{
                                            editedItem.createdTime
                                              | str_limit(10)
                                          }}
                                        </v-list-item-subtitle>
                                      </v-list-item-content>
                                    </v-list-item>
                                  </v-col>
                                </v-row>
                                <v-row>
                                  <v-col cols="4" md="3">
                                    <v-list-item two-line>
                                      <v-list-item-content>
                                        <v-list-item-subtitle
                                          >Name</v-list-item-subtitle
                                        >
                                        <v-list-item-title>{{
                                          editedItem.employeeName
                                        }}</v-list-item-title>
                                      </v-list-item-content>
                                    </v-list-item>
                                    <v-list-item two-line>
                                      <v-list-item-content>
                                        <v-list-item-subtitle
                                          >NPP</v-list-item-subtitle
                                        >
                                        <v-list-item-title>{{
                                          editedItem.npp
                                        }}</v-list-item-title>
                                      </v-list-item-content>
                                    </v-list-item>
                                    <v-list-item two-line>
                                      <v-list-item-content>
                                        <v-list-item-subtitle
                                          >Email</v-list-item-subtitle
                                        >
                                        <v-list-item-title>{{
                                          editedItem.email
                                        }}</v-list-item-title>
                                      </v-list-item-content>
                                    </v-list-item>
                                    <v-list-item two-line>
                                      <v-list-item-content>
                                        <v-list-item-subtitle
                                          >Phone Number</v-list-item-subtitle
                                        >
                                        <v-list-item-title>{{
                                          editedItem.phone
                                        }}</v-list-item-title>
                                      </v-list-item-content>
                                    </v-list-item>
                                  </v-col>
                                  <v-divider vertical></v-divider>
                                  <v-col cols="4" md="3">
                                    <v-list-item two-line>
                                      <v-list-item-content>
                                        <v-list-item-subtitle
                                          >Active Date</v-list-item-subtitle
                                        >
                                        <v-list-item-title
                                          >{{
                                            editedItem.activeDate
                                              | str_limit(10)
                                          }}
                                        </v-list-item-title>
                                      </v-list-item-content>
                                    </v-list-item>
                                    <v-list-item two-line>
                                      <v-list-item-content>
                                        <v-list-item-subtitle
                                          >Kelompok</v-list-item-subtitle
                                        >
                                        <v-list-item-title>{{
                                          editedItem.kelompok
                                        }}</v-list-item-title>
                                      </v-list-item-content>
                                    </v-list-item>
                                    <v-list-item two-line>
                                      <v-list-item-content>
                                        <v-list-item-subtitle
                                          >Skillset</v-list-item-subtitle
                                        >
                                        <v-list-item-title
                                          v-html="editedItem.skill"
                                        ></v-list-item-title>
                                      </v-list-item-content>
                                    </v-list-item>
                                    <v-list-item two-line>
                                      <v-list-item-content>
                                        <v-list-item-subtitle
                                          >Manhour/Day</v-list-item-subtitle
                                        >
                                        <v-list-item-title>{{
                                          editedItem.totalManhour
                                        }}</v-list-item-title>
                                      </v-list-item-content>
                                    </v-list-item>
                                  </v-col>
                                  <v-col cols="4" md="3">
                                    <v-list-item two-line>
                                      <v-list-item-content>
                                        <v-list-item-subtitle
                                          >Last Working
                                          Date</v-list-item-subtitle
                                        >
                                        <v-list-item-title>{{
                                          editedItem.lastWorkDate
                                            | str_limit(10)
                                        }}</v-list-item-title>
                                      </v-list-item-content>
                                    </v-list-item>
                                    <v-list-item two-line>
                                      <v-list-item-content>
                                        <v-list-item-subtitle
                                          >Resource Type</v-list-item-subtitle
                                        >
                                        <v-list-item-title>{{
                                          editedItem.tipe_resource
                                        }}</v-list-item-title>
                                      </v-list-item-content>
                                    </v-list-item>
                                    <v-list-item two-line>
                                      <v-list-item-content>
                                        <v-list-item-subtitle>
                                          Jenjang Jabatan</v-list-item-subtitle
                                        >
                                        <v-list-item-title>{{
                                          editedItem.jenjangJabatan
                                        }}</v-list-item-title>
                                      </v-list-item-content>
                                    </v-list-item>
                                    <v-list-item two-line>
                                      <v-list-item-content>
                                        <v-list-item-subtitle
                                          >Total Manhour</v-list-item-subtitle
                                        >
                                        <v-list-item-title>{{
                                          editedItem.totalManhour
                                        }}</v-list-item-title>
                                      </v-list-item-content>
                                    </v-list-item>
                                  </v-col>
                                  <v-col cols="3" md="2">
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
                                    <v-list-item two-line>
                                      <v-list-item-content>
                                        <v-list-item-subtitle
                                          >Role</v-list-item-subtitle
                                        >
                                        <v-list-item-title>{{
                                          editedItem.nama_role
                                        }}</v-list-item-title>
                                      </v-list-item-content>
                                    </v-list-item>
                                    <v-list-item two-line>
                                      <v-list-item-content>
                                        <v-list-item-subtitle
                                          >Project
                                          Experience</v-list-item-subtitle
                                        >
                                        <v-list-item-title>
                                          {{ editedItem.projectExp }}
                                        </v-list-item-title>
                                      </v-list-item-content>
                                    </v-list-item>
                                    <v-list-item two-line>
                                      <v-list-item-content>
                                        <v-list-item-subtitle
                                          >Pricing</v-list-item-subtitle
                                        >
                                        <v-list-item-title>{{
                                          editedItem.price
                                        }}</v-list-item-title>
                                      </v-list-item-content>
                                    </v-list-item>
                                  </v-col>
                                </v-row>
                              </v-card>
                            </v-col>
                          </v-row>
                          <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn
                              color="blue darken-1"
                              text
                              @click="closeDelete"
                            >
                              Close
                            </v-btn>
                          </v-card-actions>
                        </v-card>
                      </v-dialog>
                    </v-toolbar>
                  </template>
                  <template v-slot:item.action="{ item }">
                    <v-btn dense color="primary" @click="deleteItem(item)"
                      >Detail</v-btn
                    >
                    <v-btn dense color="gray" @click="editItem(item)"
                      >Edit</v-btn
                    >
                  </template>
                  <template v-slot:[`item.status`]="{ item }">
                    <p v-if="item.status == 0" class="red--text">inactive</p>
                    <p v-else class="green--text">active</p>
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
  name: "resourceProfile",
  data: (vm) => ({
    resourceType: [],
    search: "",
    tab: null,
    menus: ["Resource", "Kelompok"],
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
    dialog: false,
    editedIndex: -1,
    dialogDetail: false,
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
      { text: "Action", value: "action" },
    ],
    status: [],
    skills: [],
    kelompok: [],
    tipe: [],
    role: [],
    jenjab: [],
    resources: [],
    editedItem: {
      employeeName: "",
      npp: "",
      email: "",
      phone: "",
      skills: [""],
      activeDate: "",
      lastWorkDate: "",
      totalManhour: 7,
      resourceType: 0,
      jenjabId: 0,
      kelompokId: 0,
      role: 0,
      projectExp: "",
      status: 0,

      jenjab: "",
      kelompok: "",
      tipe: "",
      skill: "",
      price: "",
      employeeId: 0,
      tempAD: "",
      tempLD: "",
      employeeSkills: [
        {
          empSkillId: 0,
          employeeId: 0,
          skillsetId: 0,
          skillset: {
            skillsetId: 0,
            skillset1: "string",
            status: 0,
            createdBy: "string",
            updatedBy: "string",
            createdTime: "2021-08-08T18:34:10.503Z",
            updateTime: "2021-08-08T18:34:10.503Z",
            employeeSkills: [null],
          },
        },
      ],
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
    detailItem: {
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
    },
    newEditedItem: {
      employeeName: "string",
      npp: "string",
      email: "string",
      phone: "string",
      activeDate: "2021-08-08T18:34:10.503Z",
      lastWorkDate: "2021-08-08T18:34:10.503Z",
      totalManhour: 0,
      resourceType: 0,
      jenjabId: 0,
      kelompokId: 0,
      role: 0,
      projectExp: "string",
      status: 0,
      createdBy: "string",
      updatedBy: "string",
      createdTime: "2021-08-08T18:34:10.503Z",
      updateTime: "2021-08-08T18:34:10.503Z",
      jenjab: {
        jenjabId: 0,
        jenjangJabatan: "string",
        cost: 0,
        status: 0,
        createdBy: "string",
        updatedBy: "string",
        createdTime: "2021-08-08T18:34:10.503Z",
        updateTime: "2021-08-08T18:34:10.503Z",
        resourceEmployees: [null],
      },
      kelompok: {
        kelompokId: 0,
        kelompok1: "string",
        status: 0,
        createdBy: "string",
        updatedBy: "string",
        createdTime: "2021-08-08T18:34:10.503Z",
        updateTime: "2021-08-08T18:34:10.503Z",
        resourceEmployees: [null],
        unitProfilings: [
          {
            unitId: 0,
            kelompokId: 0,
            totalEmployee: 0,
            totalManhour: 0,
            empSkillId: 0,
            employeeSkills: [null],
          },
        ],
      },
      employeeSkills: [
        {
          empSkillId: 0,
          employeeId: 0,
          skillsetId: 0,
          skillset: {
            skillsetId: 0,
            skillset1: "string",
            status: 0,
            createdBy: "string",
            updatedBy: "string",
            createdTime: "2021-08-08T18:34:10.503Z",
            updateTime: "2021-08-08T18:34:10.503Z",
            employeeSkills: [null],
          },
          unitProfilings: [
            {
              unitId: 0,
              kelompokId: 0,
              totalEmployee: 0,
              totalManhour: 0,
              empSkillId: 0,
              employeeSkills: [null],
            },
          ],
        },
      ],
    },
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
  }),
  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "Create New Resource" : "Edit Resource";
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
      this.editedItem.tempAD = response.employee.activeDate;
      this.editedItem.tempLD = response.employee.lastWorkDate;
    },
    async getData2() {
      let rt = { text: "", value: 0 };
      const response = await apiService
        .getLookup()
        .then((response) => {
          response.map((item) => {
            if (item.type == "ResourceType") {
              this.resourceType.push(item.name);
            }
            if (item.type == "Role") this.role.push(item.name);
            if (item.type == "Kelompok") this.kelompok.push(item.name);
            if (item.type == "Jenjab") this.jenjab.push(item.name);
            if (item.type == "StatusActive") this.status.push(item.name);
            if (item.type == "Skillset") this.skills.push(item.name);
          });
        })
        .catch((err) => err);
      response;
      console.log(rt);
    },
    initialize() {
      this.resources = [
        {
          nama: "Marvin Janitra Akmal",
          npp: "12341234",
          email: "marvinjanitra@gmail.com",
          phone: "081212786101",
          skills: ["Google", "Ms. Office"],
          jenjab: "AMGR",
          kelompok: "OFA",
          tipe: "FTE",
          role: "FrontEnd Developer",
          status: "Active",
          price: "Rp. 10.000.000",
        },
        {
          nama: "Sofwan",
          npp: "12341235",
          email: "sofwan@gmail.com",
          phone: "081287126382",
          skills: ["Google", "React", "Vue"],
          jenjab: "MGR",
          kelompok: "TQC",
          tipe: "FTE",
          role: "FrontEnd Developer",
          status: "Active",
          price: "Rp. 15.000.000",
        },
        {
          nama: "Jamal Udin",
          npp: "12341226",
          email: "jamalnaxgenkmotor@gmail.com",
          phone: "081256781234",
          skills: ["Riding", "Drag", "Stoopie"],
          jenjab: "OS",
          kelompok: "KVM",
          tipe: "XTC",
          role: "FrontEnd Infantry",
          status: "Active",
          price: "Rp. 2.000",
        },
        {
          nama: "Solehudin",
          npp: "12341214",
          email: "udinsolehbanget@gmail.com",
          phone: "081212344532",
          skills: ["Solat", "Ngaji", "Doa"],
          jenjab: "Staff",
          kelompok: "MJD",
          tipe: "MBT",
          role: "Marbot",
          status: "Inactive",
          price: "Rp. 2.500",
        },
      ];
    },
    createItem(item) {
      this.createItem = item;
      this.$router.push("/createNewResource");
    },
    editItem(item) {
      this.editedIndex = this.resources.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },
    detailItem(item) {
      this.editedIndex = this.resources.indexOf(item);
      this.detailItem = Object.assign({}, item);
      this.dialogDetail = true;
    },
    deleteItem(item) {
      this.editedIndex = this.resources.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialogDelete = true;
    },
    deleteItemConfirm() {
      this.resources.splice(this.editedIndex, 1);
      this.closeDelete();
    },
    close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },
    closeDetail() {
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
        .createResourceProfile(Data)
        .then((succ) => succ)
        .catch((err) => err);
      response;
      if (response) {
        if (response) this.getData();
      }
    },
    updateData(Data, id) {
      const response = apiService
        .updateResourceProfile(Data, id)
        .then((succ) => succ)
        .catch((err) => err);
      response;
      if (response) {
        if (response) this.getData();
      }
    },
    tempUpdate(roles, jenjabs, kelompoks, tipes) {
      const response = apiService
        .getLookup()
        .then((response) => {
          let role = response.find((el) => el.name == roles);
          let jenjab = response.find((el) => el.name == jenjabs);
          let kelompok = response.find((el) => el.name == kelompoks);
          let tipe = response.find((el) => el.name == tipes);
          role.map((item) => {
            this.newEditedItem.role = item.value;
          });
          jenjab.map((item) => {
            this.newEditedItem.jenjabId = item.value;
          });
          kelompok.map((item) => {
            this.newEditedItem.kelompokId = item.value;
            this.newEditedItem.kelompok.kelompokId = item.value;
          });
          tipe.map((item) => {
            this.newEditedItem.resourceType = item.value;
          });
        })
        .catch((err) => err);
      response;
    },

    save() {
      if (this.editedIndex > -1) {
        this.tempUpdate(
          this.editedItem.role,
          this.editedItem.jenjab,
          this.editedItem.kelompok,
          this.editedItem.tipe
        );
        this.newEditedItem.employeeName = this.editedItem.employeeName;
        this.newEditedItem.npp = this.editedItem.npp;
        this.newEditedItem.role = this.editedItem.role;
        this.newEditedItem.projectExp = this.editedItem.projectExp;
        this.newEditedItem.totalManhour = this.editedItem.totalManhour;
        this.newEditedItem.updatedBy = localStorage.getItem("name,");
        this.newEditedItem.activeDate = this.activeSend;
        this.newEditedItem.lastWorkDate = this.lastSend;

        this.editedItem.dateActive === this.nowdate
          ? (this.activeSend = this.editedItem.tempAD)
          : (this.activeSend = this.editedItem.activeDate);
        this.editedItem.lastWorkDate === this.nowdate
          ? (this.lastSend = this.editedItem.tempLD)
          : (this.lastSend = this.editedItem.lastWorkDate);
        //Object.assign(this.resources[this.editedIndex], this.editedItem);
        if (this.editedItem.status == "Active") {
          this.newEditedItem.status = 1;
        } else this.newEditedItem.status = 0;
        this.updateData(this.newEditedItem, this.editedItem.employeeId);
      } else {
        this.tempUpdate(
          this.editedItem.role,
          this.editedItem.jenjab,
          this.editedItem.kelompok,
          this.editedItem.tipe
        );
        this.newEditedItem.employeeName = this.editedItem.employeeName;
        this.newEditedItem.npp = this.editedItem.npp;
        this.newEditedItem.role = this.editedItem.role;
        this.newEditedItem.projectExp = this.editedItem.projectExp;
        this.newEditedItem.totalManhour = this.editedItem.totalManhour;
        this.newEditedItem.updatedBy = localStorage.getItem("name,");
        this.newEditedItem.activeDate = this.activeSend;
        this.newEditedItem.lastWorkDate = this.lastSend;

        this.editedItem.dateActive === this.nowdate
          ? (this.activeSend = this.editedItem.tempAD)
          : (this.activeSend = this.editedItem.activeDate);
        this.editedItem.lastWorkDate === this.nowdate
          ? (this.lastSend = this.editedItem.tempLD)
          : (this.lastSend = this.editedItem.lastWorkDate);
        if (this.editedItem.status == "Active") {
          this.newEditedItem.status = 1;
        } else this.newEditedItem.status = 0;
        this.resources.push(this.editedItem);
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

<style lang="scss" scoped></style>
