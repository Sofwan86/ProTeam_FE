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
        <h1>Create New Resource</h1>
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
                        label="Ex.@domain.com"
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
                cols="12"
                md="3">
            <h4>Active Date</h4>
            <v-text-field
                v-model="activedate"
                label="mm/dd/yy"
                outlined
                dense
            ></v-text-field>
            </v-col>
            <v-col
                cols="12"
                sm="3"
            >
            <h4>Last Working Date</h4>
            <v-text-field
                v-model="lastdate"
                label="mm/dd/yy"
                outlined
                dense
            ></v-text-field>
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
            >Create New Resource
            </v-btn>
            </div>
      </v-container>
    </div>
</template>

<script>
    export default {
        name: 'createNewResource',
        data: () => ({
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
            disabled: false,
            href: '/profile',
            },
            {
            text: 'Resource',
            disabled: false,
            href: '/profile',
            },
            {
            text: 'Create New Resource',
            disabled: true,
            href: 'breadcrumbs_link_2',
            },
      ],
    }),
        
    }
</script>

<style lang="scss" scoped>
</style>
