<template>
    <div>
    <v-breadcrumbs
      :items="items"
      divider="/"
    ></v-breadcrumbs>
  
  <v-container>
    <v-row no-gutters>
      <v-col
        cols="12"
        sm="13"
        offset-sm="0.2">
    
        <v-card class="pa-2" offset-sm="3" outlined tile>
          <h1>Profile</h1>
          <v-tabs>
            <v-tab disabled>Resource</v-tab>
            <v-tab>Kelompok</v-tab>
          </v-tabs>
          <v-row>
            <v-col>
              <h1>Kelompok Profile</h1>
            </v-col>
              <v-col
                  cols="12"
                  sm="4"
                  md="2"
                >
                  <v-text-field
                    label="Search"
                    outlined
                    dense
                    append-icon="mdi-file-find"
                  ></v-text-field>
                </v-col>
                
                  </v-row>
                  <v-row>
                    <v-col>
                    <v-data-table
                      :headers="headers"
                      :items="units"
                      :items-per-page="10"
                      class="elevation-1"
                      :footer-props="{
                      showFirstLastPage: true,
                      firstIcon: 'mdi-arrow-collapse-left',
                      lastIcon: 'mdi-arrow-collapse-right',
                      prevIcon: 'mdi-minus',
                      nextIcon: 'mdi-plus'
                    }"
                    >
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
        name: 'kelompokProfile',
    data: () => ({
      tab: null,
      menus: [
          'Resource', 'Kelompok',
        ],
      headers: [
          {
            text: 'Kelompok',
            align: 'start',
            sortable: true,
            value: 'kelompok',
          },
          { text: 'Skillset', value: 'skills' },
          { text: 'Total Pegawai', value: 'totalPeg' },
          { text: 'TotalManHour', value: 'totalMH' },
          { text: 'Status', value: 'status' },
          { text: 'Action', value: 'action', sortable: false,},
        ],
      units: [
        {
          totalPeg: '15',
          totalMH:'7',
          kelompok: 'OFA',
          skills: [
              'React', 'Vue', 'Java', 'Phyton'
          ],
          status: 'Active'
        },
        {
          totalPeg: '25',
          totalMH:'7',
          kelompok: 'TQC',
          skills: [
              'PHP', 'Vue', 'Java', 'DotNet'
          ],
        },
        {
          totalPeg: '20',
          totalMH:'7',
          kelompok: 'KVM',
          skills: [
              'NetCore', 'Vue', 'Java', 'Phyton'
          ],
        }
      ],
      
      items: [
        {
          text: 'Profile',
          disabled: false,
          href: 'breadcrumbs_dashboard',
        },
        {
          text: 'Kelompok',
          disabled: true,
          href: '/profile',
        },
      ],
    }),
  }
</script>

<style lang="scss" scoped>

</style>