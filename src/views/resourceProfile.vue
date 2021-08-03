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
            <v-tab disabled>Kelompok</v-tab>
          </v-tabs>
          <v-row>
            <v-col>
              <h1>Resource Profile</h1>
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
                    href='/createNewResource'
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
                    sort-by="calories"
                    class="elevation-1"
                  >
                    <template v-slot:top>
                      <v-toolbar
                        flat
                      >
                        <v-toolbar-title><h2>Resource Profile</h2></v-toolbar-title>
                        <v-spacer></v-spacer>
                        <v-dialog
                          v-model="dialog"
                          max-width="500px"
                        >
                          <template v-slot:activator="{ on, attrs }">
                            <v-btn
                              color="primary"
                              dark
                              class="mb-2"
                              v-bind="attrs"
                              v-on="on"
                            >
                              + Create New Resource
                            </v-btn>
                          </template>
                          <v-card>
                            <v-card-title>
                              <span class="text-h5">{{ formTitle }}</span>
                            </v-card-title>

                            <v-card-text>
                              <v-container>
                                <v-row>
                                  <v-col
                                    cols="12"
                                    sm="6"
                                    md="4"
                                  >
                                    <v-text-field
                                      v-model="editedItem.nama"
                                      label="Nama"
                                      required
                                    ></v-text-field>
                                  </v-col>
                                  <v-col
                                    cols="12"
                                    sm="6"
                                    md="4"
                                  >
                                    <v-text-field
                                      v-model="editedItem.npp"
                                      label="NPP"
                                      required
                                    ></v-text-field>
                                  </v-col>
                                  <v-col
                                    cols="12"
                                    sm="6"
                                    md="4"
                                  >
                                    <v-text-field
                                      v-model="editedItem.kelompok"
                                      label="Kelompok"
                                    ></v-text-field>
                                  </v-col>
                                  <v-col
                                    cols="12"
                                    sm="6"
                                    md="4"
                                  >
                                    <v-text-field
                                      v-model="editedItem.role"
                                      label="Role"
                                    ></v-text-field>
                                  </v-col>
                                  <v-col
                                    cols="12"
                                    sm="6"
                                    md="4"
                                  >
                                    <v-combobox
                                      v-model="editedItem.status"
                                      label="Status"
                                      :items="status"
                                    ></v-combobox>
                                  </v-col>
                                </v-row>
                              </v-container>
                            </v-card-text>

                            <v-card-actions>
                              <v-spacer></v-spacer>
                              <v-btn
                                color="blue darken-1"
                                text
                                @click="close"
                              >
                                Cancel
                              </v-btn>
                              <v-btn
                                color="blue darken-1"
                                text
                                @click="save"
                              >
                                Save
                              </v-btn>
                            </v-card-actions>
                          </v-card>
                        </v-dialog>
                        <v-dialog v-model="dialogDelete" max-width="500px">
                          <v-card>
                            <v-card-title class="text-h5">Are you sure you want to delete this item?</v-card-title>
                            <v-card-actions>
                              <v-spacer></v-spacer>
                              <v-btn color="blue darken-1" text @click="closeDelete">Cancel</v-btn>
                              <v-btn color="blue darken-1" text @click="deleteItemConfirm">OK</v-btn>
                              <v-spacer></v-spacer>
                            </v-card-actions>
                          </v-card>
                        </v-dialog>
                      </v-toolbar>
                    </template>
                    <template v-slot:item.actions="{ item }">
                      <v-icon
                        small
                        class="mr-2"
                        @click="editItem(item)"
                      >
                        mdi-pencil
                      </v-icon>
                      <!-- <v-icon
                        small
                        @click="deleteItem(item)"
                      >
                        mdi-delete
                      </v-icon> -->
                    </template>
                    <!-- <template v-slot:no-data>
                      <v-btn
                        color="primary"
                        @click="initialize"
                      >
                        Reset
                      </v-btn>
                    </template> -->
                  </v-data-table>
                    </v-col>
                  </v-row>
                </v-card>
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
          >
        <template v-slot:[`item.action`]= "{ item }">
          <v-btn dense color="primary" @click="detailHandler(item)">Detail</v-btn>
          <v-btn dense color="gray" @click="editHandler(item)">Edit</v-btn>
        </template>
      </v-data-table>
      </v-col>
    </v-row>
  </v-container>
  </div>
</template>

<script>
    export default {
        name: 'resourceProfile',
    data: () => ({
      tab: null,
      menus: [
          'Resource', 'Kelompok',
        ],
      // headers: [
      //     {
      //       text: 'Name',
      //       align: 'start',
      //       sortable: true,
      //       value: 'nama',
      //     },
      //     { text: 'NPP', value: 'npp' },
      //     { text: 'Kelompok', value: 'kelompok' },
      //     { text: 'Role', value: 'role' },
      //     { text: 'Status', value: 'status' },
      //     { text: 'Action', value: '' },
        // ],
      // resources: [
      //   {
      //     nama: 'Marvin Janitra Akmal',
      //     npp: '12345678',
      //     email: 'marvinjanitra@gmail.com',
      //     phone: '081212786101',
      //     kelompok: 'OFA',
      //     role: 'Front End Dev',
      //     skills: [
      //         'React', 'Vue', 'Java', 'Phyton'
      //     ],
      //     tipe: 'FTE',
      //   }
      // ],
      
      items: [
        {
          text: 'Profile',
          disabled: false,
          href: 'breadcrumbs_dashboard',
        },
        {
          text: 'Resource',
          disabled: true,
          href: '/resourceProfile',
        },
      ],
      dialog: false,
      editedIndex: -1,
      dialogDelete: false,
      headers: [
        {
          text: 'Nama',
          align: 'start',
          sortable: true,
          value: 'nama',
        },
        { text: 'NPP', value: 'npp' },
        { text: 'Kelompok', value: 'kelompok' },
        { text: 'Role', value: 'role' },
        { text: 'Status', value: 'status' },
        { text: 'Action', value: 'action'},
      ],
      status: ['Active', 'Inactive'],
      resources: [],
      editedItem: {
        name: '',
        npp: '',
        kelompok: '',
        role: '',
        status: '',
      },
      defaultItem: {
        name: '',
        npp: '',
        kelompok: '',
        role: '',
        status: '',
      },
      detailID:'',
      editID:''
    }),

    computed: {
      formTitle () {
        return this.editedIndex === -1 ? 'Create New Resource' : 'Edit Item'
      },
    },

    watch: {
      dialog (val) {
        val || this.close()
      },
      // dialogDelete (val) {
      //   val || this.closeDelete()
      // },
    },

    created () {
      this.initialize()
    },

    methods: {
      initialize () {
        this.resources = [
          {
            nama: 'Marvin Janitra Akmal',
            npp: '12341234',
            kelompok: 'OFA',
            role: 'FrontEnd Dev',
            status: 'Active',
          },
          {
            nama: 'Sofwan',
            npp: '12312312',
            kelompok: 'TQC',
            role: 'FrontEnd Dev',
            status: 'Active',
          },
          {
            nama: 'Jamal',
            npp: '12351235',
            kelompok: 'KVM',
            role: 'Backend Dev',
            status: 'Inactive',
          },
          {
            nama: 'Budi',
            npp: '12351236',
            kelompok: 'ABC',
            role: 'Orson',
            status: 'Inactive',
          },
        ]
      },
      detailHandler(item){
        this.detailID=item;
        this.$router.push("/resourceDetail")
      },
      editHandler(item){
        this.editID=item;
        this.$router.push("/editResource")
      },
      editItem (item) {
        this.editedIndex = this.resources.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialog = true
      },

      // deleteItem (item) {
      //   this.editedIndex = this.resources.indexOf(item)
      //   this.editedItem = Object.assign({}, item)
      //   this.dialogDelete = true
      // },

      // deleteItemConfirm () {
      //   this.resources.splice(this.editedIndex, 1)
      //   this.closeDelete()
      // },

      close () {
        this.dialog = false
        this.$nextTick(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        })
      },

      // closeDelete () {
      //   this.dialogDelete = false
      //   this.$nextTick(() => {
      //     this.editedItem = Object.assign({}, this.defaultItem)
      //     this.editedIndex = -1
      //   })
      // },

      save () {
        if (this.editedIndex > -1) {
          Object.assign(this.resources[this.editedIndex], this.editedItem)
        } else {
          this.resources.push(this.editedItem)
        }
        this.close()
      },
    },
    }
  
</script>

<style lang="scss" scoped>

</style>
