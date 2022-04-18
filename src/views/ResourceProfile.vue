<template>
  <v-row>
    <v-col>
      <v-data-table
        :headers="headers"
        :items="resources"
        :search="search"
        :sort-by.sync="employeeName"
        :sort-desc.sync="sortDesc"
        class="elevation-1"
      >
        <template v-slot:top>
          <v-toolbar flat>
            <v-toolbar-title>Resource Profile</v-toolbar-title>
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
            <div class="pa-1">
              <div class="text-center">
                <v-menu offset-y top :close-on-content-click="false">
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn
                      v-if="roleApp == 'Resource Manager'"
                      outlined
                      class="btn-imp dark-blue--text"
                      v-bind="attrs"
                      v-on="on"
                    >
                      Import Data
                    </v-btn>
                  </template>
                  <v-list>
                    <input type="file" @change="onChange" />
                    <xlsx-read :file="file">
                      <xlsx-json>
                        <template #default="{ collection }">
                          <div v-if="collection" class="text--center">
                            <v-btn
                              rounded
                              color="green"
                              class="white--text"
                              @click="upload(collection)"
                              >Upload</v-btn
                            >
                          </div>
                        </template>
                      </xlsx-json>
                    </xlsx-read>
                    <div class="pa-3">
                      <xlsx-workbook>
                        <xlsx-sheet
                          :collection="sheets"
                          filename="Report Resource Profile"
                        />
                        <xlsx-download filename="Report Resource Profile.xlsx">
                          <a href="">template</a>
                        </xlsx-download>
                      </xlsx-workbook>
                    </div>
                  </v-list>
                </v-menu>
              </div>
            </div>
            <div v-if="roleApp == 'Resource Manager'" class="pa-3">
              <xlsx-workbook>
                <xlsx-sheet
                  :collection="sheetss"
                  filename="Report Resource Profile"
                />
                <xlsx-download filename="Report Resource Profile.xlsx">
                  <v-btn outlined class="btn-imp"> Download Report </v-btn>
                </xlsx-download>
              </xlsx-workbook>
            </div>
            <v-btn
              v-if="roleApp == 'Resource Manager'"
              v-bind="size"
              class="white--text"
              @click="editItem(7, 7)"
              color="#004483"
            >
              + Create New Resource
            </v-btn>
            <v-dialog v-model="dialog" max-width="1000px">
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
                  <v-alert dense text type="success" v-model="snackbar">
                    <strong>Data sukses diupdate</strong>
                  </v-alert>
                  <v-alert dense text type="success" v-model="snackbar1">
                    <strong>Data sukses ditambah</strong>
                  </v-alert>
                  <v-alert
                    v-model="alert"
                    border="left"
                    close-text="Close Alert"
                    color="deep-purple accent-4"
                    dark
                    dismissible
                  >
                  </v-alert>
                  <v-form ref="form" v-model="valid">
                    <v-container>
                      <v-row>
                        <v-col cols="12" sm="6" md="4">
                          <v-text-field
                            v-model="editedItem.employeeName"
                            label="Nama*"
                            :rules="nameRules"
                            required
                            outlined
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6" md="4">
                          <v-autocomplete
                            v-model="editedItem.divisiId"
                            v-on:click="filter(editedItem.divisiId)"
                            label="Divisi*"
                            :rules="nameRules"
                            required
                            outlined
                            :items="divisi"
                          ></v-autocomplete>
                        </v-col>
                        <v-col cols="12" sm="6" md="4">
                          <v-autocomplete
                            @click="filter(editedItem.divisiId)"
                            v-model="editedItem.kelompokId"
                            label="Kelompok*"
                            :rules="nameRules"
                            outlined
                            :items="kelompok"
                          ></v-autocomplete>
                        </v-col>
                        <v-col cols="12" sm="6" md="4">
                          <v-autocomplete
                            v-model="editedItem.jenjabId"
                            label="Jenjang Jabatan*"
                            :rules="nameRules"
                            required
                            outlined
                            :items="jenjab"
                          ></v-autocomplete>
                        </v-col>

                        <v-col v-if="editedIndex > -1" cols="12" sm="6" md="4">
                          <v-text-field
                            v-model="editedItem.npp"
                            :rules="nameRules"
                            disabled
                            label="NPP*"
                            required
                            outlined
                          ></v-text-field>
                        </v-col>
                        <v-col v-else cols="12" sm="6" md="4">
                          <v-text-field
                            v-model="editedItem.npp"
                            :rules="nameRules"
                            label="NPP*"
                            required
                            outlined
                          ></v-text-field>
                        </v-col>

                        <v-col cols="12" sm="6" md="4">
                          <v-autocomplete
                            v-model="editedItem.tipe_resource"
                            :items="temptipe"
                            label="Resource Type*"
                            :rules="nameRules"
                            required
                            outlined
                          ></v-autocomplete>
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
                          <v-autocomplete
                            v-model="editedItem.nama_role"
                            label="Role*"
                            :rules="nameRules"
                            outlined
                            :items="tempr"
                          ></v-autocomplete>
                        </v-col>
                        <v-col
                          v-if="editedItem.tipe_resource == 'OS'"
                          cols="12"
                          sm="6"
                          md="4"
                        >
                          <v-autocomplete
                            v-model="editedItem.vendorId"
                            label="Vendor (OS only)*"
                            :rules="nameRules"
                            outlined
                            :items="listVendor"
                          ></v-autocomplete>
                        </v-col>
                        <v-col v-else cols="12" sm="6" md="4">
                          <v-autocomplete
                            disabled
                            v-model="editedItem.namaVendor"
                            label="Vendor (OS only)"
                            outlined
                            :items="tempr"
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
                            v-model="editedItem.totalManhour"
                            label="ManHour/Day"
                            value="7"
                            required
                            outlined
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6" md="4">
                          <v-combobox
                            v-model="s"
                            label="Skills*"
                            value="skill"
                            :items="tempskill"
                            :rules="nameRules"
                            multiple
                            outlined
                            small-chips
                          ></v-combobox>
                        </v-col>

                        <v-col cols="12" sm="6" md="4">
                          Active Date <br />
                          <date-picker
                            v-model="editedItem.activeDate"
                            valueType="format"
                            placeholder="Active Date"
                          ></date-picker>
                        </v-col>
                        <v-col cols="12" sm="6" md="4">
                          Last Working Date
                          <date-picker
                            placeholder="Last Working Date"
                            valueType="format"
                            v-model="editedItem.lastWorkDate"
                          ></date-picker>
                        </v-col>
                        <v-col cols="12" sm="6" md="4">
                          <v-select
                            v-model="editedItem.nama_status"
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
            <v-dialog v-model="dialogDelete" max-width="1100px">
              <v-card>
                <v-card color="#004483">
                  <v-card-title>
                    <span class="white--text">Detail Resource</span>
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
                                ><h1>
                                  {{ editedItem.employeeName }}
                                </h1></v-list-item-title
                              >
                              <v-list-item-subtitle
                                ><h2>
                                  {{ editedItem.npp }}
                                </h2></v-list-item-subtitle
                              >
                              <v-list-item-subtitle
                                >Added
                                {{ editedItem.createdTime | str_limit(10) }} by
                                {{ editedItem.createdBy }}
                              </v-list-item-subtitle>
                              <v-list-item-subtitle
                                >Updated
                                {{ editedItem.updateTime | str_limit(10) }} by
                                {{ editedItem.updatedBy }}
                              </v-list-item-subtitle>
                            </v-list-item-content>
                          </v-list-item>
                        </v-col>
                      </v-row>
                      <v-row>
                        <v-col cols="4" md="3">
                          <v-list-item two-line>
                            <v-list-item-content>
                              <v-list-item-subtitle>Name</v-list-item-subtitle>
                              <v-list-item-title>{{
                                editedItem.employeeName
                              }}</v-list-item-title>
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
                              <v-list-item-subtitle>Email</v-list-item-subtitle>
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
                                >{{ editedItem.activeDate | str_limit(10) }}
                              </v-list-item-title>
                            </v-list-item-content>
                          </v-list-item>
                          <v-list-item two-line>
                            <v-list-item-content>
                              <v-list-item-subtitle
                                >Divisi</v-list-item-subtitle
                              >
                              <v-list-item-title>{{
                                editedItem.nama_divisi
                              }}</v-list-item-title>
                            </v-list-item-content>
                          </v-list-item>
                          <v-list-item two-line>
                            <v-list-item-content>
                              <v-list-item-subtitle>Role</v-list-item-subtitle>
                              <v-list-item-title>{{
                                editedItem.nama_role
                              }}</v-list-item-title>
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
                          <v-list-item two-line>
                            <v-list-item-content>
                              <v-list-item-subtitle
                                >Project Experience</v-list-item-subtitle
                              >
                              <v-list-item-title>
                                {{ editedItem.projectExp }}
                              </v-list-item-title>
                            </v-list-item-content>
                          </v-list-item>
                        </v-col>
                        <v-col cols="4" md="3">
                          <v-list-item two-line>
                            <v-list-item-content>
                              <v-list-item-subtitle
                                >Last Working Date</v-list-item-subtitle
                              >
                              <v-list-item-title>{{
                                editedItem.lastWorkDate | str_limit(10)
                              }}</v-list-item-title>
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
                                >Pricing</v-list-item-subtitle
                              >
                              <v-list-item-title>{{
                                editedItem.cost + ",-"
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
                              <v-list-item-title>
                                <p
                                  v-if="editedItem.nama_status == 'Inactive'"
                                  class="red--text"
                                >
                                  Inactive
                                </p>
                                <p v-else class="green--text">Active</p>
                              </v-list-item-title>
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
                          <v-list-item
                            v-if="editedItem.tipe_resource == 'OS'"
                            two-line
                          >
                            <v-list-item-content>
                              <v-list-item-subtitle
                                >Vendor</v-list-item-subtitle
                              >
                              <v-list-item-title>{{
                                editedItem.vendorName
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
        <template v-slot:[`item.action`]="{ item }">
          <button class="sa-2" @click="deleteItem(item)">Detail</button>
          <button v-if="roleApp == 'Resource Manager'" @click="editItem(item)">
            Edit
          </button>
        </template>
        <template v-slot:[`item.status`]="{ item }">
          <p v-if="item.status == 0" class="red--text">Inactive</p>
          <p v-else class="green--text">Active</p>
        </template>
        <template v-slot:[`item.updateTime`]="{ item }">
          {{ item.updateTime | str_limit(10) }}
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
import DatePicker from "vue2-datepicker";
import "vue2-datepicker/index.css";
import XlsxRead from "../components/XlsxRead";
import XlsxJson from "../components/XlsxJson";
import XlsxWorkbook from "../components/XlsxWorkbook";
import XlsxSheet from "../components/XlsxSheet";
import XlsxDownload from "../components/XlsxDownload";
import { Axios } from "../Axios";
const apiService = new Axios();
export default {
  name: "resourceProfile",
  components: {
    XlsxRead,
    XlsxJson,
    XlsxWorkbook,
    XlsxSheet,
    XlsxDownload,
    DatePicker,
  },
  data: (vm) => ({
    sheetName: "Data",
    fileRecords: "",
    file: null,
    alert: false,
    employeeName: "employeeName",
    sortDesc: false,
    dates: null,
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
    dialogDelete: false,
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
      { text: "Date Modified", value: "updateTime" },
      { text: "Action", value: "action", sortable: false },
    ],
    status: [],
    skills: [],
    skillid: [],
    divisi: [],
    tempd: [],
    divisiid: [],
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
    temp: {},
    s: [],
    editedItem: {
      employeeName: "aaa",
      npp: "",
      email: "",
      phone: "",
      skills: [],
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
    defaultItem: {},
    newEditedItem: {
      employeeName: "string",
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
      listSkill: [],
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
    no: [],
    vendor: {},
    listVendor: [],
    tempv: [],
    vendorid: [],
    listnpp: [],
    npp_r: {},
    ceknpp: false,
    skillni: false,
    sheets: [
      {
        employeeName: "",
        npp: "",
        email: "",
        phone: "",
        activeDate: "",
        lastWorkDate: "",
        totalManhour: "",
        resourceType: "",
        vendor: "",
        jenjab: "",
        divisi: "",
        kelompok: "",
        role: "",
        projectExp: "",
        status: "",
      },
    ],
    sheetss: [],
    r_nama: [],
    r_npp: [],
    r_email: [],
    r_nohp: [],
    r_adate: [],
    r_ldate: [],
    r_unit: [],
    r_tipe: [],
    r_role: [],
    r_jenjab: [],
    r_manhour: [],
    r_cost: [],
    r_skill: [],
    keldiv: {},
    tempkel: [],
    tempkelid: [],
    fkel: [],
    sumkd: 0,
    isLoading: false,
    objkel: {},
    newdiv: 0,
    roleApp: localStorage.getItem("role"),
  }),
  computed: {
    size() {
      const size = { xs: "x-small" }[this.$vuetify.breakpoint.name];
      return size ? { [size]: true } : {};
    },
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
    this.getVendor();
    this.getKelompok();
    this.getjenjab();
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
      this.newdiv = div;
      if (this.sumkd > 0) {
        this.kelompok = [];
        this.tempkel = [];
        this.tempkelid = [];
        this.sumkd = 0;
      } else {
        this.keldiv.map((item) => {
          this.tempkel.push(item.kelompokName);
          this.tempkelid.push(item.kelompokId);
        });
        this.sumkd = 1;
        for (var m = 0; m < this.tempkel.length; m++) {
          //this.tempskill.push(obj2)
          let oo = {};
          oo.text = this.tempkel[m];
          oo.value = this.tempkelid[m];
          this.kelompok.push(oo);
        }
      }
    },
    onChange(event) {
      this.file = event.target.files ? event.target.files[0] : null;
    },
    async getVendor() {
      const response = await apiService
        .getVendor()
        .then((response) => {
          this.vendor = response.data;
        })
        .catch((err) => err);
      response;
      this.vendor.map((item) => {
        this.tempv.push(item.vendorName);
        this.vendorid.push(item.manmonthId);
      });
      for (var k = 0; k < this.tempv.length; k++) {
        //this.tempskill.push(obj2)
        let oo = {};
        oo.text = this.tempv[k];
        oo.value = this.vendorid[k];
        this.listVendor.push(oo);
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
    async getjenjab() {
      const response = await apiService
        .getJenjab()
        .then((response) => {
          response.map((item) => {
            this.tempj.push(item.jenjangJabatan);
            this.jenjabid.push(item.jenjabId);
          });
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
    },
    async getData() {
      const response = await apiService
        .getResourceProfile()
        .then((response) => {
          this.resources = response.employee;
        })
        .catch((err) => err);
      response;
      this.resources.map((item) => {
        this.r_nama.push(item.employeeName);
        this.r_npp.push(item.npp);
        this.r_email.push(item.email);
        this.r_nohp.push(item.phone);
        this.r_adate.push(item.activeDate);
        this.r_ldate.push(item.lastWorkDate);
        this.r_unit.push(item.kelompok);
        this.r_tipe.push(item.tipe_resource);
        this.r_role.push(item.nama_role);
        this.r_jenjab.push(item.jenjangJabatan);
        this.r_manhour.push(item.totalManhour);
        this.r_cost.push(item.cost);
        this.r_skill.push(item.skill);
      });
      for (var k = 0; k < this.r_nama.length; k++) {
        //this.tempskill.push(obj2)
        let oo = {};
        oo.Nama = this.r_nama[k];
        oo.NPP = this.r_npp[k];
        oo.Email = this.r_email[k];
        oo.NoHP = this.r_nohp[k];
        let ad = "";
        if (this.r_adate[k] != null) ad = this.r_adate[k].slice(0, 10);
        oo.ActiveDate = ad;
        let ld = "";
        if (this.r_ldate[k] != null) {
          ld = this.r_ldate[k].slice(0, 10);
        }
        oo.LastDate = ld;
        oo.Unit = this.r_unit[k];
        oo.TipeResource = this.r_tipe[k];
        // ('Nama AS').oo = this.r_nama[k];
        var regex = /<br\s*[/]?>/gi;
        if (!this.r_skill[k]) {
          this.r_skill[k] = "";
        }
        const skill = this.r_skill[k].replace(regex, " ");
        oo.Role = this.r_role[k];
        oo.Skillset = skill;
        oo.JenjangJabatan = this.r_jenjab[k];
        oo.TotalManhour = this.r_manhour[k];
        const format = this.r_cost[k].toString().split("").reverse().join("");
        const convert = format.match(/\d{1,3}/g);
        const price = "Rp " + convert.join(".").split("").reverse().join("");
        oo.Pricing = price;
        this.sheetss.push(oo);
        // this.sheets.data.push(oo);
      }
    },
    async getData2() {
      //let rt = { text: "", value: 0 };
      //const obj = {}
      const response = await apiService
        .getLookup()
        .then((response) => {
          response.map((item) => {
            if (item.type == "ResourceType") {
              this.temptipe.push(item.name);
              this.tipeid.push(item.value);
            }
            if (item.type == "Role") {
              this.tempr.push(item.name);
              this.roleid.push(item.value);
            }
            if (item.type == "Jenjab") {
              this.tempj.push(item.name);
              this.jenjabid.push(item.value);
            }
            if (item.type == "StatusActive") this.status.push(item.name);
            if (item.type == "Skillset") {
              this.skills.push(item.name);
              this.skillid.push(item.value);
            }
            if (item.type == "Divisi") {
              this.tempd.push(item.name);
              this.divisiid.push(item.value);
            }
          });
        })
        .catch((err) => err);
      response;
      for (var k = 0; k < this.skills.length; k++) {
        let oo = {};
        oo.text = this.skills[k];
        oo.value = this.skillid[k];
        this.tempskill.push(oo);
      }
      for (var n = 0; n < this.tempr.length; n++) {
        let oo = {};
        oo.text = this.tempr[n];
        oo.value = this.roleid[n];
        this.role.push(oo);
      }
      for (var o = 0; o < this.temptipe.length; o++) {
        let oo = {};
        oo.text = this.temptipe[o];
        oo.value = this.tipeid[o];
        this.resourceType.push(oo);
      }
      for (var p = 0; p < this.tempd.length; p++) {
        let oo = {};
        oo.text = this.tempd[p];
        oo.value = this.divisiid[p];
        this.divisi.push(oo);
      }
    },
    initialize() {
      this.resources = [];
    },
    createItem(item) {
      this.createItem = item;
      this.$router.push("/createNewResource");
    },
    upload(a) {
      let oo = {};
      oo.skillId = 1;
      this.newEditedItem.listSkill.push(oo);
      for (var i = 0; i < a.length; i++) {
        this.save(a[i]);
      }
    },
    editItem(item, t) {
      this.editedIndex = this.resources.indexOf(item);
      this.editedItem = Object.assign({}, item);
      if (t) this.editedItem.totalManhour = t;
      this.dialog = true;
      this.getData();
      const a = [];
      item.listSkill.map((item) => {
        a.push(item.skillset);
        let oo = {};
        oo.text = item.skillset;
        oo.value = item.skillset_id;
        // this.s.push(item.skillset)
        if (item.skillset) {
          this.s.push(oo);
        }
      });
      this.editedItem.skills = a;
    },
    deleteItem(item) {
      this.editedIndex = this.resources.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialogDelete = true;
      const format = item.cost.toString().split("").reverse().join("");
      const convert = format.match(/\d{1,3}/g);
      this.editedItem.cost =
        "Rp " + convert.join(".").split("").reverse().join("");
    },
    deleteItemConfirm() {
      this.resources.splice(this.editedIndex, 1);
      this.closeDelete();
    },
    close() {
      this.s = [];
      this.dialog = false;
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
        //this.editedIndex = -1;
        //this.$router.go();
      });
    },
    closeDelete() {
      this.s = [];
      this.dialogDelete = false;
      this.$refs.form.resetValidation();
      //this.editedItem = null
      this.editedIndex = -1;
      this.editedItem = Object.assign({}, this.defaultItem);
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
        // this.$router.go();
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
        text: "Resource successfully changed.",
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
        text: "Resource fail changed.",
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
        .createResourceProfile(Data)
        .then((succ) => {
          // alert(succ);
          //this.snackbar1 = true;
          this.getData();
          //this.$router.go();
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
        .updateResourceProfile(Data, id)
        .then((succ) => {
          // alert(succ);
          //this.snackbar = true;
          this.getData();
          // this.$router.go();
          this.showAlert();
          succ;
        })
        .catch(() => this.showAlertFail());
      response;
      // this.snackbar = true;
      this.s = [];
      if (response.status === 200) alert("Sukses");
      if (response.status === 200) {
        alert("sukses");
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
            //this.newEditedItem.kelompok.kelompokId = item.value;
          });
          tipe.map((item) => {
            this.newEditedItem.resourceType = item.value;
          });
        })
        .catch((err) => err);
      response;
    },
    getSkillId(a) {
      let b = 0;
      if (a && b < 1) {
        let oo = {};
        oo.skillId = a;
        this.newEditedItem.listSkill.push(oo);
        b++;
      } else {
        var id = [];
        for (var i = 0; i < this.skills.length; i++) {
          if (this.s[i] == this.tempskill[i].text) {
            id.push(this.tempskill[i].value);
          }
        }
        for (var j = 0; j < this.s.length; j++) {
          let oo = {};
          oo.skillId = this.s[j].value;
          if (this.s[j].value) this.newEditedItem.listSkill.push(oo);
        }
      }
    },
    getjenjabId(a) {
      if (a) {
        for (var j = 0; j < this.tempj.length; j++) {
          if (a == this.jenjab[j].text) {
            this.newEditedItem.jenjabId = this.jenjab[j].value;
          }
        }
      } else {
        for (var i = 0; i < this.tempj.length; i++) {
          if (this.editedItem.jenjangJabatan == this.jenjab[i].text) {
            this.newEditedItem.jenjabId = this.jenjab[i].value;
          }
        }
      }
    },
    getroleId(a) {
      if (a) {
        for (var j = 0; j < this.tempr.length; j++) {
          if (a == this.role[j].text) {
            this.newEditedItem.role = this.role[j].value;
          }
        }
      } else {
        for (var i = 0; i < this.tempr.length; i++) {
          if (this.editedItem.nama_role == this.role[i].text) {
            this.newEditedItem.role = this.role[i].value;
          }
        }
      }
    },
    getkelompokId(a) {
      if (a) {
        for (var j = 0; j < this.tempk.length; j++) {
          if (a == this.kelompok[j].text) {
            this.newEditedItem.kelompokId = this.kelompok[j].value;
          }
        }
      } else {
        for (var i = 0; i < this.tempk.length; i++) {
          if (this.editedItem.kelompok == this.kelompok[i].text) {
            this.newEditedItem.kelompokId = this.kelompok[i].value;
          }
        }
      }
    },
    gettipeId(a) {
      if (a) {
        for (var j = 0; j < this.temptipe.length; j++) {
          if (a == this.resourceType[j].text) {
            this.newEditedItem.resourceType = this.resourceType[j].value;
          }
        }
      } else {
        for (var i = 0; i < this.temptipe.length; i++) {
          if (this.editedItem.tipe_resource == this.resourceType[i].text) {
            this.newEditedItem.resourceType = this.resourceType[i].value;
          }
        }
      }
    },
    getdivisiId(a) {
      for (var j = 0; j < this.tempd.length; j++) {
        if (a == this.divisi[j].text) {
          this.newEditedItem.divisiId = this.divisi[j].value;
        }
      }
    },
    getvendorId(a) {
      for (var i = 0; i < this.tempv.length; i++) {
        if (a == this.listVendor[i].text) {
          this.newEditedItem.vendorId = this.listVendor[i].value;
        }
      }
    },
    save(a) {
      if (this.editedIndex > -1) {
        this.getSkillId();
        this.getroleId();
        this.gettipeId();
        this.newEditedItem.jenjabId = this.editedItem.jenjabId;
        this.newEditedItem.kelompokId = this.editedItem.kelompokId;
        this.newEditedItem.divisiId = this.editedItem.divisiId;
        this.editedItem.tipe_resource === "OS"
          ? (this.newEditedItem.vendorId = this.editedItem.vendorId)
          : (this.newEditedItem.vendorid = 6);
        this.newEditedItem.employeeName = this.editedItem.employeeName;
        this.newEditedItem.npp = this.editedItem.npp;
        this.newEditedItem.email = this.editedItem.email;
        this.newEditedItem.phone = this.editedItem.phone;
        this.newEditedItem.projectExp = this.editedItem.projectExp;
        this.newEditedItem.totalManhour = this.editedItem.totalManhour;
        this.newEditedItem.updatedBy = localStorage.getItem("name,");
        this.newEditedItem.activeDate = this.activeSend;
        this.newEditedItem.lastWorkDate = this.lastSend;
        this.newEditedItem.updateTime = this.nowdate;
        //Object.assign(this.resources[this.editedIndex], this.editedItem);
        this.newEditedItem.activeDate = this.editedItem.activeDate;
        this.newEditedItem.lastWorkDate = this.editedItem.lastWorkDate;
        if (this.editedItem.nama_status == "Active") {
          this.newEditedItem.status = 1;
          this.editedItem.status = 1;
        } else this.newEditedItem.status = 0;
        this.updateData(this.newEditedItem, this.editedItem.employeeId);
      } else {
        if (a.employeeName) {
          if (a.vendor) {
            this.getvendorId(a.vendor);
          } else {
            this.newEditedItem.vendorid = null;
          }
          this.newEditedItem.employeeName = a.employeeName;
          this.newEditedItem.npp = a.npp;
          this.newEditedItem.email = a.email;
          this.newEditedItem.phone = a.phone;
          this.newEditedItem.projectExp = a.projectExp;
          this.newEditedItem.totalManhour = a.totalManhour;
          this.newEditedItem.createdBy = localStorage.getItem("name,");
          this.newEditedItem.activeDate = this.activeSend;
          this.newEditedItem.lastWorkDate = this.lastSend;
          this.newEditedItem.createdTime = this.nowdate;
          this.newEditedItem.updateTime = this.nowdate;
          this.newEditedItem.activeDate = a.activeDate;
          this.newEditedItem.lastWorkDate = a.lastWorkDate;
          if (a.status == "Active") {
            this.newEditedItem.status = 1;
          } else this.newEditedItem.status = 0;
          this.getdivisiId(a.divisi);
          this.getjenjabId(a.jenjab);
          this.getroleId(a.role);
          this.getkelompokId(a.kelompok);
          this.gettipeId(a.resourceType);
        } else {
          this.newEditedItem.kelompokId = this.editedItem.kelompok;
          this.newEditedItem.divisiId = this.editedItem.divisiId;
          this.editedItem.tipe_resource === "OS"
            ? (this.newEditedItem.vendorId = this.editedItem.vendorId)
            : (this.newEditedItem.vendorid = null);
          this.newEditedItem.role = this.editedItem.role;
          this.newEditedItem.jenjabId = this.editedItem.jenjabId;
          this.newEditedItem.kelompokId = this.editedItem.kelompokId;
          this.newEditedItem.resourceType = this.editedItem.resourceType;
          this.newEditedItem.employeeName = this.editedItem.employeeName;
          this.newEditedItem.npp = this.editedItem.npp;
          this.newEditedItem.email = this.editedItem.email;
          this.newEditedItem.phone = this.editedItem.phone;
          this.newEditedItem.projectExp = this.editedItem.projectExp;
          this.newEditedItem.totalManhour = this.editedItem.totalManhour;
          this.newEditedItem.createdBy = localStorage.getItem("name,");
          this.newEditedItem.activeDate = this.activeSend;
          this.newEditedItem.lastWorkDate = this.lastSend;
          this.newEditedItem.createdTime = this.nowdate;
          this.newEditedItem.updateTime = this.nowdate;
          this.newEditedItem.activeDate = this.editedItem.activeDate;
          this.newEditedItem.lastWorkDate = this.editedItem.lastWorkDate;
          if (this.editedItem.nama_status == "Active") {
            this.newEditedItem.status = 1;
          } else this.newEditedItem.status = 0;
          //this.resources.push(this.editedItem);
          this.getSkillId();
          // this.getjenjabId();
          this.getroleId();
          this.gettipeId();
        }
        console.log("iniitem" + this.newEditedItem);
        if (this.newEditedItem.npp) this.createData(this.newEditedItem);
        else alert("Invalid Input");
      }
      if (!a) {
        this.close();
        this.closeDelete();
      }
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
.btn-imp.v-btn--outlined {
  border: thin solid #004483;
}
button {
  padding: 5px 10px;
  font-size: inherit;
  background: transparent;
  border: 2px solid #ccc;
  transition: 0.4s;
}
</style>
