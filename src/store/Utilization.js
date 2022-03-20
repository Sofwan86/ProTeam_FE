import { defineStore } from "pinia";

export const useUltilizationStore = defineStore({
    id: "utilization",
    state: ()=>({
        utilizationDetails: {}
    }),
    actions:{
        async getUtilizationDetails(start,finish,kelompok,role){
            const response = await fetch (
                `http://server.ofadev.id:9091/api/${start}/${finish}/${kelompok}/${role}`
            )
            const result = await response.json()
            this.utilizationDetails = result
        }
    }
})