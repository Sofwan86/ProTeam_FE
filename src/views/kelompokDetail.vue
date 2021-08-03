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
          <v-row>
            <v-col
              cols="12"
               md="6">
              <v-list-item two-line>
              <v-list-item-content>
              <v-list-item-title><h2>{{kelompok.nama}}</h2></v-list-item-title>
              <v-list-item-subtitle><h4>141414141414</h4></v-list-item-subtitle>
              <v-list-item-subtitle>Added 24 Januari 2021</v-list-item-subtitle>
              </v-list-item-content>
              </v-list-item>
            </v-col>
          </v-row>
            <v-row>
          <v-col cols="12"
               md="6"><h2>Information</h2
          ></v-col></v-row>
          <v-row>
            <v-col cols="4" md="3">
            
              <v-list-item two-line>
              <v-list-item-content>
              <v-list-item-subtitle>Skillset</v-list-item-subtitle>
              <v-list-item-title v-for="skill in skills"
                :key="skill">{{skill}}</v-list-item-title>
              </v-list-item-content>
              </v-list-item>
              <v-list-item two-line>
              <v-list-item-content>
              <v-list-item-subtitle>Status</v-list-item-subtitle>
              <v-list-item-title> </v-list-item-title>
              </v-list-item-content>
              </v-list-item>
            </v-col>
            <v-divider vertical></v-divider>
            <v-col cols="4" md="3">
              <v-list-item two-line>
              <v-list-item-content>
              <v-list-item-subtitle>Total Pegawai</v-list-item-subtitle>
              <v-list-item-title>{{totalPeg}}</v-list-item-title>
              </v-list-item-content>
              </v-list-item>
              <v-list-item two-line>
              <v-list-item-content>
              <v-list-item-subtitle>Total ManHour</v-list-item-subtitle>
              <v-list-item-title>{{totalMH}}</v-list-item-title>
              </v-list-item-content>
              </v-list-item>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row></v-container>
    <v-container>
    <v-row no-gutters>
      <v-col
        cols="12"
        sm="13"
        offset-sm="0.2">
        <v-card class="pa-2" offset-sm="3" outlined tile>
            <v-row>
                <v-col>
            <h2>Member</h2>
            <v-data-table
                      :headers="headers"
                      :items="resources"
                      :items-per-page="10"
                      class="elevation-1"
                      :footer-props="{
                      showFirstLastPage: true,
                      firstIcon: 'mdi-arrow-collapse-left',
                      lastIcon: 'mdi-arrow-collapse-right',
                      prevIcon: 'mdi-minus',
                      nextIcon: 'mdi-plus'
                    }"
                    ></v-data-table>
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
        name: 'kelompokdetail',
    data: () => ({
      kelompok: {
          nama: 'OFA'},
      skills: [
          'React ', 'Vue ', 'Java ', 'Phyton '
      ],
      totalMH: '107 Jam',
      totalPeg: '15',
      items: [
        {
          text: 'Profile',
          disabled: true,
          href: 'breadcrumbs_dashboard',
        },
        {
          text: 'Kelompok',
          disabled: false,
          href: '/kelompokProfile',
        },
        {
          text: 'Kelompok Profile',
          disabled: true,
          href: 'breadcrumbs_link_2',
        },
      ],
      headers: [
          {
            text: 'Name',
            align: 'start',
            sortable: true,
            value: 'nama',
          },
          { text: 'NPP', value: 'npp' },
          { text: 'Kelompok', value: 'kelompok' },
          { text: 'Role', value: 'role' },
          { text: 'Status', value: 'status' },
          { text: 'Action', value: 'action' },
        ],
      resources: [
        {
          nama: 'Marvin Janitra Akmal',
          npp: '12345678',
          email: 'marvinjanitra@gmail.com',
          phone: '081212786101',
          kelompok: 'OFA',
          role: 'Front End Dev',
          skills: [
              'React ', 'Vue ', 'Java ', 'Phyton '
          ],
          tipe: 'FTE',
        }
      ],
    }),
  }
</script>

<style lang="scss" scoped>

</style>