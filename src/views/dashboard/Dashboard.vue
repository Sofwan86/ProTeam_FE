<template>
<div>
    <v-breadcrumbs
      :items="items"
      divider="/"
    ></v-breadcrumbs>
  <v-container>
    <v-row>
      <v-col cols="12"
            md="6"
      >
        <v-sheet
            :rounded="rounded"
            class="text-center"
            color="blue lighten-2"
            height="100"
            width="500"
          >
          <v-row>
            <v-col justify-self="1">
          <h2 class="white--text" color="#FFF">{{totalR}}</h2>
          <p class="white--text" color="#FFF">Total Resource</p>
            </v-col>
          </v-row>
          </v-sheet>
          
      </v-col>
      <v-col cols="12"
            md="6">
        <v-sheet
            :rounded="rounded"
            class="text-center"
            color="green lighten-2"

            height="100"
            width="500"
          >
          <v-row>
            <v-col>
              <h2 class="white--text" color="#FFF">{{totalV}}</h2>
              <p class="white--text" color="#FFF">Total Vendor</p>
            </v-col>
            <v-divider vertical inset
                        color="#FFF"></v-divider>
            <v-col>
              <h2 class="white--text" color="#FFF">{{totalMD}}</h2>
              <p class="white--text" color="#FFF">Total Mandays</p>
            </v-col>
          </v-row>
          </v-sheet>
      </v-col>
      <h4>
        Dashboard
    </h4>
    </v-row>
  </v-container>
</div>
</template>

<script>
export default {
  name: "dashboard",
   data: () => ({
     totalR: "100",
     totalV: "2",
     totalMD: "1000",
    items: [
        {
          text: 'Dashboard',
          disabled: true,
          href: '/dashboard',
        },
      ],
  })
  }

</script>

<style lang="scss" scoped>
</style>