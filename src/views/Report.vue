<template>
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
      <v-card>
        <v-card class="pa-2" offset-sm="3" outlined tile>
          <v-card>
            <v-card-title>
              Detail Project
              <v-spacer></v-spacer>
              <v-text-field
                v-model="search"
                append-icon="mdi-magnify"
                label="Search"
                single-line
                hide-details
              ></v-text-field>
            </v-card-title>
            <v-data-table
              :headers="headers"
              :items="dataCr"
              :search="search"
            ></v-data-table>
          </v-card>
        </v-card>
      </v-card>
    </v-dialog>
    <v-row class="pa-5">
      <validation-observer ref="obs" v-slot="{ passes }" slim>
        <v-form @submit.prevent="passes(save)">
          <v-row>
            <v-col cols="10" sm="5" md="3">
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
                      label="Date Filter"
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
                      Cancel
                    </v-btn>
                    <v-btn text color="primary" @click="$refs.menu.save(dates)">
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
                      Cancel
                    </v-btn>
                    <v-btn text color="primary" @click="$refs.menu.save(dates)">
                      OK
                    </v-btn>
                  </v-date-picker>
                </v-menu>
              </validation-provider>
            </v-col>
            <v-col cols="10" sm="5" md="3">
              <v-autocomplete
                v-model="kelompok"
                label="Fiter Kelompok"
                :items="kelompok"
              ></v-autocomplete
            ></v-col>
            <v-col cols="10" sm="5" md="3">
              <v-autocomplete
                v-model="role"
                label="Fiter Role"
                :items="role"
              ></v-autocomplete>
            </v-col>
            <v-col cols="5" sm="3" md="2">
              <v-btn
                type="submit"
                v-if="dates[0]"
                @click="filterDate"
                color="info"
                >Filter</v-btn
              >
              <v-btn type="submit" v-else color="info">Filter</v-btn>
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
      <v-col>
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
      </v-col>

      <!-- <v-col cols="10" sm="4" md="2">
        <v-autocomplete
          v-model="divisi"
          label="Fiter Divisi"
          :items="divisi"
        ></v-autocomplete>
      </v-col> -->
    </v-row>
    <v-toolbar> </v-toolbar>
    <!-- <v-spacer></v-spacer> -->

    <DayPilotScheduler
      search="search"
      id="dp"
      :config="config"
      ref="scheduler"
    />
  </div>
</template>

<script>
import { ValidationObserver, ValidationProvider } from "vee-validate";
import { DayPilot, DayPilotScheduler } from "daypilot-pro-vue";
import { Axios } from "./Axios";
const apiService = new Axios();
export default {
  name: "Scheduler",
  data: function () {
    return {
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
          value: "cr",
        },
        { text: "CR Status", value: "cr_status" },
        { text: "Project Name", value: "project_name" },
        { text: "Description", value: "desc" },
        { text: "Assign to Group", value: "assign_g" },
        { text: "Assign to Current", value: "assign_c" },
        { text: "Start Date", value: "start_date" },
        { text: "Finish Date", value: "finish_date" },
      ],
      dataCr: [
        {
          cr: 31271,
          cr_status: "Development",
          project_name: "Core KCLN Tokyo",
          desc: "Perbaikan Status User",
          assign_g: "CBS",
          assign_c: "Ready to dev",
          start_date: "2022-02-22",
          finish_date: "2023-02-22",
        },
        {
          cr: 31272,
          cr_status: "Development",
          project_name: "Core KCLN Tokyo",
          desc: "Perbaikan Status User",
          assign_g: "CBS",
          assign_c: "Ready to dev",
          start_date: "2022-02-22",
          finish_date: "2023-02-22",
        },
        {
          cr: 31273,
          cr_status: "Development",
          project_name: "Core KCLN Tokyo",
          desc: "Perbaikan Status User",
          assign_g: "CBS",
          assign_c: "Ready to dev",
          start_date: "2022-02-22",
          finish_date: "2023-02-22",
        },
        {
          cr: 31274,
          cr_status: "Development",
          project_name: "Core KCLN Tokyo",
          desc: "Perbaikan Status User",
          assign_g: "CBS",
          assign_c: "Ready to dev",
          start_date: "2022-02-22",
          finish_date: "2023-02-22",
        },
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
        resources: [
          {
            name: "RST",
            id: "G1",
            expanded: true,
            children: [
              {
                name: "Resource 1",
                id: "R1",
                html: "<h4>Resource 1</h4><h5>STI</h5>",
              },
              {
                name: "Resource 4",
                id: "R4",
                html: "<h4>Resource 4</h4><h5>STI</h5>",
              },
            ],
          },
          {
            name: "ISP",
            id: "G1",
            expanded: true,
            children: [
              {
                name: "Resource 2",
                id: "R2",
                html: "<h4>Resource 2</h4><h5>STI</h5>",
              },
              {
                name: "Resource 3",
                id: "R3",
                html: "<h4>Resource 3</h4><h5>STI</h5>",
              },
            ],
          },
        ],
        // onTimeRangeSelected: function (args) {
        //   var dp = this;
        //   DayPilot.Modal.prompt("Create a new event:", "Event 1").then(
        //     function (modal) {
        //       dp.clearSelection();
        //       if (!modal.result) {
        //         return;
        //       }
        //       dp.events.add({
        //         start: args.start,
        //         end: args.end,
        //         id: DayPilot.guid(),
        //         resource: args.resource,
        //         text: modal.result,
        //       });
        //     }
        //   );
        // },
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
          console.log("ini item" + item);
        },
        onBeforeEventRender: function (args) {
          args.e.bubbleHtml =
            "<div><b>" +
            args.e.text +
            "</b></div><div>Start: " +
            args.e.start.toString("M/d/yyyy") +
            "|</div><div>End: " +
            args.e.end.toString("M/d/yyyy") +
            "</div>";
        },
        events: [
          {
            id: 1,
            text: "",
            start: DayPilot.Date.today().addDays(1),
            end: DayPilot.Date.today().addDays(2),
            resource: "R1",
            barColor: "#FFFF00",
          },
          {
            id: 2,
            text: "",
            start: "2022-03-03",
            end: "2022-03-04",
            resource: "R4",
            barColor: "#9a0",
          },
          {
            id: 3,
            text: "",
            start: "2022-03-09",
            end: "2022-03-18",
            resource: "R1",
            barColor: "#FFFF00",
            color: "#FFFF00",
          },
          {
            id: 4,
            text: "",
            start: "2022-03-15",
            end: "2022-03-24",
            resource: "R1",
            barColor: "#000",
          },
          {
            id: 5,
            text: "",
            start: "2022-03-24",
            end: "2022-03-28",
            resource: "R1",
            barColor: "green",
          },
          {
            id: 6,
            text: "",
            start: "2022-03-28",
            end: "2022-04-01",
            resource: "R1",
            barColor: "green",
          },
        ],
      },
    };
  },

  props: {},
  components: {
    DayPilotScheduler,
    ValidationObserver,
    ValidationProvider,
  },
  computed: {
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
    this.getKelompok();
    this.getData2();
    this.getWarna();
  },

  methods: {
    save() {},
    getWarna() {
      var data = this.config.events;
      var warna = [];
      var colors = [
        "red",
        "orange",
        "green",
        "blue",
        "yellow",
        "indigo",
        "violet",
        "purple",
      ];
      var j = 0;
      for (var i = 0; i < data.length; i++) {
        warna.push(colors[j]);
        j++;
        if (j == 8) j = 0;
      }
      console.log("warna" + warna);
      data.map((item) => {
        console.log(item.id);
        item.barColor = warna[item.id - 1];
      });
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

    async getData2() {
      const response = await apiService
        .getLookup()
        .then((response) => {
          response.map((item) => {
            if (item.type == "Role") {
              this.tempr.push(item.name);
              this.roleid.push(item.value);
            }
            if (item.type == "Divisi") {
              this.tempd.push(item.name);
              this.divisiid.push(item.value);
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
      for (var p = 0; p < this.tempd.length; p++) {
        let oo = {};
        oo.text = this.tempd[p];
        oo.value = this.divisiid[p];
        this.divisi.push(oo);
      }
    },

    filteredResource(item) {
      return item.tempr.toLowerCase().includes(this.kelompok.toLowerCase());
    },
    filterDate() {
      console.log(DayPilot.Date.today().daysInMonth());
      if (this.dates[0] < this.dates[1]) {
        this.config.startDate = this.dates[0];
      } else this.config.startDate = this.dates[1];

      //alert(this.startDate)
      var date1 = new Date(this.dates[0]);
      var date2 = new Date(this.dates[1]);

      // hitung perbedaan waktu dari dua tanggal
      if (this.dates[0] < this.dates[1]) {
        var Difference_In_Time = date2.getTime() - date1.getTime();
      } else {
        Difference_In_Time = date1.getTime() - date2.getTime();
      }
      // hitung jml hari antara dua tanggal
      var Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);

      // tampilkan jml akhir hari (hasil)

      // this.config.days = Math.abs(this.dates[0]-this.dates[1])/86400000
      this.config.days = Difference_In_Days + 1;
      this.menu = false;
    },
  },
  mounted: function () {},
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
