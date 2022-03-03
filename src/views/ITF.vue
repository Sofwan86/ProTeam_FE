<template>
<div>
<v-container>
<v-row>
    <v-col>
        <v-card class="pa-2" offset-sm="3" outlined tile>
        <h1>IT Formation</h1>
  <v-row>
    <v-col>
      <v-data-table
        :headers="headers"
        :items="resources"
        :search="search"
        :sort-by.sync="updateTime"
        :sort-desc.sync="sortDesc"
        class="elevation-1"
      >
        <template v-slot:top>
          <v-toolbar flat>
            <v-toolbar-title>GAP IT Formation</v-toolbar-title>
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
            <v-btn
              v-bind="size"
              class="white--text"
              @click="editItem(7, 7)"
              color="#004483"
            >
              + Create New Data
            </v-btn>
            <v-dialog v-model="dialog" max-width="1000px">
              <!-- <template v-slot:activator="{ on, attrs }">
                <v-btn color="#004483" dark v-bind="attrs" v-on="on">
                  + Create New Resource
                </v-btn>
              </template> -->
              <v-card>
                <v-card color="#004483">
                  <v-card-title class="white--text">
                    <span class="text-h5"
                      ><h3>{{ formTitle }}</h3></span
                    >
                    <v-spacer></v-spacer>

                    <v-icon @click="close" color="white">mdi-close</v-icon>
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
                    Aenean imperdiet. Quisque id odio. Cras dapibus.
                    Pellentesque ut neque. Cras dapibus. Vivamus consectetuer
                    hendrerit lacus. Sed mollis, eros et ultrices tempus, mauris
                    ipsum aliquam libero, non adipiscing dolor urna a orci. Sed
                    mollis, eros et ultrices tempus, mauris ipsum aliquam
                    libero, non adipiscing dolor urna a orci. Curabitur blandit
                    mollis lacus. Curabitur ligula sapien, tincidunt non,
                    euismod vitae, posuere imperdiet, leo.
                  </v-alert>
                  <v-form ref="form" v-model="valid">
                    <v-container>
                      <v-row>
                        <v-col v-if="editedIndex > -1" cols="12" sm="6" md="4">
                          Active Date
                          <v-btn outlined color="grey" width="900" height="35">
                            <VueDatePicker
                              placeholder="Active date"
                              fullscreen-mobile
                              v-model="editedItem.activeDate"
                              :rules="nameRules"
                            />
                          </v-btn>
                        </v-col>
                        <v-col v-else cols="12" sm="6" md="4">
                          <v-btn outlined color="grey" width="900" height="55">
                            <VueDatePicker
                              placeholder="Active date"
                              fullscreen-mobile
                              v-model="editedItem.activeDate"
                            />
                          </v-btn>
                        </v-col>
                        <v-col v-if="editedIndex > -1" cols="12" sm="6" md="4">
                          Last Working Date
                          <v-btn outlined color="grey" width="900" height="35">
                            <VueDatePicker
                              placeholder="Last working date"
                              fullscreen-mobile
                              v-model="editedItem.lastWorkDate"
                              :rules="nameRules"
                            />
                          </v-btn>
                        </v-col>
                        <v-col v-else cols="12" sm="6" md="4">
                          <v-btn outlined color="grey" width="900" height="55">
                            <VueDatePicker
                              placeholder="Last working date"
                              fullscreen-mobile
                              v-model="editedItem.lastWorkDate"
                            />
                          </v-btn>
                        </v-col>
                      </v-row>
                      <v-row>
                        <v-col cols="12" sm="6" md="4">
                          <v-autocomplete
                            v-model="editedItem.divisiId"
                            label="Divisi*"
                            :rules="nameRules"
                            required
                            outlined
                            :items="divisi"
                          ></v-autocomplete>
                        </v-col>
                      </v-row>
                      <v-row>
                        <v-col cols="12" sm="6" md="4">
                          <v-autocomplete
                            v-model="editedItem.kelompok"
                            label="Kelompok*"
                            :rules="nameRules"
                            outlined
                            :items="tempk"
                          ></v-autocomplete>
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
                                <!-- {{
                                          editedItem.nama_status
                                        }} -->
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
          <v-btn v-bind="size" @click="deleteItem(item)">Detail</v-btn>
          <v-btn v-bind="size" class="mx-3" @click="editItem(item)">Edit</v-btn>
        </template>
        <template v-slot:[`item.status`]="{ item }">
          <p v-if="item.status == 0" class="red--text">Inactive</p>
          <p v-else class="green--text">Active</p>
        </template>
        <template v-slot:[`item.updateTime`]="{ item }">
          <h4>{{ item.updateTime | str_limit(10) }}</h4>
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
</v-container>
</div>
</template>

<script>
export default {
  name: "ITF",
  data: (vm) => ({
    fileRecords: "",
    file: null,
    alert: false,
    updateTime: "updateTime",
    sortDesc: true,
    dates: null,
    snackbar1: false,
    snackbar: false,
    text: `Hello, I'm a snackbar`,
    valid: false,
    nameRules: [(v) => !!v || "Required"],
    resourceType: [],
    search: "",
    tab: null,
    dialog: false,
    editedIndex: -1,
    dialogDetail: false,
    dialogDelete: false,
    headers: [
      {
        text: "Divisi",
        align: "start",
        sortable: true,
        value: "divisi",
      },
      { text: "Kelompok", value: "kelompok" },
      { text: "Formasi", value: "formasi" },
      { text: "Eksisting", value: "eksisting" },
      { text: "GAP", value: "gap" },
      { text: "Action", value: "action", sortable: false },
    ],
    tempd: [],
    divisi: [],
    divisiid: [],
    obj: {},
    tempk: [],
    tempr: [],
    temptipe: [],
    tempj: [],
    tempskill: [],
    kelompok: [],
    kelompokid: [],
    formasi: [],
    eksisting: [],
    gap: [],
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
    npp_r:{},
    ceknpp: false,
    skillni:false,
    sheets: [{ name: "Report", data: [{asdfs:1}] }],
    sheetss:[],
    r_nama:[],
    r_npp:[],
    r_email:[],
    r_nohp:[],
    r_adate:[],
    r_ldate:[],
    r_unit:[],
    r_tipe:[],
    r_role:[],
    r_jenjab:[],
    r_manhour:[],
    r_cost:[],
    r_skill:[]
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
  },
  methods: {
    onChange(event) {
      this.file = event.target.files ? event.target.files[0] : null;
    },
    // async getVendor() {
    //   const response = await apiService
    //     .getVendor()
    //     .then((response) => {
    //       this.vendor = response.data;
    //     })
    //     .catch((err) => err);
    //   response;
    //   this.vendor.map((item) => {
    //     this.tempv.push(item.vendorName);
    //     this.vendorid.push(item.manmonthId);
    //   });
    //   for (var k = 0; k < this.tempv.length; k++) {
    //     //this.tempskill.push(obj2)
    //     let oo = {};
    //     oo.text = this.tempv[k];
    //     oo.value = this.vendorid[k];
    //     this.listVendor.push(oo);
    //   }
    // },
    // async getData() {
    //   const response = await apiService
    //     .getResourceProfile()
    //     .then((response) => {
    //       this.resources = response.employee;
    //     })
    //     .catch((err) => err);
    //   response;
    //   this.resources.map((item) => {
    //     this.r_nama.push(item.employeeName);
    //     this.r_npp.push(item.npp);
    //     this.r_email.push(item.email);
    //     this.r_nohp.push(item.phone);
    //     this.r_adate.push(item.activeDate);
    //     this.r_ldate.push(item.lastWorkDate);
    //     this.r_unit.push(item.kelompok);
    //     this.r_tipe.push(item.tipe_resource);
    //     this.r_role.push(item.nama_role);
    //     this.r_jenjab.push(item.jenjangJabatan);
    //     this.r_manhour.push(item.totalManhour);
    //     this.r_cost.push(item.cost);
    //     this.r_skill.push(item.skill);
        
    //   });
    //   for (var k = 0; k < this.r_nama.length; k++) {
    //     //this.tempskill.push(obj2)
    //     let oo = {};
    //     oo.Nama = this.r_nama[k];
    //     oo.NPP = this.r_npp[k];
    //     oo.Email = this.r_email[k];
    //     oo.NoHP = this.r_nohp[k];
    //     const ad = this.r_adate[k].slice(0,10)
    //     oo.ActiveDate = ad;
    //     console.log(ad)
    //     const ld = this.r_ldate[k].slice(0,10)
    //     oo.LastDate = ld;
    //     oo.Unit = this.r_unit[k];
    //     oo.TipeResource = this.r_tipe[k];
    //     // ('Nama AS').oo = this.r_nama[k];
    //     var regex = /<br\s*[/]?>/gi;
    //     const skill = this.r_skill[k].replace(regex,' ')
    //     oo.Role = this.r_role[k];
    //     oo.Skillset = skill
    //     oo.JenjangJabatan = this.r_jenjab[k];
    //     oo.TotalManhour = this.r_manhour[k];
    //     const format = this.r_cost[k].toString().split("").reverse().join("");
    //   const convert = format.match(/\d{1,3}/g);
    //   const price =
    //     "Rp " + convert.join(".").split("").reverse().join("");
    //     oo.Pricing = price;
    //     console.log(skill)
    //     this.sheetss.push(oo)
    //     // this.sheets.data.push(oo);
    //   } 
    // },
    // async getData2() {
      //let rt = { text: "", value: 0 };
      //const obj = {}
    //   const response = await apiService
    //     .getLookup()
    //     .then((response) => {
    //       response.map((item) => {
    //         if (item.type == "ResourceType") {
    //           this.temptipe.push(item.name);
    //           this.tipeid.push(item.value);
    //         }
    //         if (item.type == "Role") {
    //           this.tempr.push(item.name);
    //           this.roleid.push(item.value);
    //         }
    //         if (item.type == "Kelompok") {
    //           this.tempk.push(item.name);
    //           this.kelompokid.push(item.value);
    //         }
    //         if (item.type == "Jenjab") {
    //           this.tempj.push(item.name);
    //           this.jenjabid.push(item.value);
    //         }
    //         if (item.type == "StatusActive") this.status.push(item.name);
    //         if (item.type == "Skillset") {
    //           this.skills.push(item.name);
    //           this.skillid.push(item.value);
    //         }
    //         if (item.type == "Divisi") {
    //           this.tempd.push(item.name);
    //           this.divisiid.push(item.value);
    //         }
    //       });
    //     })
    //     .catch((err) => err);
    //   response;
    //   for (var k = 0; k < this.skills.length; k++) {
    //     //this.tempskill.push(obj2)
    //     let oo = {};
    //     oo.text = this.skills[k];
    //     oo.value = this.skillid[k];
    //     this.tempskill.push(oo);
    //   }
    //   for (var l = 0; l < this.tempj.length; l++) {
    //     //this.tempskill.push(obj2)
    //     let oo = {};
    //     oo.text = this.tempj[l];
    //     oo.value = this.jenjabid[l];
    //     this.jenjab.push(oo);
    //   }
    //   for (var m = 0; m < this.tempk.length; m++) {
    //     //this.tempskill.push(obj2)
    //     let oo = {};
    //     oo.text = this.tempk[m];
    //     oo.value = this.kelompokid[m];
    //     this.kelompok.push(oo);
    //   }
    //   for (var n = 0; n < this.tempr.length; n++) {
    //     let oo = {};
    //     oo.text = this.tempr[n];
    //     oo.value = this.roleid[n];
    //     this.role.push(oo);
    //   }
    //   for (var o = 0; o < this.temptipe.length; o++) {
    //     let oo = {};
    //     oo.text = this.temptipe[o];
    //     oo.value = this.tipeid[o];
    //     this.resourceType.push(oo);
    //   }
    //   for (var p = 0; p < this.tempd.length; p++) {
    //     let oo = {};
    //     oo.text = this.tempd[p];
    //     oo.value = this.divisiid[p];
    //     this.divisi.push(oo);
    //   }
    // },
    initialize() {
      this.resources = [];
    },
    createItem(item) {
      this.createItem = item;
      this.$router.push("/createNewResource");
      console.log("fds");
    },
    upload(a) {
      console.log(a);
      for (var i = 0; i < a.length; i++) {
        this.save(a[i]);
      }
    },
    editItem(item, t) {
      console.log("fds");
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
      console.log("dfs");
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
      this.$refs.form.reset();
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        //this.editedIndex = -1;
        //this.$router.go();
      });
    },
    closeDelete() {
      this.s = [];
      this.dialogDelete = false;
      this.$refs.form.reset();
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
    // createData(Data) {
    //   const response = apiService
    //     .createResourceProfile(Data)
    //     .then((succ) => {
    //       // alert(succ);
    //       this.snackbar1 = true;
    //       this.getData();
    //       //this.$router.go();
    //       this.showAlert();
    //       succ;
    //     })
    //     .catch(() => {
    //       //this.showAlertFail()
    //     });
    //   response;
    // },
    // updateData(Data, id) {
    //   const response = apiService
    //     .updateResourceProfile(Data, id)
    //     .then((succ) => {
    //       // alert(succ);
    //       this.snackbar = true;
    //       this.getData();
    //       // this.$router.go();
    //       this.showAlert();
    //       succ;
    //     })
    //     .catch(() => this.showAlertFail());
    //   response;
    //   // this.snackbar = true;
    //   this.s = [];
    //   if (response.status === 200) alert("Sukses");
    //   if (response.status === 200) {
    //     alert("sukses");
    //   }
    // },
    // tempUpdate(roles, jenjabs, kelompoks, tipes) {
    //   const response = apiService
    //     .getLookup()
    //     .then((response) => {
    //       let role = response.find((el) => el.name == roles);
    //       let jenjab = response.find((el) => el.name == jenjabs);
    //       let kelompok = response.find((el) => el.name == kelompoks);
    //       let tipe = response.find((el) => el.name == tipes);
    //       role.map((item) => {
    //         this.newEditedItem.role = item.value;
    //       });
    //       jenjab.map((item) => {
    //         this.newEditedItem.jenjabId = item.value;
    //       });
    //       kelompok.map((item) => {
    //         this.newEditedItem.kelompokId = item.value;
    //         //this.newEditedItem.kelompok.kelompokId = item.value;
    //       });
    //       tipe.map((item) => {
    //         this.newEditedItem.resourceType = item.value;
    //       });
    //     })
    //     .catch((err) => err);
    //   response;
    // },
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
      console.log("sd" + a.vendorId);
      if (this.editedIndex > -1) {
        this.getSkillId();
        this.getjenjabId();
        this.getroleId();
        this.getkelompokId();
        this.gettipeId();
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
          if (a.vendorId) {
            this.getvendorId(a.vendorId);
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
          this.getdivisiId(a.divisiId);
          this.getjenjabId(a.jenjabId);
          this.getroleId(a.role);
          this.getkelompokId(a.kelompokId);
          this.gettipeId(a.resourceType);
          this.getSkillId(1);
          console.log(a);
        } else {
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
          this.getjenjabId();
          this.getroleId();
          this.getkelompokId();
          this.gettipeId();
          console.log("asa" + a);
        }
        this.createData(this.newEditedItem);
      }
      this.close();
      this.closeDelete();
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
</style>