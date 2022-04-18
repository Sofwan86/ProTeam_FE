<template>
  <div>
    <v-row>
      <v-btn class="hidden-md-and-up" href="/dashboard" fab large plain>
        <v-icon>mdi-home</v-icon>
      </v-btn>
    </v-row>
    <v-container>
      <v-row no-gutters>
        <v-col cols="12" sm="13" offset-sm="0.2">
          <v-card class="pa-2" offset-sm="3" outlined tile>
            <h1 class="mx-4">Profile</h1>
            <v-tabs>
              <v-tab>Resource</v-tab>
              <v-tab-item>
                <Resource></Resource>
              </v-tab-item>
              <v-tab>Kelompok</v-tab>
              <v-tab-item><Kelompok></Kelompok> </v-tab-item>
            </v-tabs>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import Resource from "./ResourceProfile.vue";
import Kelompok from "./UnitProfile.vue";

export default {
  name: "Profile",
  components: {
    Resource,
    Kelompok,
  },
  data: () => ({
    items: [
      {
        text: "Profile",
        disabled: true,
        href: "/",
      },
      {
        text: "Kelompok Profile",
        disabled: true,
        href: "/",
      },
    ],
  }),

  methods: {},
};
</script>

<style lang="scss" scoped>
</style>