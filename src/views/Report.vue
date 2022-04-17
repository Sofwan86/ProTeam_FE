<template>
  <div>
    <div>
      <h1 class="pa-3">Utilization Report</h1>
      <!-- <v-btn @click="filter">Submit</v-btn> -->
      <!-- <v-row>
      <v-col cols="12" sm="6">
        <v-date-picker v-model="dates" range @click="filter"></v-date-picker>
      </v-col>
      <v-col cols="12" sm="6">
        <v-text-field
          v-model="dateRangeText"
          label="Date range"
          prepend-icon="mdi-calendar"
          readonly
        ></v-text-field>
        model: {{ dates }}
      </v-col>
    </v-row> -->
      <v-dialog v-model="dialog" max-width="1100px">
        <v-card >
          <v-card color="#004483">
            <v-card-title class="white--text">
              <span class="text-h6"><h4>Detail Project</h4></span>
            </v-card-title>
          </v-card>

          <v-card-title>
            <p>
              {{ pegawai }}
              |
              {{ startCr | str_limit(10) }}
            </p>
            <p v-if="endCr.toString()[0] != 1">
              ~

              {{ endCr | str_limit(10) }}
            </p>
            <!-- <h2> Detail Project</h2> <br>
                <h3> {{pegawai}} </h3> <br>
                <p> {{startCr}} - {{endCr}}</p> -->

            <v-spacer></v-spacer>
            <v-text-field
              v-model="search"
              append-icon="mdi-magnify"
              label="Search"
              single-line
              hide-details
              height="50"
            ></v-text-field>
          </v-card-title>
          <v-data-table
            :headers="headers"
            :items="dataCr"
            :search="search"
          ></v-data-table>
        </v-card>
      </v-dialog>
      <v-row class="pa-5">
        <validation-observer ref="obs" v-slot="{ passes }" slim>
          <v-form ref="form" v-model="valid" @submit.prevent="passes(save)">
            <v-row>
              <v-col cols="10" sm="7" md="4">
                <validation-provider
                  name="date"
                  :rules="'required'"
                  v-slot="{ errors }"
                  slim
                >
                  <v-menu
                    ref="menu"
                    :close-on-content-click="false"
                    :return-value.sync="dates"
                    transition="scale-transition"
                    offset-y
                    min-width="auto"
                  >
                    <template v-slot:activator="{ on, attrs }">
                      <v-text-field
                        v-model="dates"
                        label="Filter Tanggal (wajib)"
                        prepend-icon="mdi-calendar"
                        :error-messages="errors[0]"
                        readonly
                        v-bind="attrs"
                        v-on="on"
                      ></v-text-field>
                    </template>
                    <v-date-picker
                      :min="getMinDate"
                      v-if="dates[0]"
                      :max="getEndDate"
                      v-model="dates"
                      range
                      no-title
                      scrollable
                    >
                      <v-spacer></v-spacer>
                      <v-btn text color="primary" @click="dates = []">
                        Reset
                      </v-btn>
                      <v-btn
                        text
                        color="primary"
                        @click="$refs.menu.save(dates)"
                      >
                        OK
                      </v-btn>
                    </v-date-picker>
                    <v-date-picker
                      v-else
                      :min="getMinDate"
                      v-model="dates"
                      range
                      no-title
                      scrollable
                    >
                      <v-spacer></v-spacer>
                      <v-btn text color="primary" @click="dates = []">
                        Reset
                      </v-btn>
                      <v-btn
                        text
                        color="primary"
                        @click="$refs.menu.save(dates)"
                      >
                        OK
                      </v-btn>
                    </v-date-picker>
                  </v-menu>
                </validation-provider>
              </v-col>
              <v-col cols="10" sm="5" md="3">
                <v-autocomplete
                  v-model="idkelompok"
                  :rules="nameRules"
                  label="Fiter Kelompok (wajib)"
                  :items="kelompok"
                ></v-autocomplete
              ></v-col>
              <v-col cols="10" sm="5" md="3">
                <v-autocomplete
                  v-model="idrole"
                  label="Fiter Role"
                  :items="role"
                ></v-autocomplete>
              </v-col>
              <v-col cols="5" sm="3" md="2">
                <v-btn
                  type="submit"
                  v-if="dates[1] && valid"
                  @click="filterDate(dates[0], dates[1], idkelompok, idrole)"
                  color="info"
                  >Filter<Spinner v-if="!cek"></Spinner>
                </v-btn>

                <v-btn type="submit" v-else disabled color="info"
                  >Filter
                </v-btn>
              </v-col>
            </v-row>
            
          </v-form>
        </validation-observer>

        <!-- <v-col cols="10" sm="4" md="2">
        <v-autocomplete
          v-model="filter"
          label="Fiter resource"
          :items="resource"
        ></v-autocomplete>
      </v-col> -->
        <!-- <v-col> -->
        <!-- <validation-observer ref="obs" v-slot="{ passes }" slim>
          <v-form @submit.prevent="passes(save)">
            <validation-provider
              name="date"
              :rules="'required'"
              v-slot="{ errors }"
              slim
            >
              <v-menu
                ref="wc_menu"
                v-model="menu"
                :close-on-content-click="false"
                :return-value.sync="dates"
                transition="scale-transition"
                min-width="290px"
              >
                <template v-slot:activator="{ on }">
                  <v-text-field
                    label="Date Filter"
                    name="wc_expiry_date"
                    v-model="dates"
                    readonly
                    :error-messages="errors[0]"
                    v-on="on"
                  ></v-text-field>
                </template>
                <v-date-picker
                  :min="getMinDate"
                  v-if="dates[0]"
                  :max="getEndDate"
                  v-model="dates"
                  range
                  no-title
                  scrollable
                >
                  <v-spacer></v-spacer>
                  <v-btn text color="primary" @click="menu = false"
                    >Cancel</v-btn
                  >
                  <v-btn text color="primary" @click="filterDate">OK</v-btn>
                </v-date-picker>
                <v-date-picker
                  :min="getMinDate"
                  v-else
                  v-model="dates"
                  range
                  no-title
                  scrollable
                >
                  <v-spacer></v-spacer>
                  <v-btn text color="primary" @click="menu = false"
                    >Cancel</v-btn
                  >
                  <v-btn text color="primary" @click="filterDate">OK</v-btn>
                </v-date-picker>
              </v-menu>
            </validation-provider>
            <v-btn type="submit" color="info">Filter</v-btn>
          </v-form>
        </validation-observer> -->
        <!-- </v-col> -->

        <!-- <v-col cols="10" sm="4" md="2">
        <v-autocomplete
          v-model="divisi"
          label="Fiter Divisi"
          :items="divisi"
        ></v-autocomplete>
      </v-col> -->
      </v-row>
      <!-- <v-toolbar> </v-toolbar> -->
      <!-- <v-spacer></v-spacer> -->

      <!-- <DayPilotScheduler
      search="search"
      id="dp"
      :config="config"
      ref="scheduler"
    /> -->

      <gantt-elastic
        :tasks="tasks"
        :options="options"
        :dynamic-style="dynamicStyle"
      ></gantt-elastic>

      <!-- <div height="100%" class="width:100% embed-responsive embed-responsive-16by9 z-depth-1">
    <iframe  src="http://localhost:3000/" style="width:100%;height: 500px" ></iframe>
</div> -->
<v-row>
              <v-col v-if="processDT != 0">
                Process Date Time: {{ processDT }}
              </v-col>
            </v-row>
    </div>
  </div>
</template>

<script>
import GanttElastic from "gantt-elastic";
import { ValidationObserver, ValidationProvider } from "vee-validate";
import { DayPilot } from "daypilot-pro-vue";
import Spinner from "vue-simple-spinner";
import { Axios } from "./Axios";

const apiService = new Axios();
var dataDetail = [];
var dialogDetail = false;
function clickit(id, user, start, end) {
  window.test.getDetail(id, user, start, end);
}
// const utilizationStore = useUtilizationStore();
export default {
  name: "Scheduler",
  data: function () {
    return {
      dataDetail,
      dialogDetail,
      hide: false,
      progress: [],
      nameRules: [(v) => !!v || "Required"],
      valid: false,
      pegawai: "",
      startCr: "",
      endCr: "",
      default: [
        {
          id: "#",
          label: `This Day ${new Date(this.getDate(0))
            .toString()
            .slice(0, 15)}`,
          user: "",
          start: this.getDate(0),
          duration: 0,
          progress: 500,
          type: "project",
        },
      ],
      tasks: [],
      options: {
        title: {
          label: "Your project title as html (link or whatever...)",
          html: false,
        },
        calendar: {
          hour: {
            display: false,
          },
        },
        taskList: {
          columns: [
            {
              id: 1,
              label: "No",
              value: "id",
              width: 50,
            },

            {
              id: 3,
              label: "Nama Pegawai",
              value: "user",
              width: 150,
              html: true,
            },
            {
              id: 3,
              label: "Divisi",
              value: "divisi",
              width: 80,
            },
            {
              id: 4,
              label: "Jenjang Jabatan",
              value: "jenjab",
              width: 80,
            },
            // {
            //   id: 5,
            //   label: "%",
            //   value: "progress",
            //   width: 35,
            //   style: {
            //     "task-list-header-label": {
            //       "text-align": "center",
            //       width: "100%",
            //     },
            //     "task-list-item-value-container": {
            //       "text-align": "center",
            //     },
            //   },
            // },
            {
              id: 2,
              label: "Project CR",
              value: "project",
              width: 80,
              html: true,
              events: {
                click({ data }) {
                  clickit(data.detailId, data.user, data.startCr, data.end);
                },
              },
            },
          ],
        },
        locale: {
          code: "en",
          Now: "Now",
          "X-Scale": "Zoom-X",
          "Y-Scale": "Zoom-Y",
          "Task list width": "Task list",
          "Before/After": "Expand",
          "Display task list": "Task list",
        },
      },
      dynamicStyle: {},
      site: "https://google.com",
      processDT: 0,
      cek: true,
      idkelompok: "",
      idrole: "",
      wc_expiry_date: "",
      ppl_number: "",
      wc_menu: false,
      filter: "",
      search: "",
      kelompok: [],
      headers: [
        {
          text: "CR",
          align: "start",
          sortable: false,
          value: "cR_Track_No",
        },
        { text: "CR Status", value: "cR_PROC_Status" },
        { text: "Project Name", value: "project_Name" },
        { text: "Description", value: "short_Description" },
        { text: "Assign to Group", value: "assign_to_Group" },
        { text: "Assign to Current", value: "assign_to_Current" },
      ],
      dataCr: [
        // {
        //   cr: 31271,
        //   cr_status: "Development",
        //   project_name: "Core KCLN Tokyo",
        //   desc: "Perbaikan Status User",
        //   assign_g: "CBS",
        //   assign_c: "Ready to dev",
        //   start_date: "2022-02-22",
        //   finish_date: "2023-02-22",
        // },
        // {
        //   cr: 31272,
        //   cr_status: "Development",
        //   project_name: "Core KCLN Tokyo",
        //   desc: "Perbaikan Status User",
        //   assign_g: "CBS",
        //   assign_c: "Ready to dev",
        //   start_date: "2022-02-22",
        //   finish_date: "2023-02-22",
        // },
        // {
        //   cr: 31273,
        //   cr_status: "Development",
        //   project_name: "Core KCLN Tokyo",
        //   desc: "Perbaikan Status User",
        //   assign_g: "CBS",
        //   assign_c: "Ready to dev",
        //   start_date: "2022-02-22",
        //   finish_date: "2023-02-22",
        // },
        // {
        //   cr: 31274,
        //   cr_status: "Development",
        //   project_name: "Core KCLN Tokyo",
        //   desc: "Perbaikan Status User",
        //   assign_g: "CBS",
        //   assign_c: "Ready to dev",
        //   start_date: "2022-02-22",
        //   finish_date: "2023-02-22",
        // },
      ],
      dates: [],
      dialog: false,
      aa: "",
      objkel: {},
      kelompokid: [],
      date: new Date(),
      tempr: [],
      roleid: [],
      tempk: [],
      tempd: [],
      divisiid: [],
      role: [],
      divisi: [],
      utilization: {},
      utilGroup: {},
      resource: ["Resource 1", "Resource 2", "Resource 3", "Resource 4"],
      menu: false,
      config: {
        timeHeaders: [
          { groupBy: "Month" },
          { groupBy: "Day", format: "ddd d" },
        ],
        scale: "Day",
        //startDate:this.dates[0],
        days: 30,
        startDate: DayPilot.Date.today(),
        // days: DayPilot.Date.today().daysInMonth(),
        resources: [],
        onTimeRangeSelected: function (args) {
          var dp = this;
          DayPilot.Modal.prompt("Create a new event:", "Event 1").then(
            function (modal) {
              dp.clearSelection();
              if (!modal.result) {
                return;
              }
              dp.events.add({
                start: args.start,
                end: args.end,
                id: DayPilot.guid(),
                resource: args.resource,
                text: modal.result,
              });
            }
          );
        },
        eventClickHandling: "Enabled",
        treeEnabled: true,
        eventMoveHandling: "Disabled",
        eventResizeHandling: "Disabled",
        onRowFilter: function (args) {
          var query = args.filter.query;
          var hideEmpty = args.filter.hideEmpty;

          if (args.row.name.toUpperCase().indexOf(query.toUpperCase()) === -1) {
            args.visible = false;
          } else if (hideEmpty && args.row.events.isEmpty()) {
            args.visible = false;
          }
        },
        onEventClicked: (item) => {
          this.dialog = true;
          var id = item.e.data.text2;

          // var id= show.substring(4);

          this.getDetail(id);
        },
        onBeforeEventRender: function (args) {
          const a = new Date(Date.parse(args.e.end) - 1 * 24 * 60 * 60 * 1000);

          args.e.bubbleHtml =
            "<div><b>" +
            args.e.text +
            "</b></div><div>Start: " +
            new Date(args.e.start).toString().slice(0, 15) +
            "|</div><div>End: " +
            a.toString().slice(0, 15);
          ("</div>");
        },
        events: [
          // {
          //   id: 1,
          //   text: "",
          //   start: DayPilot.Date.today().addDays(1),
          //   end: DayPilot.Date.today().addDays(2),
          //   resource: "57",
          //   barColor: "#FFFF00",
          // },
          // {
          //   id: 2,
          //   text: "",
          //   start: "2022-03-03",
          //   end: "2022-03-04",
          //   resource: "R4",
          //   barColor: "#9a0",
          // },
          // {
          //   id: 3,
          //   text: "",
          //   start: "2022-03-09",
          //   end: "2022-03-18",
          //   resource: "R1",
          //   barColor: "#FFFF00",
          //   color: "#FFFF00",
          // },
          // {
          //   id: 41,
          //   text: "",
          //   start: "2022-03-15",
          //   end: "2022-03-24",
          //   resource: "R1",
          //   barColor: "#000",
          // },
          // {
          //   id: 5,
          //   text: "",
          //   start: "2022-03-24",
          //   end: "2022-03-28",
          //   resource: "R7",
          //   barColor: "green",
          // },
          // {
          //   id: 6,
          //   text: "",
          //   start: "2022-03-28",
          //   end: "2022-04-01",
          //   resource: "R1",
          //   barColor: "green",
          // },
        ],
      },
    };
  },

  props: {},
  components: {
    // DayPilotScheduler,
    ValidationObserver,
    ValidationProvider,
    Spinner,
    GanttElastic,
  },
  computed: {
    getUtilization() {
      return JSON.parse(this.utilGroup);
    },
    getEndDate() {
      var date1 = new Date(this.dates[0]);
      var endDate = new Date(date1.getTime() + 30 * 24 * 60 * 60 * 1000);
      return endDate.toISOString().slice(0, 10);
    },
    getMinDate() {
      return this.dates[0];
    },
    dateRangeText() {
      return this.dates.join(" ~ ");
    },
    // DayPilot.Scheduler object - https://api.daypilot.org/daypilot-scheduler-class/
    scheduler: function () {
      return this.$refs.scheduler.control;
    },
  },
  created() {
    // this.getKelompok();
    this.getData2();
    this.getWarna();
  },

  methods: {
    // fetchUtilization(start, finish, kelompok, role) {
    //   utilizationStore.getUtilizationDetails(start, finish, kelompok, role);
    // },
    getDate(hours) {
      const currentDate = new Date();
      const currentYear = currentDate.getFullYear();
      const currentMonth = currentDate.getMonth() + 1;
      const currentDay = currentDate.getDate();
      const timeStamp = new Date(
        `${currentYear}-${currentMonth}-${currentDay} 00:00:00`
      ).getTime();
      return new Date(timeStamp + hours * 60 * 60 * 1000).getTime();
    },
    save() {},
    // getWarna() {
    //   var data = this.config.events;
    //   var warna = [];
    //   var colors = [
    //     "red",
    //     "orange",
    //     "green",
    //     "blue",
    //     "yellow",
    //     "indigo",
    //     "violet",
    //     "purple",
    //   ];
    //   var j = 0;
    //   for (var i = 0; i < data.length; i++) {
    //     warna.push(colors[j]);
    //     j++;
    //     if (j == 8) j = 0;
    //   }
    //   console.log("warna" + warna);
    //   data.map((item) => {
    //     console.log(item.id);
    //     item.barColor = warna[item.id - 1];
    //   });
    // },
    // async getKelompok() {
    //   const response = await apiService
    //     .getKelompok()
    //     .then((response) => {
    //       this.objkel = response.newKelompok;
    //     })
    //     .catch((err) => err);
    //   response;
    //   this.objkel.map((item) => {
    //     this.tempk.push(item.kelompokName);
    //     this.kelompokid.push(item.kelompokId);
    //   });
    //   for (var k = 0; k < this.tempk.length; k++) {
    //     //this.tempskill.push(obj2)
    //     let oo = {};
    //     oo.text = this.tempk[k];
    //     oo.value = this.kelompokid[k];
    //     this.kelompok.push(oo);
    //   }
    // },
    async getDetail(id, user, start, end) {
      this.dialog = true;
      this.pegawai = user;
      this.startCr = start;
      this.endCr = end;
      const response = await apiService
        .getUtilizationDetail(id)
        .then((response) => {
          // console.log(response.data)
          this.dataCr = response.data;
        })
        .catch((err) => err);

      console.log(response);
      this.progress.push(this.dataCr.length);
      response;

      // console.log("inidatacr>>>>" + this.dataCr);
    },

    async getData2() {
      const response = await apiService
        .getLookup()
        .then((response) => {
          response.map((item) => {
            if (item.type == "Role") {
              this.tempr.push(item.name);
              this.roleid.push(item.value);
            }
            if (item.type == "Kelompok") {
              this.tempk.push(item.name);
              this.kelompokid.push(item.value);
            }
          });
        })
        .catch((err) => err);
      response;
      for (var n = 0; n < this.tempr.length; n++) {
        let oo = {};
        oo.text = this.tempr[n];
        oo.value = this.roleid[n];
        this.role.push(oo);
      }
      for (var p = 0; p < this.tempk.length; p++) {
        let oo = {};
        oo.text = this.tempk[p];
        oo.value = this.kelompokid[p];
        this.kelompok.push(oo);
      }
    },

    filteredResource(item) {
      return item.tempr.toLowerCase().includes(this.kelompok.toLowerCase());
    },
    resetFilter() {
      this.tasks = [];
    },
    async filterDate(start, finish, kelompok, role) {
      // this.config.resources = [];
      if (!this.valid) {
        alert("Pilih kelompok");
      }
      this.utilization = [];
      this.tasks = [];
      this.cek = false;
      // utilizationStore.getUtilizationDetails(start, finish, kelompok, role);
      // console.log("abc"+this.getUtilization)
      // console.log(DayPilot.Date.today().daysInMonth());
      // if (this.dates[0] < this.dates[1]) {
      //   this.config.startDate = this.dates[0];
      // } else this.config.startDate = this.dates[1];

      //alert(this.startDate)
      // var date1 = new Date(this.dates[0]);
      // var date2 = new Date(this.dates[1]);

      // hitung perbedaan waktu dari dua tanggal
      // if (this.dates[0] < this.dates[1]) {
      //   var Difference_In_Time = date2.getTime() - date1.getTime();
      // } else {
      //   Difference_In_Time = date1.getTime() - date2.getTime();
      // }
      // hitung jml hari antara dua tanggal
      // var Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);

      // tampilkan jml akhir hari (hasil)

      // this.config.days = Math.abs(this.dates[0]-this.dates[1])/86400000
      // this.config.days = Difference_In_Days + 1;
      this.menu = false;
      if (!kelompok) {
        kelompok = 0;
      }
      if (!role) {
        role = 0;
      }
      const response = await apiService
        .getUtilization(start, finish, kelompok, role)
        .then((response) => {
          this.utilization = response.data;
        })
        .catch((err) => err);
      response;
      if (this.utilization == null) {
        alert("Data Kosong");
        this.cek = true;
        this.hide = true;
        this.tasks = this.default;
      }

      //var dataR = this.config.resources;
      //  var dataE = this.config.events;
      // var chil = [];

      // var resource = {};
      // var arrKel = [];
      this.utilization.map((item) => {
        this.processDT = item.processDT;
      });

      var sum = 1;
      console.log(this.utilization);

      this.utilization.map((item) => {
        // var objchil = {};
        var objekResource = {};

        objekResource.id = sum;

        // if (item.mapViewHeader_Id > 0) {
        //   objekResource.project = '<button style="color:blue">Detail</>';
        // } else {
        //   objekResource.project = "";
        // }

        objekResource.user = item.employee_Name;
        objekResource.divisi = item.divisi_Name;
        objekResource.jenjab = item.jenjab_Name;
        objekResource.detailId = item.mapViewHeader_Id;
        //objekResource.start = this.getDate(-24 * 5);
        // objekResource.progress = 100

        if (item.mapViewHeader_Id > 0) {
          let currentDate = new Date(item.start_Date);
          let currentYear = currentDate.getFullYear();
          let currentMonth = currentDate.getMonth() + 1;
          let currentDay = currentDate.getDate();
          objekResource.start = new Date(
            `${currentYear}-${currentMonth}-${currentDay} 00:00:00`
          ).getTime();
          objekResource.end = item.finish_Date;
          objekResource.startCr = item.start_Date;
          let date1 = new Date(item.start_Date);
          let date2 = new Date(item.finish_Date);
          if (date1 < date2) {
            objekResource.duration =
              date2.getTime() - date1.getTime() + 24 * 60 * 60 * 1000;
          } else {
            objekResource.duration = 24 * 60 * 60 * 1000;
          }

          var load = objekResource.duration / 86400000;
          console.log("ini load"+load);

          if (load <= 5 && load > 0) {
            objekResource.project = '<button style="color:green">Detail</>';
            objekResource.style = {
              base: {
                fill: "green",
                stroke: "green",
              },
            };
          } else if (load > 5 && load <= 10) {
            objekResource.project = '<button style="color:orange">Detail</>';
            objekResource.style = {
              base: {
                fill: "orange",
                stroke: "orange",
              },
            };
          } else {
            objekResource.project = '<button style="color:red">Detail</>';
            objekResource.style = {
              base: {
                fill: "red",
                stroke: "red",
              },
            };
          }
        } else {
          objekResource.duration = 0;
          objekResource.project = '';
          objekResource.style = {
              base: {
                fill: "red",
                stroke: "red",
              },
            };
        }

        console.log("INIDATACRe" + this.dataCr.length);
        objekResource.progress = 100;
        console.log("DATAPROG" + objekResource.progress);

        console.log("DATABASE" + objekResource.style.base);
        objekResource.type = "project";

        this.tasks.push(objekResource);

        console.log("DATA" + objekResource);
        this.dataCr = [];

        sum++;
        // this.config.resources.push(resource);
      });

      if (this.tasks.length > 0) {
        this.cek = true;
      }

      // {
      //     id: 2,
      //     text: "",
      //     start: "2022-03-03",
      //     end: "2022-03-04",
      //     resource: "R4",
      //     barColor: "#9a0",
      //   },

      // var data = this.config.events;
      // var warna = [];
      // var colors = [
      //   "red",
      //   "orange",
      //   "green",
      //   "blue",
      //   "yellow",
      //   "indigo",
      //   "violet",
      //   "purple",
      // ];
      // var j = 0;
      // for (var i = 0; i < data.length; i++) {
      //   warna.push(colors[j]);
      //   j++;
      //   if (j == 8) j = 0;
      // }
      // data.map((item) => {
      //   item.barColor = warna[item.id - 1];
      // });
      // this.getWarna;
    },
  },
  mounted: function () {
    window.test = this;
    this.tasks = [
      {
        id: "#",
        label: `This Day ${new Date(this.getDate(0)).toString().slice(0, 15)}`,
        user: "",
        start: this.getDate(0),
        duration: 0,
        progress: 500,
        type: "project",
      },
    ];
  },
};
</script>


<style lang="scss" scoped>
.my-event {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  border-radius: 2px;
  background-color: #1867c0;
  color: #ffffff;
  border: 1px solid #1867c0;
  font-size: 12px;
  padding: 3px;
  cursor: pointer;
  margin-bottom: 1px;
  left: 4px;
  margin-right: 8px;
  position: relative;
}

.my-event.with-time {
  position: absolute;
  right: 4px;
  margin-right: 0px;
}
</style>
