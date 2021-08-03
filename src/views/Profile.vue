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
            <v-tab>Resource</v-tab>
            <v-tab href="/kelompokprofile">Kelompok</v-tab>
          </v-tabs>
          <v-row>
            <v-col>
              <h2>Resource Profile</h2>
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
                <v-col
                  cols="3"
                  sm="2"
                  md="3">
                  <v-btn
                    color="primary"
                    dark
                    href='/createresource'
                  >
                    + Create New Resource
                  </v-btn>
                </v-col>
                  </v-row>
                  <v-row>
                    <v-col>
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
        name: 'Profile',
    data: () => ({
      tab: null,
      menus: [
          'Resource', 'Kelompok',
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
          { text: 'Action', value: '' },
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
              'React', 'Vue', 'Java', 'Phyton'
          ],
          tipe: 'FTE',
        },
        {
          nama: 'Marvin Janitra Akmal',
          npp: '12345678',
          email: 'marvinjanitra@gmail.com',
          phone: '081212786101',
          kelompok: 'OFA',
          role: 'Front End Dev',
          skills: [
              'React', 'Vue', 'Java', 'Phyton'
          ],
          tipe: 'FTE',
        },
        {
          nama: 'Marvin Janitra Akmal',
          npp: '12345678',
          email: 'marvinjanitra@gmail.com',
          phone: '081212786101',
          kelompok: 'OFA',
          role: 'Front End Dev',
          skills: [
              'React', 'Vue', 'Java', 'Phyton'
          ],
          tipe: 'FTE',
        }
      ],
      
      items: [
        {
          text: 'Profile',
          disabled: false,
          href: 'breadcrumbs_dashboard',
        },
        {
          text: 'Resource',
          disabled: true,
          href: '/profile',
        },
      ],
    }),
  }
</script>

<style lang="scss" scoped>
</style>