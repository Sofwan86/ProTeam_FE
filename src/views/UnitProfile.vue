<template>
  <v-row>
    <v-col>
      <v-data-table
        :headers="headers"
        :items="units"
        :search="search"
        class="elevation-1"
      >
        <template v-slot:top>
          <v-toolbar flat>
            <v-toolbar-title>Kelompok Profile</v-toolbar-title>
            <v-divider class="mx-4" inset vertical></v-divider>
            <v-spacer></v-spacer>
            <div max-width:100>
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
            <div class="pa-3">
              <xlsx-workbook>
                <xlsx-sheet :collection="sheet" :sheet-name="namaSheet" />
                <xlsx-download filename="Report Units Profile.xlsx">
                  <v-btn outlined class="btn-imp"> Download Report </v-btn>
                  <!-- <button>Download</button> -->
                </xlsx-download>
              </xlsx-workbook>
            </div>
            <v-dialog v-model="dialog" max-width="700px">
              <v-card>
                <v-card-title>
                  <span class="text-h5">{{ formTitle }}</span>
                </v-card-title>

                <v-card-text>
                  <v-container>
                    <v-row>
                      <v-data-table
                        :headers="headers1"
                        :items="member"
                        :search="search1"
                        :items-per-page="5"
                        class="elevation-1"
                        :footer-props="{
                          showFirstLastPage: true,
                          firstIcon: 'mdi-arrow-collapse-left',
                          lastIcon: 'mdi-arrow-collapse-right',
                          prevIcon: 'mdi-minus',
                          nextIcon: 'mdi-plus',
                        }"
                      >
                        <template v-slot:top>
                          <v-toolbar flat>
                            <v-toolbar-title>Data Member </v-toolbar-title>
                            <v-divider class="mx-4" inset vertical></v-divider>
                            <v-spacer></v-spacer>
                            <div max-width:100>
                              <v-text-field
                                outlined
                                v-model="search1"
                                append-icon="mdi-magnify"
                                label="Search"
                                single-line
                                hide-details
                                dense
                              ></v-text-field>
                            </div>
                            <template v-slot:[`item.skill`]="{ item }">
                              <p v-html="item.skill"></p>
                            </template>
                            <template v-slot:[`item.nama_status`]="{ item }">
                              <p
                                v-if="item.nama_status == 'Inactive'"
                                class="red--text"
                              >
                                Inactive
                              </p>
                              <p v-else class="green--text">Active</p>
                            </template>
                            <template v-slot:[`item.actions`]="{ item }">
                              <v-icon small @click="deleteItem(item)">
                                mdi-account-details-outline
                              </v-icon>
                            </template>
                          </v-toolbar>
                        </template>
                      </v-data-table>
                    </v-row>
                  </v-container>
                </v-card-text>
              </v-card>
            </v-dialog>
            <v-dialog v-model="dialogDelete" max-width="500">
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
                                  {{ editedItem.kelompokName }}
                                </h2></v-list-item-title
                              >
                              <v-list-item-subtitle
                                >Added
                                {{ editedItem.updatedTime | str_limit(10) }}
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
                              <v-list-item-subtitle
                                >Divisi</v-list-item-subtitle
                              >
                              <v-list-item-title>
                                {{ editedItem.divisiName }}
                              </v-list-item-title>
                            </v-list-item-content>
                          </v-list-item>
                          <v-list-item two-line>
                            <v-list-item-content>
                              <v-list-item-subtitle
                                >Total Pegawai</v-list-item-subtitle
                              >
                              <v-list-item-title>
                                {{ editedItem.totalEmployee }}
                              </v-list-item-title>
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
                          <v-list-item two-line>
                            <v-list-item-content>
                              <v-list-item-subtitle>Notes</v-list-item-subtitle>
                              <v-list-item-title>
                                {{ editedItem.usageMandays }}
                              </v-list-item-title>
                            </v-list-item-content>
                          </v-list-item>
                        </v-col>
                        <v-col cols="5" md="4">
                          <v-list-item two-line>
                            <v-list-item-content>
                              <v-list-item-subtitle
                                >Status</v-list-item-subtitle
                              >
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
                          <v-list-item two-line>
                            <v-list-item-content>
                              <v-list-item-subtitle
                                >Skillset</v-list-item-subtitle
                              >
                              <v-list-item-title>
                                <p v-html="editedItem.skill"></p>
                              </v-list-item-title>
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

        <template v-slot:[`item.status`]="{ item }">
          <p v-if="item.status == 0" class="red--text">inactive</p>
          <p v-else class="green--text">active</p>
        </template>
        <template v-slot:no-data>
          <v-btn color="red" @click="initialize"> No Data </v-btn>
        </template>
        <!-- <template v-slot:[`item.skill`]="{ item }">
          <p v-html="item.skill">inactive</p>
        </template> -->
        <template v-slot:[`item.statusName`]="{ item }">
          <p v-if="item.statusName == 'Inactive'" class="red--text">Inactive</p>
          <p v-else class="green--text">Active</p>
        </template>
        <template v-slot:[`item.action`]="{ item }">
          <v-icon small @click="deleteItem(item)">
            mdi-account-details-outline
          </v-icon>
        </template>
        <template v-slot:[`item.member`]="{ item }">
          <v-icon small @click="editItem(item)">
            mdi-account-group-outline
          </v-icon>
        </template>
      </v-data-table>
    </v-col>
  </v-row>
</template>

<script>
import { Axios } from "./Axios";
import XlsxWorkbook from "../components/XlsxWorkbook";
import XlsxSheet from "../components/XlsxSheet";
import XlsxDownload from "../components/XlsxDownload";
const apiService = new Axios();

export default {
  name: "UnitProfile",
  components: {
    XlsxWorkbook,
    XlsxSheet,
    XlsxDownload,
  },
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
    search1: "",
    dialog: false,
    dialogDelete: false,
    mandays: [],
    editedIndex: -1,
    editedItem: {
      vendorName: "",
      contractNumber: "",
      startContract: "",
      lastContract: "",
      totalMandays: "",
      usageMandays: "",
      availableMandays: "",
      status: "",
      notes: "",
      createdTime: "",
      createdBy: "",
      updatedBy: "",
      showStatus: "",
      mandaysId: "",
    },
    defaultItem: {
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
      showStatus: "",
      mandaysId: 0,
    },

    tab: null,
    menus: ["Resource", "Kelompok"],
    headers: [
      {
        text: "Kelompok",
        align: "start",
        sortable: true,
        value: "kelompokName",
      },
      { text: "Divisi", value: "divisiName" },
      // { text: "Skillset", value: "skill" },
      { text: "Total Pegawai", value: "totalEmployee" },
      { text: "TotalManHour", value: "totalManhour" },
      { text: "Status", value: "statusName" },
      { text: "Details  ", value: "action", sortable: false },
      { text: "Member", value: "member", sortable: false },
    ],
    headers1: [
      {
        text: "Nama",
        align: "start",
        sortable: true,
        value: "employeeName",
      },
      { text: "Npp", value: "npp" },
      { text: "Role", value: "nama_role" },
      { text: "Status", value: "nama_status" },
    ],
    units: [
      {
        totalPeg: "15",
        totalMH: "7",
        kelompok: "OFA",
        skills: ["React", "Vue", "Java", "Phyton"],
        status: "Active",
      },
      {
        totalPeg: "25",
        totalMH: "7",
        kelompok: "TQC",
        skills: ["PHP", "Vue", "Java", "DotNet"],
      },
      {
        totalPeg: "20",
        totalMH: "7",
        kelompok: "KVM",
        skills: ["NetCore", "Vue", "Java", "Phyton"],
      },
    ],
    member: [],
    sheets: [{ name: "Report", data: [{asdfs:1}] }],
    sheetss:[],
    r_kelompoknama:[],
    r_divisinama:[],
    r_totale:[],
    r_totalm:[],
    items: [
      {
        text: "Profile",
        disabled: true,
        href: "/",
      },
      {
        text: "Kelompok Profile",
        disabled: true,
        href: "/",
      },
    ],
    sheet: [],
    namaSheet: "Report",
    r_divisi: [],
    r_unit: [],
    r_skill: [],
    r_pegawai: [],
    r_manhour: [],
  }),
  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "Members" : "Update Data";
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
  },

  methods: {
    async getData() {
      const response = await apiService
        .getKelompokProfile()
        .then((response) => {
          this.units = response;
        })
        .catch((err) => err);
      response;
      console.log;
      this.units.map((item) => {
        console.log("Nama:" + item.employeeName);
        this.r_divisi.push(item.divisiName);
        this.r_unit.push(item.kelompokName);
        this.r_pegawai.push(item.totalEmployee);
        this.r_manhour.push(item.totalManhour);
        this.r_skill.push(item.skill);
      });
      for (var k = 0; k < this.r_divisi.length; k++) {
        //this.tempskill.push(obj2)
        let oo = {};
        oo.Divisi = this.r_divisi[k];
        oo.Kelompok = this.r_unit[k];
        var regex = /<br\s*[/]?>/gi;
        var skill = ""
        if(this.r_skill[k])skill = this.r_skill[k].replace(regex, " ");
        oo.Skillset = skill;
        oo.TotalPegawai = this.r_pegawai[k];
        oo.TotalManhour = this.r_manhour[k];
        console.log("aa"+oo)
        this.sheet.push(oo);
      }

    },
    editItem(item) {
      this.editedIndex = this.mandays.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
      const response = apiService
        .getResourceProfileId(item.kelompokId)
        .then((response) => {
          this.member = response.employee;
        })
        .catch((err) => err);
      response;
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
      if (response) {
        if (response) this.getData();
      }
    },
    updateData(Data, id) {
      const response = apiService
        .updateManday(Data, id)
        .then((succ) => succ)
        .catch((err) => err);
      response;
      if (response) {
        if (response) this.getData();
      }
    },
    save() {
      if (this.editedIndex > -1) {
        // Object.assign(this.mandays[this.editedIndex], this.editedItem);
        if (this.editedItem.status == "active") {
          this.editedItem.status = 1;
        } else this.editedItem.status = 0;
        this.updateData(this.editedItem, this.editedItem.mandaysId);
      } else {
        this.editedItem.startContract = this.startdate;
        this.editedItem.lastContract = this.lastdate;
        this.editedItem.createdTime = this.nowdate;

        if (this.editedItem.status == "active") {
          this.editedItem.status = 1;
        } else this.editedItem.status = 0;
        // this.snackbar = true;
        this.createData(this.editedItem);
      }
      this.close();
    },
  },
};
</script>

<style lang="scss" scoped>
</style>
