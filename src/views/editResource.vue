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
        sm="14"
        offset-sm="0.2">
    
        <v-card class="pa-2" offset-sm="3" outlined tile>
        <h1>Edit Resource</h1>
          <v-row>
            <v-col
                cols="12"
                md="3">
            <h4>Nama Depan</h4>
            <v-text-field
                v-model="namadepan"
                label="Ex. John"
                outlined
                dense
            ></v-text-field>
            </v-col>
            <v-col
                cols="12"
                sm="3"
            >
            <h4>Nama Belakang</h4>
            <v-text-field
                v-model="namabelakang"
                label="Ex. Cena"
                outlined
                dense
            ></v-text-field>
                    </v-col>                    
                    <v-col cols="12" sm="6">
                        <h4>Skillset</h4>
                        <v-combobox
                        v-model="skill"
                        :items="skills"
                        label="Select Skillset"
                        multiple
                        chips
                        outlined
                        dense
                        clearable
                        ></v-combobox>
                    </v-col>
                    <v-col
                    cols="12"
                    md="6"
                    >
                    <h4>NPP</h4>
                    <v-text-field
                        v-model="npp"
                        label="Ex. 12341234"
                        outlined
                        dense
                        disabled
                        filled
                    ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6">
                        <h4>Resource Type</h4>
                        <v-combobox
                        v-model="tipe"
                        :items="tipes"
                        label="Select Resource Type"
                        outlined
                        dense
                        ></v-combobox>
                    </v-col>
                    <v-col
                    cols="12"
                    md="6"
                    >
                    <h4>Email</h4>
                    <v-text-field
                        v-model="email"
                        label="Ex. username@domain.com"
                        outlined
                        dense
                    ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6">
                        <h4>Jenjang Jabatan</h4>
                        <v-combobox
                        v-model="jenjab"
                        :items="jenjabs"
                        label="Select Jenjang Jabatan"
                        outlined
                        dense
                        ></v-combobox>
                    </v-col>
                    <v-col
                    cols="12"
                    md="6"
                    >
                    <h4>Phone Number</h4>
                    <v-text-field
                        v-model="phone"
                        label="Ex. 08123456789"
                        outlined
                        dense
                    ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6">
                        <h4>Kelompok</h4>
                        <v-combobox
                        v-model="kelompok"
                        :items="kelompoks"
                        label="Select Kelompok"
                        outlined
                        dense
                        ></v-combobox>
                    </v-col>
            <v-col
            ><h4>Active Date</h4>
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
                label=""
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
                sm="3"
            >
            <h4>Last Working Date</h4>
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
                label=""
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
            <v-col cols="12" sm="6">
            <h4>Role</h4>
            <v-combobox
                v-model="role"
                :items="roles"
                label="Select Role"
                outlined
                dense
            ></v-combobox>
            </v-col>
            <v-col
                cols="12"
                md="6"
                >
            <h4>ManHour / Day</h4>
            <v-text-field
                v-model="manhour"
                label="Ex. 7"
                outlined
                dense
            ></v-text-field>
            </v-col>
            <v-col cols="12" sm="6">
            <h4>Status</h4>
            <v-combobox
                v-model="Status"
                :items="statuss"
                label="Select Status"
                outlined
                dense
            ></v-combobox>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
      </v-row>
      <div class="text-right">
            <v-btn class="mr-4"
                    href="/profile">
            Cancel
            </v-btn>
            <v-btn
                type="submit"
                color="primary"
                dark
            >Save Changes
            </v-btn>
            </div>
      </v-container>
    </div>
</template>

<script>
    export default {
    name: 'editResource',
    data: vm => ({
        nama: '',
        npp: '',
        email: '',
        phone: '',
        kelompoks: ['OFA'],
        skills: [
            'React', 'Vue', 'Java', 'Phyton'
        ],
        tipes: ['FTE',],
        jenjabs: ['AMGR'],
        roles: ['FrontEnd Developer','Backend Developer','UI/UX'],
        statuss: ['Active','Inactive'],
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
            {
            text: 'Create New Resource',
            disabled: true,
            href: 'breadcrumbs_link_2',
            },
      ],
      date: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
      date2: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
      dateFormatted: vm.formatDate((new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10)),
      menu3: false,
      menu2: false,
    }),
    computed: {
      dateActive () {
        return this.formatDate(this.date)
      },
      dateLast () {
        return this.formatDate(this.date2)
      },
    },

    methods: {
      formatDate (date) {
        if (!date) return null

        const [year, month, day] = date.split('-')
        return `${month}/${day}/${year}`
      },
    }
    }
</script>

<style lang="scss" scoped>

</style>
