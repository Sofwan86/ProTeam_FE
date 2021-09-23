<template>
  <div>
    <v-container>
      <v-row no-gutters>
        <v-col cols="12" sm="13" offset-sm="0.2">
          <v-card class="pa-2" offset-sm="3" outlined tile>
            <h1 class="pl-5 pt-3">Master Admin</h1>
            <v-tabs>
            <v-tab>User Management</v-tab>
            <v-tab-item>
                <UserManage> </UserManage>
            </v-tab-item>
            <v-tab>Mandays Vendor</v-tab>
            <v-tab-item>
                <MandaysVendor></MandaysVendor>
            </v-tab-item>
            <v-tab>Man Month</v-tab>
            <v-tab-item>
                <ManMonth></ManMonth>
            </v-tab-item>
            <v-tab>Lookup</v-tab>
            <v-tab-item>
                <Lookup> </Lookup>
            </v-tab-item>
          </v-tabs>
           
            
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import UserManage from "./UserManagement.vue"
import MandaysVendor from './MandaysVendor.vue'
import ManMonth from './ManMonth.vue'
import Lookup from './Lookup.vue'
export default {
  name: "masterAdmin",
  components:{
      UserManage,
      MandaysVendor,
      ManMonth,
      Lookup
  },
  data: () => ({
    
  }),
 
  methods: {
   },
};
</script>

<style lang="scss" scoped>
.v-progress-circular {
  margin: 1rem;
}
</style>
