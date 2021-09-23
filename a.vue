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
          <v-tabs>
            <v-tab>User Management</v-tab>
            <v-tab href="/mandaysvendor">Mandays Vendor</v-tab>
            <v-tab href="/lookup">Lookup</v-tab>
          </v-tabs>
          <v-row>
            <v-col>
              <h2>User Management</h2>
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
                      :items="users"
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
        name: 'UserManagement',
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
          { text: 'Username', value: 'username' },
          { text: 'Email', value: 'email' },
          { text: 'Status', value: 'status' },
          { text: 'Action', value: '' },
        ],
      users: [
        {
          nama: 'Marvin Janitra Akmal',
          npp: '12345678',
          email: 'marvinjanitra@gmail.com',
          username: 'marfin',
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
          username: 'marfin',
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
          username: 'marfin',
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
          text: 'User Management',
          disabled: true,
          href: '/usermanagement',
        },
      ],
    }),
  }
</script>

<style lang="scss" scoped>
</style>