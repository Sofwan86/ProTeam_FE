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
                    sort-by="nama"
                    class="elevation-1"
                  >
                    <template v-slot:top>
                     
                        <v-spacer></v-spacer>
                        <v-dialog
                          v-model="dialog"
                          max-width="1000px"
                        >
                          <template v-slot:activator="{ on, attrs }">
                            <!-- <v-btn
                              color="primary"
                              dark
                              class="mb-2"
                              v-bind="attrs"
                              v-on="on"
                            >
                              + Create New Resource
                            </v-btn> -->
                          </template>
                          <v-card>
                            <v-card-title>
                              <span class="text-h5"><h2>{{ formTitle }}</h2></span>
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
                                      readonly
                                      disabled
                                    ></v-text-field>
                                  </v-col>
                                  <v-col
                                    cols="12"
                                    sm="6"
                                    md="4"
                                  >
                                    <v-text-field
                                      v-model="editedItem.jenjab"
                                      label="Jenjang Jabatan"
                                      required
                                    ></v-text-field>
                                  </v-col>
                                  <v-col
                                    cols="12"
                                    sm="6"
                                    md="4"
                                  >
                                    <v-text-field
                                      v-model="editedItem.phone"
                                      label="Phone Number"
                                      required
                                    ></v-text-field>
                                  </v-col>
                                  <v-col
                                    cols="12"
                                    sm="6"
                                    md="4"
                                  >
                                    <v-text-field
                                      v-model="editedItem.email"
                                      label="Email"
                                      required
                                    ></v-text-field>
                                  </v-col>
                                  <v-col
                                    cols="12"
                                    sm="6"
                                    md="4"
                                  >
                                    <v-text-field
                                      v-model="editedItem.tipe"
                                      label="Resource Type"
                                      required
                                    ></v-text-field>
                                  </v-col>
                                  <v-col
                                    cols="12"
                                    sm="6"
                                    md="4"
                                  >
                                    <v-text-field
                                      v-model="editedItem.manhour"
                                      label="ManHour/Day"
                                      required
                                    ></v-text-field>
                                  </v-col>
                                  <v-col
                                    cols="12"
                                    sm="6"
                                    md="4"
                                  >
                                    <v-combobox
                                      v-model="editedItem.skills"
                                      label="Skills"
                                      :items="skills"
                                      multiple
                                      small-chips
                                    ></v-combobox>
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
                                  <v-menu
                                  v-model="menu2"
                                  :close-on-content-click="false"
                                  transition="scale-transition"
                                  offset-y
                                  max-width="290px"
                                  min-width="auto"
                                  >
                                  <template v-slot:activator="{ on, attrs }">
                                      <v-text-field
                                      v-model="dateActive"
                                      label="Activate Date"
                                      hint="MM/DD/YYYY format"
                                      persistent-hint
                                      prepend-icon="mdi-calendar"
                                      readonly
                                      v-bind="attrs"
                                      v-on="on"
                                      ></v-text-field>
                                  </template>
                                  <v-date-picker
                                      v-model="date"
                                      no-title
                                      @input="menu2 = false"
                                  ></v-date-picker>
                                  </v-menu>
                                  </v-col>
                                  <v-col
                                    cols="12"
                                    sm="6"
                                    md="4"
                                  >
                                  <v-menu
                                  v-model="menu3"
                                  :close-on-content-click="false"
                                  transition="scale-transition"
                                  offset-y
                                  max-width="290px"
                                  min-width="auto"
                                  >
                                  <template v-slot:activator="{ on, attrs }">
                                      <v-text-field
                                      v-model="dateLast"
                                      label="Last Working Date"
                                      hint="MM/DD/YYYY format"
                                      persistent-hint
                                      prepend-icon="mdi-calendar"
                                      readonly
                                      v-bind="attrs"
                                      v-on="on"
                                      ></v-text-field>
                                  </template>
                                  <v-date-picker
                                      v-model="date2"
                                      no-title
                                      @input="menu3 = false"
                                  ></v-date-picker>
                                  </v-menu>
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
                    </template>
                    <template v-slot:item.action="{ item }">
                      <v-btn dense 
                      color="primary" 
                      @click="detailHandler(item)">Detail</v-btn>
                      <v-btn dense 
                      color="gray" 
                      @click="editItem(item)">Edit</v-btn>
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
    data: vm => ({
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
          disabled: true,
          href: 'breadcrumbs_dashboard',
        },
        {
          text: 'Resource',
          disabled: false,
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
      skills: ['React', 'Vue', 'Java', 'Phyton'],
      kelompok: [''],
      tipe: [''],
      role: [''],
      jenjab: [''],
      resources: [],
      editedItem: {
        nama: '',
        npp: '',
        email:'',
        phone:'',
        skills:[
          ''
        ],
        dateActive: '',
        dateLast: '',
        jenjab: '',
        kelompok: '',
        tipe:'',
        role: '',
        status: '',
      },
      defaultItem: {
        nama: '',
        npp: '',
        email:'',
        phone:'',
        skills:[
          ''
        ],
        dateActive: '',
        dateLast: '',
        jenjab: '',
        kelompok: '',
        tipe:'',
        role: '',
        status: '',
      },
      detailID: {
        
      },
      editID:'',
      date: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
      date2: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
      dateFormatted: vm.formatDate((new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10)),
      menu3: false,
      menu2: false,
    }),

    computed: {
      formTitle () {
        return this.editedIndex === -1 ? 'Create New Resource' : 'Edit Resource'
      },
      dateActive () {
        return this.formatDate(this.date)
      },
      dateLast () {
        return this.formatDate(this.date2)
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
            email:'marvinjanitra@gmail.com',
            phone:'081212786101',
            skills:[
              'Google','Ms. Office'
            ],
            jenjab: 'AMGR',
            kelompok: 'OFA',
            tipe:'FTE',
            role: 'FrontEnd Developer',
            status: 'Active',
          },
          {
            nama: 'Sofwan',
            npp: '12341235',
            email:'sofwan@gmail.com',
            phone:'081287126382',
            skills:[
              'Google','React','Vue'
            ],
            jenjab: 'MGR',
            kelompok: 'TQC',
            tipe:'FTE',
            role: 'FrontEnd Developer',
            status: 'Active',
          },
          {
            nama: 'Jamal Udin',
            npp: '12341226',
            email:'jamalnaxgenkmotor@gmail.com',
            phone:'081256781234',
            skills:[
              'Riding','Drag','Stoopie'
            ],
            jenjab: 'OS',
            kelompok: 'KVM',
            tipe:'XTC',
            role: 'FrontEnd Infantry',
            status: 'Active',
          },
          {
            nama: 'Solehudin',
            npp: '12341214',
            email:'udinsolehbanget@gmail.com',
            phone:'081212344532',
            skills:[
              'Solat','Ngaji','Doa'
            ],
            jenjab: 'Staff',
            kelompok: 'MJD',
            tipe:'MBT',
            role: 'Marbot',
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
      formatDate (date) {
        if (!date) return null

        const [year, month, day] = date.split('-')
        return `${month}/${day}/${year}`
      },
    },
    }
  
</script>

<style lang="scss" scoped>

</style>
