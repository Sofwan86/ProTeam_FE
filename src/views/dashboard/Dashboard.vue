<template>
  <v-app>
    <v-breadcrumbs :items="items" divider="/"></v-breadcrumbs>
    <v-row>
      <v-col>
        <v-card class="mx-auto" color="#17A2B8" dark max-width="500">
          <v-row>
            <v-col>
              <h1 class="text-center">100</h1>
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
              <h1 class="text-center">100</h1>
              <v-card-text class="text-center font-weight-bold"
                >Total Vendor
              </v-card-text>
            </v-col>
            <v-divider vertical inset color="#FFF"></v-divider>
            <v-col>
              <h1 class="text-center">100</h1>
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
        <v-card  max-width="500" class="mx-auto" dark>
          <h3 class="text-center" >Resource by Role</h3>
        </v-card>
        <v-card max-width="500"  class="mx-auto">
          <GChart
            type="ColumnChart"
            :data="chartDataRbG"
            :options="chartOptions"
          />
        </v-card>
      </v-col>
      <v-col>
        <v-card  max-width="500" class="mx-auto" dark>
          <h3 class="text-center" >Resource by Group</h3>
        </v-card>
        <v-card max-width="500" class="mx-auto">
          <GChart
            
            type="ColumnChart"
            :data="chartDataRbR"
            :options="chartOptions"
          />
        </v-card>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-card  max-width="500" class="mx-auto" dark>
          <h3 class="text-center" >Resource Type</h3>
        </v-card>
        <v-card max-width="500"  class="mx-auto">
          <GChart
            type="PieChart"
            :data="chartDataRT"
            :options="chartOptions"
          />
        </v-card>
      </v-col>
      <v-col>
        <v-card  max-width="500" class="mx-auto" dark>
          <h3 class="text-center" >Mandays by Vendor</h3>
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
export default {
  name: "",
  data() {
    return {
      chartDataRbR: [
        ["Role", "Jumlah"],
        ["Programmer", 30],
        ["Tester", 50],
        ["Business Analiyst", 20],
      ],
      chartDataRbG: [
        ["Group", "Jumlah"],
        ["KVM", 30],
        ["OFA", 50],
        ["TQC", 20],
      ],
      chartDataRT: [
        ["Group", "Jumlah"],
        ["FTE", 30],
        ["OS", 70],
      ],
      chartDataMbV: [
        ["Group", "Jumlah"],
        ["PT.ABC", 300],
        ["PT.DEV", 700],
        ["PT.GHJ", 400],
      ],
      chartOptions: {
        chart: {
          title: "Resource bt Group",
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
    };
  },
};
</script>
