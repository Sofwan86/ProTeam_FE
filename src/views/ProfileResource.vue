<template>
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
              <v-list-item-title><h2>{{nama}}</h2></v-list-item-title>
              <v-list-item-subtitle><h4>{{npp}}</h4></v-list-item-subtitle>
              <v-list-item-subtitle>Added 24 Januari 2021</v-list-item-subtitle>
              </v-list-item-content>
              </v-list-item>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="4" md="3">
              <v-list-item two-line>
              <v-list-item-content>
              <v-list-item-subtitle>Name</v-list-item-subtitle>
              <v-list-item-title>{{nama}}</v-list-item-title>
              </v-list-item-content>
              </v-list-item>
              <v-list-item two-line>
              <v-list-item-content>
              <v-list-item-subtitle>NPP</v-list-item-subtitle>
              <v-list-item-title>{{npp}}</v-list-item-title>
              </v-list-item-content>
              </v-list-item>
              <v-list-item two-line>
              <v-list-item-content>
              <v-list-item-subtitle>Email</v-list-item-subtitle>
              <v-list-item-title>{{email}}</v-list-item-title>
              </v-list-item-content>
              </v-list-item>
              <v-list-item two-line>
              <v-list-item-content>
              <v-list-item-subtitle>Phone Number</v-list-item-subtitle>
              <v-list-item-title>{{phone}}</v-list-item-title>
              </v-list-item-content>
              </v-list-item>
            </v-col>
            <v-divider vertical></v-divider>
            <v-col cols="4" md="3">
              <v-list-item two-line>
              <v-list-item-content>
              <v-list-item-subtitle>Active Date</v-list-item-subtitle>
              <v-list-item-title>26 Juni 2021</v-list-item-title>
              </v-list-item-content>
              </v-list-item>
              <v-list-item two-line>
              <v-list-item-content>
              <v-list-item-subtitle>Kelompok</v-list-item-subtitle>
              <v-list-item-title>{{kelompok}}</v-list-item-title>
              </v-list-item-content>
              </v-list-item>
              <v-list-item two-line>
              <v-list-item-content>
              <v-list-item-subtitle>Skillset</v-list-item-subtitle>
              <v-list-item-title v-for="skill in skills"
                :key="skill">{{skill}}</v-list-item-title>
              </v-list-item-content>
              </v-list-item>
              <v-list-item two-line>
              <v-list-item-content>
              <v-list-item-subtitle>Manhour/Day</v-list-item-subtitle>
              <v-list-item-title> </v-list-item-title>
              </v-list-item-content>
              </v-list-item>
            </v-col>
            <v-col cols="4" md="3">
              <v-list-item two-line>
              <v-list-item-content>
              <v-list-item-subtitle>Last Working Date</v-list-item-subtitle>
              <v-list-item-title> </v-list-item-title>
              </v-list-item-content>
              </v-list-item>
              <v-list-item two-line>
              <v-list-item-content>
              <v-list-item-subtitle>Resource Type</v-list-item-subtitle>
              <v-list-item-title>{{tipe}}</v-list-item-title>
              </v-list-item-content>
              </v-list-item>
              <v-list-item two-line>
              <v-list-item-content>
              <v-list-item-subtitle>Jenjang Jabatan</v-list-item-subtitle>
              <v-list-item-title> </v-list-item-title>
              </v-list-item-content>
              </v-list-item>
              <v-list-item two-line>
              <v-list-item-content>
              <v-list-item-subtitle>Total Manhour</v-list-item-subtitle>
              <v-list-item-title> </v-list-item-title>
              </v-list-item-content>
              </v-list-item>
            </v-col>
            <v-col cols="3" md="2">
              <v-list-item two-line>
              <v-list-item-content>
              <v-list-item-subtitle>Status</v-list-item-subtitle>
              <v-list-item-title> </v-list-item-title>
              </v-list-item-content>
              </v-list-item>
              <v-list-item two-line>
              <v-list-item-content>
              <v-list-item-subtitle>Role</v-list-item-subtitle>
              <v-list-item-title> </v-list-item-title>
              </v-list-item-content>
              </v-list-item>
              <v-list-item two-line>
              <v-list-item-content>
              <v-list-item-subtitle>Project Experience</v-list-item-subtitle>
              <v-list-item-title> </v-list-item-title>
              </v-list-item-content>
              </v-list-item>
              <v-list-item two-line>
              <v-list-item-content>
              <v-list-item-subtitle>Pricing</v-list-item-subtitle>
              <v-list-item-title> </v-list-item-title>
              </v-list-item-content>
              </v-list-item>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
    export default {
        name: 'ProfileResource',
    data: () => ({
      nama: 'Marvin Janitra Akmal',
      npp: '12345678',
      email: 'marvinjanitra@gmail.com',
      phone: '081212786101',
      kelompok: 'OFA',
      skills: [
          'React', 'Vue', 'Java', 'Phyton'
      ],
      tipe: 'FTE'

    }),
  }
</script>

<style lang="scss" scoped>

</style>