<template>
  <div>
    <div>
      <h1 class="pa-3">Utilization Report</h1>
      <v-dialog v-model="dialog" max-width="1100px">
        <v-card>
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
      </v-row>

      <gantt-elastic
        :tasks="tasks"
        :options="options"
        :dynamic-style="dynamicStyle"
      ></gantt-elastic>

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
import { Axios } from "../Axios";

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
              id: 2,
              label: "Nama Pegawai",
              value: "user",
              width: 150,
              html: true,
            },
            {
              id: 3,
              label: "Divisi",
              value: "divisi",
              width: 70,
            },
            {
              id: 4,
              label: "Kelompok",
              value: "kelompok",
              width: 70,
            },
            
            {
              id: 5,
              label: "Jenjang Jabatan",
              value: "jenjab",
              width: 70,
            },
            {
              id: 6,
              label: "NPP",
              value: "npp",
              width: 70,
              html: true,
            },
            {
              id: 7,
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
    scheduler: function () {
      return this.$refs.scheduler.control;
    },
  },
  created() {
    this.getData2();
  },

  methods: {
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
    async getDetail(id, user, start, end) {
      this.dialog = true;
      this.pegawai = user;
      this.startCr = start;
      this.endCr = end;
      const response = await apiService
        .getUtilizationDetail(id)
        .then((response) => {
          this.dataCr = response.data;
        })
        .catch((err) => err);

      this.progress.push(this.dataCr.length);
      response;

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

      this.utilization.map((item) => {
        this.processDT = item.processDT;
      });

      var sum = 1;

      this.utilization.map((item) => {
        // var objchil = {};
        var objekResource = {};

        objekResource.id = sum;
        objekResource.user = item.employee_Name;
        objekResource.divisi = item.divisi_Name;
        objekResource.jenjab = item.jenjab_Name;
        objekResource.npp = item.npp;
        objekResource.kelompok = item.kelompok_Name;

        objekResource.detailId = item.mapViewHeader_Id;
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
          objekResource.project = "";
          objekResource.style = {
            base: {
              fill: "red",
              stroke: "red",
            },
          };
        }

        objekResource.progress = 100;
        objekResource.type = "project";

        this.tasks.push(objekResource);
        this.dataCr = [];

        sum++;
      });

      if (this.tasks.length > 0) {
        this.cek = true;
      }
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
