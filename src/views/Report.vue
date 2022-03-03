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
      :items="desserts"
      :search="search"
    ></v-data-table>
  </v-card>
        </v-card>
      </v-card>
    </v-dialog>
    <v-menu
      ref="menu"
      v-model="menu"
      :close-on-content-click="false"
      :return-value.sync="date"
      transition="scale-transition"
      offset-y
      min-width="auto"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-text-field
          v-model="dates"
          label="Date Filter"
          prepend-icon="mdi-calendar"
          readonly
          v-bind="attrs"
          v-on="on"
        ></v-text-field>
      </template>
      <v-date-picker v-model="dates" range no-title scrollable>
        <v-spacer></v-spacer>
        <v-btn text color="primary" @click="menu = false"> Cancel </v-btn>
        <v-btn text color="primary" @click="filter"> OK </v-btn>
      </v-date-picker>
    </v-menu>
    <v-col cols="12" sm="6" md="4">
      <v-autocomplete
        v-model="search"
        label="Role*"
        :rules="nameRules"
        outlined
        :items="tempr"
      ></v-autocomplete>
    </v-col>
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
import { DayPilot, DayPilotScheduler } from "daypilot-pro-vue";
export default {
  name: "Scheduler",
  data: function () {
    return {
      search: '',
        headers: [
          {
            text: 'CR',
            align: 'start',
            sortable: false,
            value: 'cr',
          },
          { text: 'CR Status', value: 'cr_status' },
          { text: 'Project Name', value: 'project_name' },
          { text: 'Description', value: 'desc' },
          { text: 'Assign to Group', value: 'assign_g' },
          { text: 'Assign to Current', value: 'assign_c' },
          { text: 'Start Date', value: 'start_date' },
          { text: 'Finish Date', value: 'finish_date' },
        ],
        desserts: [
          {
            cr: 31271,
            cr_status: "Development",
            project_name: "Core KCLN Tokyo",
            desc: "Perbaikan Status User",
            assign_g: "CBS",
            assign_c: 'Ready to dev',
            start_date:"2022-02-22",
            finish_date:"2023-02-22"
          },
                    {
            cr: 31272,
            cr_status: "Development",
            project_name: "Core KCLN Tokyo",
            desc: "Perbaikan Status User",
            assign_g: "CBS",
            assign_c: 'Ready to dev',
            start_date:"2022-02-22",
            finish_date:"2023-02-22"
          },
                    {
            cr: 31273,
            cr_status: "Development",
            project_name: "Core KCLN Tokyo",
            desc: "Perbaikan Status User",
            assign_g: "CBS",
            assign_c: 'Ready to dev',
            start_date:"2022-02-22",
            finish_date:"2023-02-22"
          },
                    {
            cr: 31274,
            cr_status: "Development",
            project_name: "Core KCLN Tokyo",
            desc: "Perbaikan Status User",
            assign_g: "CBS",
            assign_c: 'Ready to dev',
            start_date:"2022-02-22",
            finish_date:"2023-02-22"
          },
        ],
      dates: [],
      dialog: false,
      aa: "",
      tempr: ["Resource 1", "Resource 2", "Resource 3", "Resource 4"],
      menu: false,
      config: {
        timeHeaders: [{ groupBy: "Month" }, { groupBy: "Day", format: "d" }],
        scale: "Day",
        //startDate:this.dates[0],
        days: 30,
        startDate: DayPilot.Date.today(),
        // days: DayPilot.Date.today().daysInMonth(),
        resources: [
          {
            name: "Kelompok 1",
            id: "G1",
            expanded: true,
            children: [
              {
                name: "Resource 1",
                id: "R1",
              },
              {
                name: "Resource 2",
                id: "R2",
              },
            ],
          },
          {
            name: "Kelompok 2",
            id: "G2",
            expanded: true,
            children: [
              {
                name: "Resource 3",
                id: "R3",
              },
              {
                name: "Resource 4",
                id: "R4",
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
        onEventClicked: () => {
          this.dialog = true;
        },
        events: [
          {
            id: 1,
            text: "100%",
            start: DayPilot.Date.today().addDays(1),
            end: DayPilot.Date.today().addDays(2),
            resource: "R2",
          },
          {
            id: 2,
            text: "50%",
            start: "2022-03-03",
            end: "2022-03-04",
            resource: "R4",
          },
        ],
      },
    };
  },

  props: {},
  components: {
    DayPilotScheduler,
  },
  computed: {
    dateRangeText() {
      return this.dates.join(" ~ ");
    },
    // DayPilot.Scheduler object - https://api.daypilot.org/daypilot-scheduler-class/
    scheduler: function () {
      return this.$refs.scheduler.control;
    },
  },
  methods: {
    filteredResource(item) {
    return item.tempr.toLowerCase().includes(this.kelompok.toLowerCase());
  },
    filter() {
      // alert(DayPilot.Date.today())
      //   this.startDate = this.dates[0]
      //   this.days = this.dates[1]
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
  mounted: function () {
    this.scheduler.scrollTo(DayPilot.Date.today());

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
