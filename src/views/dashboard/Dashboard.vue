<template>
  <v-app>
    <v-breadcrumbs :items="items" divider="/"></v-breadcrumbs>
    <!-- <div>
    <div>
      <input v-model="sheetName" placeholder="type a new sheet name" />
      <button v-if="sheetName" @click="addSheet">Add Sheet</button>
    </div>

    <div>Sheets: {{ sheets }}</div>

    <xlsx-workbook>
      <xlsx-sheet
        :collection="sheet.data"
        v-for="sheet in sheets"
        :key="sheet.name"
        :sheet-name="sheet.name"
      />
      <xlsx-download>
        <button>Download</button>
      </xlsx-download>
      <xlsx-download disable-wrapper-click>
        <template #default="{download}">
          <button  @click="download">Download with slot scope</button>
        </template>
      </xlsx-download>
    </xlsx-workbook>
  </div> -->
    <v-row>
      <v-col>
        <v-card class="mx-auto" color="#17A2B8" dark max-width="500">
          <v-row>
            <v-col>
              <h1 class="text-center">{{ totalResource }}</h1>
              <v-card-text class="text-center font-weight-bold"
                >Total Resource
              </v-card-text>
            </v-col>
          </v-row>
          <v-card color="#1492A6">
            <v-list-item-title class="text-center">Detail</v-list-item-title>
          </v-card>
        </v-card>
      </v-col>
      <v-col>
        <v-card class="mx-auto" color="#238E3B" dark max-width="500">
          <v-row>
            <v-col>
              <h1 class="text-center">{{ totalVendor }}</h1>
              <v-card-text class="text-center font-weight-bold"
                >Total Vendor
              </v-card-text>
            </v-col>
            <v-divider vertical inset color="#FFF"></v-divider>
            <v-col>
              <h1 class="text-center">{{ totalMandays }}</h1>
              <v-card-text class="text-center font-weight-bold"
                >Total Mandays
              </v-card-text>
            </v-col>
          </v-row>
          <v-card color="#1D8033">
            <v-list-item-title class="text-center">Detail</v-list-item-title>
          </v-card>
        </v-card>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-card max-width="500" class="mx-auto" >
        <v-card  class="mx-auto" dark>
          <h3 class="text-center">Resource by Role</h3>
        </v-card>
        <v-card class="mx-auto">
          <GChart
            type="ColumnChart"
            :data="chartDataRbR"
            :options="chartOptions"
          />
        </v-card>
        </v-card>
      </v-col>
      <v-col>
        <v-card max-width="500" class="mx-auto">
        <v-card class="mx-auto" dark>
          <h3 class="text-center">Resource by Group</h3>
        </v-card>
        <v-card class="mx-auto">
          <GChart
            type="ColumnChart"
            :data="chartDataRbG"
            :options="chartOptions"
          />
        </v-card>
        </v-card>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-card max-width="500" class="mx-auto" dark>
          <h3 class="text-center">Resource Type</h3>
        </v-card>
        <v-card max-width="500" class="mx-auto">
          <GChart type="PieChart" :data="chartDataRT" :options="chartOptions" />
        </v-card>
      </v-col>
      <v-col>
        <v-card max-width="500" class="mx-auto" dark>
          <h3 class="text-center">Mandays by Vendor</h3>
        </v-card>
        <v-card max-width="500" class="mx-auto">
          <GChart
            type="ColumnChart"
            :data="chartDataMbV"
            :options="chartOptions"
          />
        </v-card>
      </v-col>
    </v-row>
  </v-app>
</template>

<script>
import { Axios } from "../Axios";
// import XlsxWorkbook from "../../components/XlsxWorkbook";
// import XlsxSheet from "../../components/XlsxSheet";
// import XlsxDownload from "../../components/XlsxDownload";

const apiService = new Axios();
export default {
  // components: {
  //   XlsxWorkbook,
  //   XlsxSheet,
  //   XlsxDownload
  // },
  name: "",
  data() {
    return {
      // sheetName: null,
      // sheets: [{ name: "SheetOne", data: [ {
      //     empSkillId: 0,
      //     employeeId: 0,
      //     skillsetId: 0,
      //     skillset: {
      //       skillsetId: 0,
      //     },
      //   }, ] }],
      // collection: [{ a: 1, b: 2 }],
      chartDataRbR: [["name", "totalResourceRole"]],
      chartDataRbG: [["kelompok", "totalResourceKelompok"]],
      chartDataRT: [["name", "totalResourceType"]],
      chartDataMbV: [["vendorName", "totalMandays"]],
      chartOptions: {
        chart: {
          title: "Resource by Group",
          subtitle: "Sal, Expenses, and Profit: 2014-2017",
        },
      },
      items: [
        {
          text: "Dashboard",
          disabled: false,
          href: "/dashboard",
        },
      ],
      totalMandays: 0,
      totalResource: 0,
      totalVendor: 0,
    };
  },
  created() {
    this.getData();
    this.getData2();
    this.getData3();
    this.getData4();
  },

  methods: {
    // addSheet() {
    //   this.sheets.push({ name: this.sheetName, data: [...this.collection] });
    //   this.sheetName = null;
    // },
    async getData() {
      const response = await apiService
        .getDashboardVendor()
        .then((response) => {
          const listVendor = response.dashboardvendor.listVendors;
          this.totalVendor = listVendor.length;
          this.totalMandays = response.dashboardvendor.totalMandays
          this.totalVendor = response.dashboardvendor.totalVendor
          for (var i = 0; i < listVendor.length; i++) {
            const a = [];
            a.push(listVendor[i].vendorName);
            a.push(listVendor[i].totalMandays);
            this.chartDataMbV.push(a);
          }
        })
        .catch((err) => err);
      response;
    },
    async getData2() {
      const response = await apiService
        .getDashboardResource()
        .then((response) => {
          const listResourceType = response.dashboardresources.listResourceType;

          for (var i = 0; i < listResourceType.length; i++) {
            const a = [];
            a.push(listResourceType[i].name);
            a.push(listResourceType[i].totalResourceType);
            this.chartDataRT.push(a);
          }
        })
        .catch((err) => err);
      response;
      this.sumtotalResource(this.totalResourceType);
    },
    async getData3() {
      const response = await apiService
        .getDashboardResource()
        .then((response) => {
          const listResourceRole = response.dashboardresources.listResourceRole;

          for (var i = 0; i < listResourceRole.length; i++) {
            const a = [];
            a.push(listResourceRole[i].name);
            a.push(listResourceRole[i].totalResourceRole);
            this.chartDataRbR.push(a);
          }
        })
        .catch((err) => err);
      response;
      this.sumtotalResource(this.totalResourceRole);
    },
    async getData4() {
      const response = await apiService
        .getDashboardResource()
        .then((response) => {
          const listResourceKelompok =
            response.dashboardresources.listResourceKelompok;
          this.totalResource = response.dashboardresources.totalResource
          for (var i = 0; i < listResourceKelompok.length; i++) {
            const a = [];
            a.push(listResourceKelompok[i].kelompok);
            a.push(listResourceKelompok[i].totalResourceKelompok);
            this.chartDataRbG.push(a);
          }
        })
        .catch((err) => err);
      response;
      this.sumtotalResource(this.totalResourceKelompok);
    },
  },
};
</script>
