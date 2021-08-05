<template>
  <div>
    <v-breadcrumbs :items="items" divider="/"></v-breadcrumbs>
    <v-container>
      <v-row no-gutters>
        <v-col cols="12" sm="13" offset-sm="0.2">
          <v-card class="pa-2" offset-sm="3" outlined tile>
            <h1>Profile</h1>
            <v-tabs>
              <v-tab>Resource</v-tab>
              <v-tab disabled>Kelompok</v-tab>
            </v-tabs>
            <v-row>
              <v-col>
                <v-data-table
                  :headers="headers"
                  :items="resources"
                  sort-by="nama"
                  class="elevation-1"
                >
                  <template v-slot:top>
                    <v-toolbar flat>
                      <v-toolbar-title
                        ><h1>Resource Profile</h1></v-toolbar-title
                      >
                      <v-spacer></v-spacer>
                      <div class="pa-5" max-width:100>
                        <v-text-field
                          outlined
                          v-model="search"
                          append-icon="mdi-magnify"
                          label="Search"
                          single-line
                          hide-details
                        ></v-text-field>
                      </div>
                      <v-dialog v-model="dialog" max-width="1000px">
                        <template v-slot:activator="{ on, attrs }">
                          <v-btn color="primary" dark v-bind="attrs" v-on="on">
                            + Create New Resource
                          </v-btn>
                        </template>
                        <v-card>
                          <v-card-title>
                            <span class="text-h5"
                              ><h2>{{ formTitle }}</h2></span
                            >
                          </v-card-title>
                          <v-card-text>
                            <v-container>
                              <v-row>
                                <v-col cols="12" sm="6" md="4">
                                  <v-text-field
                                    v-model="editedItem.nama"
                                    label="Nama"
                                    required
                                  ></v-text-field>
                                </v-col>
                                <v-col cols="12" sm="6" md="4">
                                  <v-text-field
                                    v-model="editedItem.npp"
                                    label="NPP"
                                    required
                                  ></v-text-field>
                                </v-col>
                                <v-col cols="12" sm="6" md="4">
                                  <v-text-field
                                    v-model="editedItem.jenjab"
                                    label="Jenjang Jabatan"
                                    required
                                  ></v-text-field>
                                </v-col>
                                <v-col cols="12" sm="6" md="4">
                                  <v-text-field
                                    v-model="editedItem.phone"
                                    label="Phone Number"
                                    required
                                  ></v-text-field>
                                </v-col>
                                <v-col cols="12" sm="6" md="4">
                                  <v-text-field
                                    v-model="editedItem.email"
                                    label="Email"
                                    required
                                  ></v-text-field>
                                </v-col>
                                <v-col cols="12" sm="6" md="4">
                                  <v-text-field
                                    v-model="editedItem.tipe"
                                    label="Resource Type"
                                    required
                                  ></v-text-field>
                                </v-col>
                                <v-col cols="12" sm="6" md="4">
                                  <v-text-field
                                    v-model="editedItem.manhour"
                                    label="ManHour/Day"
                                    required
                                  ></v-text-field>
                                </v-col>
                                <v-col cols="12" sm="6" md="4">
                                  <v-combobox
                                    v-model="editedItem.skills"
                                    label="Skills"
                                    :items="skills"
                                    multiple
                                    small-chips
                                  ></v-combobox>
                                </v-col>
                                <v-col cols="12" sm="6" md="4">
                                  <v-text-field
                                    v-model="editedItem.kelompok"
                                    label="Kelompok"
                                  ></v-text-field>
                                </v-col>
                                <v-col cols="12" sm="6" md="4">
                                  <v-text-field
                                    v-model="editedItem.role"
                                    label="Role"
                                  ></v-text-field>
                                </v-col>
                                <v-col cols="12" sm="6" md="4">
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
                                <v-col cols="12" sm="6" md="4">
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
                                <v-col cols="12" sm="6" md="4">
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
                            <v-btn color="blue darken-1" text @click="close">
                              Cancel
                            </v-btn>
                            <v-btn color="blue darken-1" text @click="save">
                              Save
                            </v-btn>
                          </v-card-actions>
                        </v-card>
                      </v-dialog>
                      <v-dialog v-model="dialogDelete" max-width="1100px">
                        <v-card>
                          <v-row no-gutters>
                            <v-col cols="12" sm="13" offset-sm="0.2">
                              <v-card class="pa-2" offset-sm="3" outlined tile>
                                <v-row>
                                  <v-col cols="12" md="6">
                                    <v-list-item two-line>
                                      <v-list-item-content>
                                        <v-list-item-title
                                          ><h2>
                                            {{ editedItem.nama }}
                                          </h2></v-list-item-title
                                        >
                                        <v-list-item-subtitle
                                          ><h4>
                                            {{ editedItem.npp }}
                                          </h4></v-list-item-subtitle
                                        >
                                        <v-list-item-subtitle
                                          >Added 24 Januari
                                          2021</v-list-item-subtitle
                                        >
                                      </v-list-item-content>
                                    </v-list-item>
                                  </v-col>
                                </v-row>
                                <v-row>
                                  <v-col cols="4" md="3">
                                    <v-list-item two-line>
                                      <v-list-item-content>
                                        <v-list-item-subtitle
                                          >Name</v-list-item-subtitle
                                        >
                                        <v-list-item-title>{{
                                          editedItem.nama
                                        }}</v-list-item-title>
                                      </v-list-item-content>
                                    </v-list-item>
                                    <v-list-item two-line>
                                      <v-list-item-content>
                                        <v-list-item-subtitle
                                          >NPP</v-list-item-subtitle
                                        >
                                        <v-list-item-title>{{
                                          editedItem.npp
                                        }}</v-list-item-title>
                                      </v-list-item-content>
                                    </v-list-item>
                                    <v-list-item two-line>
                                      <v-list-item-content>
                                        <v-list-item-subtitle
                                          >Email</v-list-item-subtitle
                                        >
                                        <v-list-item-title>{{
                                          editedItem.email
                                        }}</v-list-item-title>
                                      </v-list-item-content>
                                    </v-list-item>
                                    <v-list-item two-line>
                                      <v-list-item-content>
                                        <v-list-item-subtitle
                                          >Phone Number</v-list-item-subtitle
                                        >
                                        <v-list-item-title>{{
                                          editedItem.phone
                                        }}</v-list-item-title>
                                      </v-list-item-content>
                                    </v-list-item>
                                  </v-col>
                                  <v-divider vertical></v-divider>
                                  <v-col cols="4" md="3">
                                    <v-list-item two-line>
                                      <v-list-item-content>
                                        <v-list-item-subtitle
                                          >Active Date</v-list-item-subtitle
                                        >
                                        <v-list-item-title
                                          >{{ editedItem.dateActive }}
                                        </v-list-item-title>
                                      </v-list-item-content>
                                    </v-list-item>
                                    <v-list-item two-line>
                                      <v-list-item-content>
                                        <v-list-item-subtitle
                                          >Kelompok</v-list-item-subtitle
                                        >
                                        <v-list-item-title>{{
                                          editedItem.kelompok
                                        }}</v-list-item-title>
                                      </v-list-item-content>
                                    </v-list-item>
                                    <v-list-item two-line>
                                      <v-list-item-content>
                                        <v-list-item-subtitle
                                          >Skillset</v-list-item-subtitle
                                        >
                                        <v-list-item-title
                                          v-for="skill in editedItem.skills"
                                          :key="skill"
                                          >{{ skill }}</v-list-item-title
                                        >
                                      </v-list-item-content>
                                    </v-list-item>
                                    <v-list-item two-line>
                                      <v-list-item-content>
                                        <v-list-item-subtitle
                                          >Manhour/Day</v-list-item-subtitle
                                        >
                                        <v-list-item-title>{{
                                          editedItem.manhour
                                        }}</v-list-item-title>
                                      </v-list-item-content>
                                    </v-list-item>
                                  </v-col>
                                  <v-col cols="4" md="3">
                                    <v-list-item two-line>
                                      <v-list-item-content>
                                        <v-list-item-subtitle
                                          >Last Working
                                          Date</v-list-item-subtitle
                                        >
                                        <v-list-item-title>{{
                                          editedItem.dateLast
                                        }}</v-list-item-title>
                                      </v-list-item-content>
                                    </v-list-item>
                                    <v-list-item two-line>
                                      <v-list-item-content>
                                        <v-list-item-subtitle
                                          >Resource Type</v-list-item-subtitle
                                        >
                                        <v-list-item-title>{{
                                          editedItem.tipe
                                        }}</v-list-item-title>
                                      </v-list-item-content>
                                    </v-list-item>
                                    <v-list-item two-line>
                                      <v-list-item-content>
                                        <v-list-item-subtitle>
                                          Jenjang Jabatan</v-list-item-subtitle
                                        >
                                        <v-list-item-title>{{
                                          editedItem.jenjab
                                        }}</v-list-item-title>
                                      </v-list-item-content>
                                    </v-list-item>
                                    <v-list-item two-line>
                                      <v-list-item-content>
                                        <v-list-item-subtitle
                                          >Total Manhour</v-list-item-subtitle
                                        >
                                        <v-list-item-title>{{
                                          editedItem.totalMH
                                        }}</v-list-item-title>
                                      </v-list-item-content>
                                    </v-list-item>
                                  </v-col>
                                  <v-col cols="3" md="2">
                                    <v-list-item two-line>
                                      <v-list-item-content>
                                        <v-list-item-subtitle
                                          >Status</v-list-item-subtitle
                                        >
                                        <v-list-item-title>{{
                                          editedItem.status
                                        }}</v-list-item-title>
                                      </v-list-item-content>
                                    </v-list-item>
                                    <v-list-item two-line>
                                      <v-list-item-content>
                                        <v-list-item-subtitle
                                          >Role</v-list-item-subtitle
                                        >
                                        <v-list-item-title>{{
                                          editedItem.role
                                        }}</v-list-item-title>
                                      </v-list-item-content>
                                    </v-list-item>
                                    <v-list-item two-line>
                                      <v-list-item-content>
                                        <v-list-item-subtitle
                                          >Project
                                          Experience</v-list-item-subtitle
                                        >
                                        <v-list-item-title>
                                          Progo
                                        </v-list-item-title>
                                      </v-list-item-content>
                                    </v-list-item>
                                    <v-list-item two-line>
                                      <v-list-item-content>
                                        <v-list-item-subtitle
                                          >Pricing</v-list-item-subtitle
                                        >
                                        <v-list-item-title>{{
                                          editedItem.price
                                        }}</v-list-item-title>
                                      </v-list-item-content>
                                    </v-list-item>
                                  </v-col>
                                </v-row>
                              </v-card>
                            </v-col>
                          </v-row>
                          <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn
                              color="blue darken-1"
                              text
                              @click="closeDelete"
                            >
                              Close
                            </v-btn>
                          </v-card-actions>
                        </v-card>
                      </v-dialog>
                    </v-toolbar>
                  </template>
                  <template v-slot:item.action="{ item }">
                    <v-btn dense color="primary" @click="deleteItem(item)"
                      >Detail</v-btn
                    >
                    <v-btn dense color="gray" @click="editItem(item)"
                      >Edit</v-btn
                    >
                  </template>
                </v-data-table>
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
  name: "resourceProfile",
  data: (vm) => ({
    tab: null,
    menus: ["Resource", "Kelompok"],
    items: [
      {
        text: "Profile",
        disabled: true,
        href: "breadcrumbs_dashboard",
      },
      {
        text: "Resource",
        disabled: false,
        href: "/resourceProfile",
      },
    ],
    dialog: false,
    editedIndex: -1,
    dialogDetail: false,
    headers: [
      {
        text: "Nama",
        align: "start",
        sortable: true,
        value: "nama",
      },
      { text: "NPP", value: "npp" },
      { text: "Kelompok", value: "kelompok" },
      { text: "Role", value: "role" },
      { text: "Status", value: "status" },
      { text: "Action", value: "action" },
    ],
    status: ["Active", "Inactive"],
    skills: ["React", "Vue", "Java", "Phyton"],
    kelompok: [""],
    tipe: [""],
    role: [""],
    jenjab: [""],
    resources: [],
    editedItem: {
      nama: "",
      npp: "",
      email: "",
      phone: "",
      skills: [""],
      dateActive: "",
      dateLast: "",
      jenjab: "",
      kelompok: "",
      tipe: "",
      role: "",
      status: "",
      price: "",
    },
    defaultItem: {
      nama: "",
      npp: "",
      email: "",
      phone: "",
      skills: [""],
      dateActive: "",
      dateLast: "",
      jenjab: "",
      kelompok: "",
      tipe: "",
      role: "",
      status: "",
      price: "",
    },
    detailItem: {
      nama: "",
      npp: "",
      email: "",
      phone: "",
      skills: [""],
      dateActive: "",
      dateLast: "",
      jenjab: "",
      kelompok: "",
      tipe: "",
      role: "",
      status: "",
    },
    detailID: {},
    editID: "",
    date: new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
      .toISOString()
      .substr(0, 10),
    date2: new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
      .toISOString()
      .substr(0, 10),
    dateFormatted: vm.formatDate(
      new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
        .toISOString()
        .substr(0, 10)
    ),
    menu3: false,
    menu2: false,
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "Create New Resource" : "Edit Resource";
    },
    dateActive() {
      return this.formatDate(this.date);
    },
    dateLast() {
      return this.formatDate(this.date2);
    },
  },

  watch: {
    dialog(val) {
      val || this.close();
    },
    dialogDetail(val) {
      val || this.closeDetail();
    },
    dialogDelete(val) {
      val || this.closeDelete();
    },
  },

  created() {
    this.initialize();
  },

  methods: {
    initialize() {
      this.resources = [
        {
          nama: "Marvin Janitra Akmal",
          npp: "12341234",
          email: "marvinjanitra@gmail.com",
          phone: "081212786101",
          skills: ["Google", "Ms. Office"],
          jenjab: "AMGR",
          kelompok: "OFA",
          tipe: "FTE",
          role: "FrontEnd Developer",
          status: "Active",
          price: "Rp. 10.000.000",
        },
        {
          nama: "Sofwan",
          npp: "12341235",
          email: "sofwan@gmail.com",
          phone: "081287126382",
          skills: ["Google", "React", "Vue"],
          jenjab: "MGR",
          kelompok: "TQC",
          tipe: "FTE",
          role: "FrontEnd Developer",
          status: "Active",
          price: "Rp. 15.000.000",
        },
        {
          nama: "Jamal Udin",
          npp: "12341226",
          email: "jamalnaxgenkmotor@gmail.com",
          phone: "081256781234",
          skills: ["Riding", "Drag", "Stoopie"],
          jenjab: "OS",
          kelompok: "KVM",
          tipe: "XTC",
          role: "FrontEnd Infantry",
          status: "Active",
          price: "Rp. 2.000",
        },
        {
          nama: "Solehudin",
          npp: "12341214",
          email: "udinsolehbanget@gmail.com",
          phone: "081212344532",
          skills: ["Solat", "Ngaji", "Doa"],
          jenjab: "Staff",
          kelompok: "MJD",
          tipe: "MBT",
          role: "Marbot",
          status: "Inactive",
          price: "Rp. 2.500",
        },
      ];
    },
    createItem(item) {
      this.createItem = item;
      this.$router.push("/createNewResource");
    },
    editItem(item) {
      this.editedIndex = this.resources.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },
    detailItem(item) {
      this.editedIndex = this.resources.indexOf(item);
      this.detailItem = Object.assign({}, item);
      this.dialogDetail = true;
    },

    deleteItem(item) {
      this.editedIndex = this.resources.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialogDelete = true;
    },

    deleteItemConfirm() {
      this.resources.splice(this.editedIndex, 1);
      this.closeDelete();
    },

    close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },
    closeDetail() {
      this.dialog = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    closeDelete() {
      this.dialogDelete = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    save() {
      if (this.editedIndex > -1) {
        Object.assign(this.resources[this.editedIndex], this.editedItem);
      } else {
        this.resources.push(this.editedItem);
      }
      this.close();
    },
    formatDate(date) {
      if (!date) return null;

      const [year, month, day] = date.split("-");
      return `${month}/${day}/${year}`;
    },
  },
};
</script>

<style lang="scss" scoped></style>
