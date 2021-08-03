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
          <h1>Master Admin</h1>
          <!-- <v-tabs>
            <v-tab>User Management</v-tab>
            <v-tab href="/mandaysvendor">Mandays Vendor</v-tab>
            <v-tab href="/lookup">Lookup</v-tab>
          </v-tabs> -->
          <v-row>
            <v-col>
              <h3>Data Mandays Vendor</h3>
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
                    + Create New User
                  </v-btn>
                </v-col>
                  </v-row>
                  <v-row>
                    <v-col>
                    <v-data-table
                      :headers="headers"
                      :items="mandaysvendor"
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
        name: 'MandaysVendor',
    data: () => ({
      tab: null,
      menus: [
          'Resource', 'Kelompok',
        ],
      headers: [
          {
            text: 'Vendor Name',
            align: 'start',
            sortable: true,
            value: 'nama',
          },
          { text: 'Contact', value: 'contact' },
          { text: 'Total Mandays', value: 'sumMandays' },
          { text: 'Usage Mandays', value: 'usageMandays' },
          { text: 'Avilable Mandays', value: 'avilableMandays' },
          { text: 'Status', value: 'status' },
          { text: 'Action', value: '' },
        ],
      mandaysvendor: [
        {
          nama: 'PT.ABC',
          npp: '12345678',
          email: 'marvinjanitra@gmail.com',
          username: 'marfin',
          contact: '081212786101',
          sumMandays: '1000',
          usageMandays: '400',
          avilableMandays: '600',
          kelompok: 'OFA',
          role: 'Front End Dev',
          skills: [
              'React', 'Vue', 'Java', 'Phyton'
          ],
          tipe: 'FTE',
        },
        {
          nama: 'PT.DEF',
          npp: '12345678',
          email: 'marvinjanitra@gmail.com',
          username: 'marfin',
          contact: '081212786101',
          sumMandays: '1000',
          usageMandays: '400',
          avilableMandays: '600',
          phone: '081212786101',
          kelompok: 'OFA',
          role: 'Front End Dev',
          skills: [
              'React', 'Vue', 'Java', 'Phyton'
          ],
          tipe: 'FTE',
        },  
        {
          nama: 'PT.HJK',
          npp: '12345678',
          email: 'marvinjanitra@gmail.com',
          username: 'marfin',
          contact: '081212786101',
          sumMandays: '1000',
          usageMandays: '400',
          avilableMandays: '600',
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
          text: 'Master Admin',
          disabled: false,
          href: '/usermanagement',
        },
        {
          text: 'Data Mandays Vendor',
          disabled: true,
          href: '/mandaysvendor',
        },
      ],
    }),
  }
</script>

<style lang="scss" scoped>
</style>