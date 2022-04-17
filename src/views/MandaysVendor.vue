<template>
  <v-row>
    <v-col>
      <v-data-table
        :headers="headers"
        :items="mandaysvendor"
        :search="search"
        :loading="loadingPlaylist"
        class="elevation-1"
      >
        <template v-slot:top>
          <v-toolbar flat>
            <v-toolbar-title>Data Mandays Vendor</v-toolbar-title>
            <v-spacer></v-spacer>
            <div class="pa-5" max-width:100>
              <v-text-field
                class="shrink"
                outlined
                v-bind="size"
                v-model="search"
                append-icon="mdi-magnify"
                label="Search"
                single-line
                hide-details
                dense
              ></v-text-field>
            </div>
            <v-btn
              v-bind="size"
              class="white--text"
              @click="editItem()"
              color="#004483"
            >
              + Create New Mandays
            </v-btn>
            <v-dialog v-model="dialog" max-width="1000px">
              <v-card>
                <v-card color="#004483">
                  <v-card-title class="white--text">
                    <span class="text-h5"
                      ><h3>{{ formTitle }}</h3></span
                    >
                    <v-spacer></v-spacer>
                  </v-card-title>
                </v-card>
                <v-card-text>
                  <v-form ref="form" v-model="valid">
                    <v-container>
                      <v-row>
                        <v-col cols="12" sm="6" md="4">
                          <v-text-field
                            v-model="editedItem.vendorName"
                            label="Nama Vendor*"
                            :rules="nameRules"
                            required
                            outlined
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6" md="4">
                          <v-text-field
                            v-model="editedItem.contractNumber"
                            label="Contract Number*"
                            :rules="nameRules"
                            required
                            outlined
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6" md="4">
                          <v-text-field
                            v-model="editedItem.totalMandays"
                            label="Total Mandays"
                            required
                            outlined
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6" md="4">
                          <v-select
                            v-model="editedItem.status"
                            label="Status"
                            :items="statusItem"
                            required
                            outlined
                          ></v-select>
                        </v-col>

                        <v-col cols="12" sm="6" md="4">
                          Start Contract Date
                          <!-- <v-btn outlined color="grey" width="900" height="35"> -->
                           <br> 
                          <date-picker
                            placeholder="Start Contract Date"
                            fullscreen-mobile
                            v-model="editedItem.startContract"
                            valueType="format"
                             
                          ></date-picker>
                        </v-col>

                        <v-col cols="12" sm="6" md="4">
                          Last Contract Date
                          <!-- <v-btn outlined color="grey" width="900" height="35"> -->
                            <br> 
                          <date-picker
                            placeholder="Last Contract Date"
                            fullscreen-mobile
                            v-model="editedItem.lastContract"
                            valueType="format"
                             
                          ></date-picker>
                        </v-col>

                        <v-col cols="12" sm="6" md="4">
                          <v-textarea
                            v-model="editedItem.notes"
                            label="Notes"
                            required
                            outlined
                            rows="1"
                          ></v-textarea>
                        </v-col>
                      </v-row>
                    </v-container>
                  </v-form>
                </v-card-text>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn outlined color="blue darken-1" text @click="close">
                    Cancel
                  </v-btn>
                  <v-btn color="#004483" dark v-if="valid" @click="save">
                    Save
                  </v-btn>
                </v-card-actions>
                <!-- <v-expansion-panels v-if="editedIndex != -1">
                  <v-expansion-panel>
                    <v-expansion-panel-header disable-icon>
                      <h3>Add Usage <v-icon>mdi-menu-down</v-icon></h3>
                    </v-expansion-panel-header>
                    <v-expansion-panel-content>
                      <v-card-text>
                        <v-form ref="form" v-model="validUsage">
                          <v-container>
                            <v-row>
                              <v-col cols="12" sm="6" md="4">
                                <v-text-field
                                  v-model="editedItemUsage.noCR"
                                  label="No CR*"
                                  :rules="nameRulesUsage"
                                  required
                                  outlined
                                ></v-text-field>
                              </v-col>
                              <v-col cols="12" sm="6" md="4">
                                <v-text-field
                                  v-model="editedItemUsage.project"
                                  label="Project*"
                                  :rules="nameRulesUsage"
                                  required
                                  outlined
                                ></v-text-field>
                              </v-col>
                              <v-col cols="12" sm="6" md="4">
                                <v-text-field
                                  v-model="editedItemUsage.request"
                                  label="Requestor"
                                  required
                                  outlined
                                ></v-text-field>
                              </v-col>

                              <v-col cols="12" sm="6" md="4">
                                <v-text-field
                                  v-model="editedItemUsage.totalMandays"
                                  label="Jumlah Mandays"
                                  required
                                  outlined
                                ></v-text-field>
                              </v-col>
                              <v-col cols="12" sm="6" md="4">
                                <v-select
                                  v-model="editedItemUsage.kelompok"
                                  label="Kelompok"
                                  :items="status"
                                  required
                                  outlined
                                ></v-select>
                              </v-col>
                              <v-col cols="12" sm="6" md="4">
                                <v-textarea
                                  v-model="editedItemUsage.notes"
                                  label="Notes"
                                  required
                                  class="mx-2"
                                  rows="1"
                                  outlined
                                ></v-textarea>
                              </v-col>

                              <v-col cols="12" sm="6" md="4">
                                Request Date
                          
                                <VueDatePicker
                                  placeholder="Request Date"
                                  fullscreen-mobile
                                  v-model="editedItemUsage.requestDate"
                                  :rules="nameRules"
                                />
                                
                              </v-col>

                              <v-col cols="12" sm="6" md="4">
                                Start Project
                               
                                <VueDatePicker
                                  placeholder="Start Project"
                                  fullscreen-mobile
                                  v-model="editedItemUsage.startProject"
                                  :rules="nameRules"
                                />
                              </v-col>

                              <v-col cols="12" sm="6" md="4">
                                End Project
                                <VueDatePicker
                                  placeholder="Project"
                                  fullscreen-mobile
                                  v-model="editedItemUsage.lastProject"
                                  :rules="nameRules"
                                />
                              </v-col>
                            </v-row>
                          </v-container>
                        </v-form>
                      </v-card-text>
                      <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn
                          outlined
                          color="blue darken-1"
                          text
                          @click="close"
                        >
                          Cancel
                        </v-btn>
                        <v-btn
                          color="#004483"
                          dark
                          v-if="validUsage"
                          @click="save"
                        >
                          Save
                        </v-btn>
                      </v-card-actions>
                    </v-expansion-panel-content>
                  </v-expansion-panel>
                </v-expansion-panels> -->
              </v-card>
            </v-dialog>
            <v-dialog v-model="dialogUsage" max-width="1000px">
              <v-card>
                <v-card color="#004483">
                  <v-card-title class="white--text">
                    <span class="text-h5"
                      ><h3>{{ formTitleUsage }}</h3></span
                    >
                    <v-spacer></v-spacer>
                  </v-card-title>
                </v-card>
                <v-card-text>
                  <v-form ref="formUsage" v-model="validUsage">
                    <v-container>
                      <v-row>
                        <v-col cols="12" sm="6" md="4">
                          <v-text-field
                            v-model="editedItemUsage.crtrackNo"
                            label="No CR*"
                            :rules="nameRulesUsage"
                            required
                            outlined
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6" md="4">
                          <v-text-field
                            v-model="editedItemUsage.projectName"
                            label="Project*"
                            :rules="nameRulesUsage"
                            required
                            outlined
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6" md="4">
                          <v-text-field
                            v-model="editedItemUsage.requestor"
                            label="Requestor"
                            required
                            outlined
                          ></v-text-field>
                        </v-col>

                        <v-col cols="12" sm="6" md="4">
                          <v-text-field
                            v-model="editedItemUsage.jumlahMandays"
                            label="Jumlah Mandays"
                            required
                            outlined
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6" md="4">
                          <v-select
                            v-model="editedItemUsage.kelompokId"
                            label="Kelompok Pengguna  "
                            :items="kelompok"
                            required
                            outlined
                          ></v-select>
                        </v-col>
                        <v-col cols="12" sm="6" md="4">
                          <v-textarea
                            v-model="editedItemUsage.notes"
                            label="Notes"
                            required
                            class="mx-2"
                            rows="1"
                            outlined
                          ></v-textarea>
                        </v-col>

                        <v-col cols="12" sm="6" md="4">
                          
                          Request Date <br> 
                          <date-picker
                            v-model="editedItemUsage.tglRequest"
                            valueType="format"
                             placeholder="Request Date"
                          ></date-picker>
                        </v-col>

                        <v-col cols="12" sm="6" md="4">
                          Start Project
                          <!-- <v-btn outlined color="grey" width="900" height="35"> -->
                           <br> 
                          <date-picker
                            placeholder="Start Project"
                            v-model="editedItemUsage.tglStart"
                            valueType="format"
                            
                          ></date-picker>
                          <!-- </v-btn> -->
                        </v-col>

                        <v-col cols="12" sm="6" md="4">
                          End Project
                          <!-- <v-btn outlined color="grey" width="900" height="35"> -->
                           <br> 
                          <date-picker
                            placeholder="End Project"
                            fullscreen-mobile
                            v-model="editedItemUsage.tglEnd"
                            valueType="format"
                          ></date-picker>
                          <!-- </v-btn> -->
                        </v-col>
                      </v-row>
                    </v-container>
                  </v-form>
                </v-card-text>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn outlined color="blue darken-1" text @click="closeUsage">
                    Cancel
                  </v-btn>
                  <v-btn color="#004483" dark v-if="validUsage" @click="save2">
                    Save
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
            <v-dialog v-model="dialogDelete" max-width="1500px">
              <v-card>
                <v-card color="#004483">
                  <v-card-title class="white--text">
                    <span class="text-h5"><h4>Detail Mandays</h4></span>
                    <v-spacer></v-spacer>
                  </v-card-title>
                </v-card>

                <v-row no-gutters>
                  <v-col cols="12" sm="13" offset-sm="0.2">
                    <v-card class="pa-2" offset-sm="3" outlined tile>
                      <p></p>
                      <v-spacer></v-spacer>

                      <v-row>
                        <v-col cols="12" md="6">
                          <v-list-item two-line>
                            <v-list-item-content>
                              <v-list-item-title
                                ><h2>
                                  {{ editedItem.vendorName }}
                                </h2></v-list-item-title
                              >
                              <v-list-item-subtitle
                                ><h4>
                                  {{ editedItem.contractNumber }}
                                </h4></v-list-item-subtitle
                              >
                              <v-list-item-subtitle
                                >Added
                                {{
                                  editedItem.createdTime | str_limit(10)
                                }}</v-list-item-subtitle
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
                                >Vendor Name</v-list-item-subtitle
                              >
                              <v-list-item-title>{{
                                editedItem.vendorName
                              }}</v-list-item-title>
                            </v-list-item-content>
                          </v-list-item>
                          <v-list-item two-line>
                            <v-list-item-content>
                              <v-list-item-subtitle
                                >Contract Number</v-list-item-subtitle
                              >
                              <v-list-item-title>{{
                                editedItem.contractNumber
                              }}</v-list-item-title>
                            </v-list-item-content>
                          </v-list-item>
                          <v-list-item two-line>
                            <v-list-item-content>
                              <v-list-item-subtitle
                                >Status</v-list-item-subtitle
                              >
                              <v-list-item-title>
                                <!-- {{
                                          editedItem.nama_status
                                        }} -->
                                <p
                                  v-if="editedItem.status == 0"
                                  class="red--text"
                                >
                                  Inactive
                                </p>
                                <p v-else class="green--text">Active</p>
                              </v-list-item-title>
                            </v-list-item-content>
                          </v-list-item>
                        </v-col>
                        <v-divider vertical></v-divider>
                        <v-col cols="4" md="3">
                          <v-list-item two-line>
                            <v-list-item-content>
                              <v-list-item-subtitle
                                >Start Contract Date</v-list-item-subtitle
                              >
                              <v-list-item-title>
                                {{ editedItem.startContract | str_limit(10) }}
                              </v-list-item-title>
                            </v-list-item-content>
                          </v-list-item>
                          <v-list-item two-line>
                            <v-list-item-content>
                              <v-list-item-subtitle
                                >Total Mandays</v-list-item-subtitle
                              >
                              <v-list-item-title>{{
                                editedItem.totalMandays
                              }}</v-list-item-title>
                            </v-list-item-content>
                          </v-list-item>
                          <v-list-item two-line>
                            <v-list-item-content>
                              <v-list-item-subtitle
                                >Usage Mandays</v-list-item-subtitle
                              >
                              <v-list-item-title>
                                {{ editedItem.usageMandays }}
                              </v-list-item-title>
                            </v-list-item-content>
                          </v-list-item>
                        </v-col>
                        <v-col cols="4" md="3">
                          <v-list-item two-line>
                            <v-list-item-content>
                              <v-list-item-subtitle
                                >Last Contract Date</v-list-item-subtitle
                              >
                              <v-list-item-title>{{
                                editedItem.lastContract | str_limit(10)
                              }}</v-list-item-title>
                            </v-list-item-content>
                          </v-list-item>
                          <v-list-item two-line>
                            <v-list-item-content>
                              <v-list-item-subtitle
                                >Available Mandays</v-list-item-subtitle
                              >
                              <v-list-item-title>
                                {{ editedItem.availableMandays }}
                              </v-list-item-title>
                            </v-list-item-content>
                          </v-list-item>
                          <v-list-item two-line>
                            <v-list-item-content>
                              <v-list-item-subtitle>Notes</v-list-item-subtitle>
                              <p>{{ editedItem.notes }}</p>
                            </v-list-item-content>
                          </v-list-item>
                        </v-col>
                      </v-row>
                    </v-card>
                  </v-col>
                </v-row>

                <v-card-actions class="pa-5">
                  <v-btn
                    v-bind="size"
                    class="white--text pr-9"
                    @click="editItemUsage()"
                    color="#004483"
                  >
                    + Add Usage
                  </v-btn>
                  <v-spacer></v-spacer>
                  <div class="pa-2" max-width:100>
                    <v-text-field
                      class="shrink"
                      outlined
                      v-bind="size"
                      v-model="search_usage"
                      append-icon="mdi-magnify"
                      label="Search"
                      single-line
                      hide-details
                      dense
                    ></v-text-field>
                  </div>
                </v-card-actions>
                <v-card>
                  <v-data-table
                    :headers="headers_usage"
                    :items="usage"
                    :search="search_usage"
                    :loading="loadingPlaylist"
                    class="elevation-1 pa-6"
                  >
                    <template v-slot:[`item.actions`]="{ item }">
                      <button class="edit" @click="editItemUsage(item)">
                        Edit
                      </button>
                    </template>
                    <template v-slot:[`item.tglRequest`]="{ item }">
                      {{ item.tglRequest | str_limit(10) }}
                    </template>
                    <template v-slot:[`item.tglStart`]="{ item }">
                      {{ item.tglStart | str_limit(10) }}
                    </template>
                    <template v-slot:[`item.tglEnd`]="{ item }">
                      {{ item.tglEnd | str_limit(10) }}
                    </template>
                    <template v-slot:[`item.createdTime`]="{ item }">
                      {{ item.createdTime | str_limit(10) }}
                    </template>

                  </v-data-table>
                </v-card>

                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="blue darken-1" text @click="closeDelete">
                    Close
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </v-toolbar>
        </template>
        <template v-slot:[`item.actions`]="{ item }">
          <!-- <v-btn v-bind="size" @click="deleteItem(item)">Detail</v-btn>
          <v-btn v-bind="size" class="mx-3" @click="editItem(item)">Edit</v-btn> -->
          <button class="sa-2" @click="deleteItem(item)">Detail</button>
                <button @click="editItem(item)">Edit</button>
        </template>
        <template v-slot:[`item.status`]="{ item }">
          <p v-if="item.status == 0" class="red--text">Inactive</p>
          <p v-else class="green--text">Active</p>
        </template>
        <template v-slot:[`item.no`]="{ item }">
          <td>
            {{ mandaysvendor.indexOf(item) + 1 }}
          </td>
        </template>
        <template v-slot:no-data>
          <v-progress-circular
            :size="70"
            :width="7"
            color="purple"
            indeterminate
          ></v-progress-circular>
        </template>
      </v-data-table>
    </v-col>
  </v-row>
</template>

<script>
import DatePicker from "vue2-datepicker";
import "vue2-datepicker/index.css";
import { Axios } from "./Axios";
const apiService = new Axios();
export default {
  name: "MandaysVendor",
  components: {
    DatePicker
  },
  data: (vm) => ({
    valid: false,
    validUsage: false,
    nameRules: [(v) => !!v || "Required"],
    nameRulesUsage: [(v) => !!v || "Required"],
    ss: [],
    sss: "",
    snackbar: false,
    snackbar1: false,
    resourceType: [],
    search: "",
    tab: null,
    menus: ["Resource", "Kelompok"],
    items: [
      {
        text: "Master Admin",
        disabled: false,
        href: "/usermanagement",
      },
      {
        text: "Data Mandays Vendor",
        disabled: true,
        href: "/mandaysvendor",
      },
    ],
    dialog: false,
    editedIndex: -1,
    editedIndexUsage: -1,
    dialogDetail: false,
    dialogDelete: false,
    dialogUsage: false,
    headers: [
      {
        text: "Vendor Name",
        align: "start",
        sortable: true,
        value: "vendorName",
      },
      { text: "Contract", value: "contractNumber" },
      { text: "Total Mandays", value: "totalMandays" },
      { text: "Usage Mandays", value: "usageMandays" },
      { text: "Avilable Mandays", value: "availableMandays" },
      { text: "Status", value: "status" },
      { text: "Action", value: "actions" },
    ],
    search_usage: "",
    headers_usage: [
      {
        text: "No CR",
        align: "start",
        sortable: true,
        value: "crtrackNo",
      },
      { text: "Project", value: "projectName" },
      { text: "Requestor", value: "requestor" },
      { text: "Kelompok Pengguna", value: "kelompok" },
      { text: "Tgl Request", value: "tglRequest" },
      { text: "Tgl Start Project", value: "tglStart" },
      { text: "Tgl End Project", value: "tglEnd" },
      { text: "Jumlah Mandays", value: "jumlahMandays" },
      { text: "Create By", value: "createdBy" },
      { text: "Create Date", value: "createdTime" },
      { text: "Note", value: "notes" },
      { text: "Action", value: "actions" },
    ],
    statusItem: [
      {
        text: "Active",
        value: 1,
      },
      {
        text: "Inactive",
        value: 0,
      },
    ],
    skills: [],
    skillid: [],
    obj: {},
    tempk: [],
    tempr: [],
    temptipe: [],
    tempj: [],
    tempskill: [],
    objkel: {},
    kelompok: [],
    kelompokid: [],
    tipeid: [],
    roleid: [],
    tipe: [],
    role: [],
    jenjab: [],
    jenjabid: [],
    resources: [],
    mandaysID: 0,

    usage: [
      {
        noCr: "30001",
        project: "Enhancement PSAK",
        requestor: "Julia Astani",
        kelompok: "ACR",
        tglRequest: "15/02/2022",
        tglStart: "15/02/2022",
        tglEnd: "15/02/2022",
        jumlahMandays: "200",
        createBy: "Aditya Julianto",
        createDate: "15/02/2022",
        note: "-",
      },
      {
        noCr: "30002",
        project: "Enhancement F1",
        requestor: "Julia Astani",
        kelompok: "ACR",
        tglRequest: "15/02/2022",
        tglStart: "15/02/2022",
        tglEnd: "15/02/2022",
        jumlahMandays: "300",
        createBy: "Aditya Julianto",
        createDate: "15/02/2022",
        note: "-",
      },
    ],
    editedItemUsage: {},
    editedItem: {
      vendorName: "",
      contractNumber: "",
      totalMandays: "",
      usageMandays: "",
      availableMandays: "",
      status: "",
      notes: "",
      createdTime: "",
      createdBy: "",
      updatedBy: "",
      mandaysId: "",
    },
    defaultItem: {
      nama: "",
      npp: "",
      email: "",
      phone: "",
      skills: [],
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
      skills: [],
      dateActive: "",
      dateLast: "",
      jenjab: "",
      kelompok: "",
      tipe: "",
      role: "",
      status: "",
    },
    newEditedItem: {
      vendorName: "string",
      contractNumber: "string",
      startContract: "2021-08-24T06:00:02.744Z",
      lastContract: "2021-08-24T06:00:02.744Z",
      totalMandays: 0,
      usageMandays: 0,
      availableMandays: 0,
      status: 0,
      notes: "string",
      createdBy: "string",
      updatedBy: "string",
      createdTime: "2021-08-24T06:00:02.744Z",
      updateTime: "2021-08-24T06:00:02.744Z",
    },
    detailID: {},
    editID: "",
    nowdate: new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
      .toISOString()
      .substr(0, 10),
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
    activeSend: "",
    lastSend: "",
    menu3: false,
    menu2: false,
    rt: {},
    mandaysvendor: [],
    mandaysvendordetail: [],
  }),
  computed: {
    size() {
      const size = { xs: "x-small" }[this.$vuetify.breakpoint.name];
      return size ? { [size]: true } : {};
    },
    formTitle() {
      return this.editedIndex === -1 ? "Create New Mandays" : "Edit Mandays";
    },
    formTitleUsage() {
      return this.editedIndexUsage === -1 ? "Create Usage" : "Edit Usage";
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
    dialogUsage(val) {
      val || this.closeUsage();
    },
  },
  created() {
    this.initialize();
    this.getData();
    this.getData2();
    this.getKelompok();
  },
  methods: {
    async getKelompok() {
      const response = await apiService
        .getKelompok()
        .then((response) => {
          this.objkel = response.newKelompok;
        })
        .catch((err) => err);
      response;
      this.objkel.map((item) => {
        this.tempk.push(item.kelompokName);
        this.kelompokid.push(item.kelompokId);
      });
      for (var k = 0; k < this.tempk.length; k++) {
        //this.tempskill.push(obj2)
        let oo = {};
        oo.text = this.tempk[k];
        oo.value = this.kelompokid[k];
        this.kelompok.push(oo);
      }
    },
    async getData() {
      const response = await apiService
        .getManday()
        .then((response) => {
          this.mandaysvendor = response.results;
        })
        .catch((err) => err);
      response;
      console.log("ini mandays" + this.mandaysvendor);
    },
    async getData2() {
      //let rt = { text: "", value: 0 };
      //const obj = {}
      // const response = await apiService
      //   .getLookup()
      //   .then((response) => {
      //     response.map((item) => {
      //       if (item.type == "StatusActive") this.status.push(item.name);
      //     });
      //   })
      //   .catch((err) => err);
      // response;
      // console.log("inistatus" + this.status);
    },
    initialize() {
      this.mandays = [
        {
          name: "Frozen Yogurt",
          calories: 159,
          fat: 6.0,
          carbs: 24,
          protein: 4.0,
        },
      ];
    },
    createItem(item) {
      this.createItem = item;
      this.$router.push("/createNewResource");
    },
    editItem(item) {
      this.editedIndex = this.mandaysvendor.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
      for (var i = 0; i < this.mandaysvendor.length; i++) {
        if (this.mandaysvendor.mandaysId == item.mandaysId) {
          this.sss = this.mandaysvendor.nama_status;
        }
      }
      console.log(this.editedItem.nama_status);
    },
    editItemUsage(item) {
      this.editedIndexUsage = this.usage.indexOf(item);
      this.editedItemUsage = Object.assign({}, item);
      this.dialogUsage = true;
    },
    detailItem(item) {
      this.editedIndex = this.mandaysvendor.indexOf(item);
      this.detailItem = Object.assign({}, item);
      this.dialogDetail = true;
    },
    async deleteItem(item) {
      console.log("mandayid" + item.mandaysId);
      this.mandaysID = item.mandaysId;
      this.editedIndex = this.mandaysvendor.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialogDelete = true;
      for (var i = 0; i < this.mandaysvendor.length; i++) {
        if (this.mandaysvendor.mandaysId == item.mandaysId) {
          this.sss = this.mandaysvendor.nama_status;
        }
      }
      const response = await apiService
        .getMandayId(item.mandaysId)
        .then((response) => {
          this.mandaysvendordetail = response.results;
        })
        .catch((err) => err);
      response;
      this.usage = this.mandaysvendordetail.mandayUsages;
      let arrkelval = [];
      let arrkeltex = [];
      this.usage.map((item) => {
        arrkelval.push(item.kelompokId);
      });

      for (let i = 0; i < arrkelval.length; i++) {
        this.kelompok.map((item) => {
          if (item.value == arrkelval[i]) {
            arrkeltex.push(item.text);
          }
        });
      }
      console.log("arrtex:" + arrkeltex);
      let j = 0;
      this.usage.map((item) => {
        item.kelompok = arrkeltex[j];
        j++;
      });

      // mandaysUsage.map((item) => {

      //   console.log("ini manday v u" + item.crtrackNo);
      // });
    },
    deleteItemConfirm() {
      this.mandaysvendor.splice(this.editedIndex, 1);
      this.closeDelete();
    },
    close() {
      this.dialog = false;
      this.$refs.form.reset();
      this.$refs.form.resetValidation();
      this.dialogDelete = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },
    closeDetail() {
      this.dialog = false;
      this.$refs.form.reset();
      this.$refs.form.resetValidation();
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },
    closeDelete() {
      this.dialogDelete = false;
      this.dialogUsage = false;
      this.$refs.form.reset();
      this.$refs.form.resetValidation();
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },
    closeUsage() {
      this.dialogUsage = false;
      this.$refs.formUsage.reset();
      this.$refs.formUsage.resetValidation();
      this.$nextTick(() => {
        this.editedItemUsage = Object.assign({}, this.defaultItem);
        this.editedIndexUsage = -1;
      });
    },
    createData(Data) {
      const response = apiService
        .createManday(Data)
        .then((succ) => {
          this.showAlert();
          succ;
        })
        .catch(() => this.showAlertFail());
      response;
    },
    createData2(Data) {
      const response = apiService
        .createMandaysUsage(Data)
        .then((succ) => {
          this.showAlert2();
          succ;
        })
        .catch(() => this.showAlertFail2());
      response;
      console.log("iniData" + Data);
    },
    showAlert() {
      const Toast = this.$swal.mixin({
        toast: true,
        position: "top-end",
        confirmButtonText: "go",
        timer: 1000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.addEventListener("mouseenter", this.$swal.stopTimer);
          toast.addEventListener("mouseleave", this.$swal.resumeTimer);
        },
        willClose: () => {
          this.$router.go();
        },
      });

      Toast.fire({
        icon: "success",
        title: "Success",
        text: "Mandays successfully changed.",
        confirmButtonText: "OK",
      }).then((result) => {
        if (result.isConfirmed) {
          this.$router.go();
        }
      });
      //this.$router.go()
    },
    showAlert2() {
      const Toast = this.$swal.mixin({
        toast: true,
        position: "top-end",
        confirmButtonText: "go",
        timer: 1000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.addEventListener("mouseenter", this.$swal.stopTimer);
          toast.addEventListener("mouseleave", this.$swal.resumeTimer);
        },
        willClose: () => {
          this.$router.go();
        },
      });

      Toast.fire({
        icon: "success",
        title: "Success",
        text: "Mandays usage successfully changed.",
        confirmButtonText: "OK",
      }).then((result) => {
        if (result.isConfirmed) {
          this.$router.go();
        }
      });
      //this.$router.go()
    },
    showAlertFail() {
      const Toast = this.$swal.mixin({
        toast: true,
        position: "top-end",

        confirmButtonText: "go",
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.addEventListener("mouseenter", this.$swal.stopTimer);
          toast.addEventListener("mouseleave", this.$swal.resumeTimer);
        },
        willClose: () => {
          this.$router.go();
        },
      });

      Toast.fire({
        icon: "error",
        title: "Fail",
        text: "Mandays fail changed.",
        confirmButtonText: "OK",
      }).then((result) => {
        if (result.isConfirmed) {
          this.$router.go();
        }
      });
      //this.$router.go()
    },

    showAlertFail2() {
      const Toast = this.$swal.mixin({
        toast: true,
        position: "top-end",

        confirmButtonText: "go",
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.addEventListener("mouseenter", this.$swal.stopTimer);
          toast.addEventListener("mouseleave", this.$swal.resumeTimer);
        },
        willClose: () => {
          this.$router.go();
        },
      });

      Toast.fire({
        icon: "error",
        title: "Fail",
        text: "Mandays usage fail changed.",
        confirmButtonText: "OK",
      }).then((result) => {
        if (result.isConfirmed) {
          this.$router.go();
        }
      });
      //this.$router.go()
    },
    async updateData(Data, id) {
      const response = await apiService
        .updateManday(Data, id)
        .then((succ) => {
          // alert(succ);
          succ;
          this.showAlert();
        })
        .catch((err) => {
          // alert("Sukses Update");
          err;
          console.log("dsffd" + err);
          this.showAlertFail();
        });
      // if(response.status == 200){
      //   this.showAlert()
      // }else this.showAlertFail()
      response;
    },
    async updateData2(Data, id) {
      const response = await apiService
        .updateMandaysUsage(Data, id)
        .then((succ) => {
          succ;
          this.showAlert2();
        })
        .catch((err) => {
          err;
          console.log("dsffd" + err);
          this.showAlertFail2();
        });
      response;
    },

    save() {
      if (this.editedIndex > -1) {
        this.newEditedItem.vendorName = this.editedItem.vendorName;
        this.newEditedItem.contractNumber = this.editedItem.contractNumber;
        this.newEditedItem.totalMandays = this.editedItem.totalMandays;
        this.newEditedItem.usageMandays = this.editedItem.usageMandays;
        this.newEditedItem.availableMandays = this.editedItem.availableMandays;
        this.newEditedItem.updatedBy = localStorage.getItem("name,");
        this.newEditedItem.notes = this.editedItem.notes;
        this.newEditedItem.startContract = this.editedItem.startContract;
        this.newEditedItem.lastContract = this.editedItem.lastContract;
        this.newEditedItem.status = this.editedItem.status;
        this.updateData(this.newEditedItem, this.editedItem.mandaysId);
      } else {
        this.newEditedItem.vendorName = this.editedItem.vendorName;
        this.newEditedItem.contractNumber = this.editedItem.contractNumber;
        this.newEditedItem.totalMandays = this.editedItem.totalMandays;
        this.newEditedItem.usageMandays = this.editedItem.usageMandays;
        this.newEditedItem.availableMandays = this.editedItem.availableMandays;
        this.newEditedItem.createdBy = localStorage.getItem("name,");
        this.newEditedItem.notes = this.editedItem.notes;
        this.newEditedItem.startContract = this.editedItem.startContract;
        this.newEditedItem.lastContract = this.editedItem.lastContract;
        this.newEditedItem.status = this.editedItem.status;
        //this.resources.push(this.editedItem);
        if (this.valid) this.createData(this.newEditedItem);
      }
      this.close();
    },
    save2() {
      if (this.editedIndexUsage > -1) {
        console.log("inidataupdate" + this.editedItemUsage);
        // this.newEditedItem.status = this.editedItem.status;
        this.editedItemUsage.mandaysId = this.mandaysID;
        this.editedItemUsage.updateTime = this.nowdate;
        this.editedItemUsage.updatedBy = localStorage.getItem("name,");
        delete this.editedItemUsage.kelompok;
        this.updateData2(
          this.editedItemUsage,
          this.editedItemUsage.mandaysUsageId
        );
        console.log("iniedit");
      } else {
        this.editedItemUsage.mandaysId = this.mandaysID;
        this.editedItemUsage.createdTime = this.nowdate;

        this.editedItemUsage.createdBy = localStorage.getItem("name,");
        //this.resources.push(this.editedItem);
        this.createData2(this.editedItemUsage);
        console.log("inicreate");
        this.close();
      }
    },
    formatDate(date) {
      if (!date) return null;
      const [year, month, day] = date.split("-");
      return `${month}/${day}/${year}`;
    },
  },
};
</script>

<style lang="scss" scoped>
.v-progress-circular {
  margin: 1rem;
}
button.edit {
  padding: 5px 10px;
  font-size: inherit;
  background: transparent;
  border: 2px solid #ccc;
  transition: 0.4s;
}
button {
  padding: 5px 10px;
  font-size: inherit;
  background: transparent;
  border: 2px solid #ccc;
  transition: 0.4s;
}
</style>
