import axios from 'axios'
const BASE_URL = 'http://35.219.8.90:81/api'
const options = {
    headers: {
        'Content-Type': 'application/json',
        'Access-Allow-Control': '*',
    }
}
const token = localStorage.getItem('TOKEN') !== "" ? localStorage.getItem('TOKEN') : ""
export class Axios{ 
   async getLookup(){
       const url = `${BASE_URL}/Lookups`
       const data = axios.get(url).then(response => response.data)
       return data
    }
    async createLookup(param){
        const url = `${BASE_URL}/Lookups`
        const data = axios.post(url,param).then(response => response.data)
        return data
     }
     async getManday(){
        const url = `${BASE_URL}/Manday/GetAll`
        options.headers.Authorization = 'Bearer ' + token
        const data = axios.get(url, options).then(response => response.data)
        return data
     }
     async getMandayId(id){
        const url = `${BASE_URL}/Manday/`+id
        const data = axios.get(url).then(response => response.data)
        return data
     }
     async createManday(param){
        const url = `${BASE_URL}/Manday`
        const data = axios.post(url,param).then(response => response.data)
        return data
     }
     async updateManday(datas,id){
        const url = `${BASE_URL}/Manday/`+id
        const data = axios.put(url,datas).then(response => response.data).bind(this)
        return data
     }
     async updateManmonth(datas,id){
      const url = `${BASE_URL}/Manmonth/`+id
      const data = axios.put(url,datas).then(response => response.data).bind(this)
      return data
   }
     async getDashboardVendor(){
        options.headers.Authorization = 'Bearer ' + token
        const url = `${BASE_URL}/Dashboard/GetVendor`
        const data = axios.get(url,options).then(response => response.data)
        return data
     }
     async getDashboardResource(){
        const url = `${BASE_URL}/Dashboard/GetResource`
        const data = axios.get(url).then(response => response.data)
        return data
     }
     async login(datas){
        const url = `${BASE_URL}/Users/Authentication`
        const data = axios.post(url,datas).then(response => response)
        return data
     }
     async getResourceProfile(){
        const url = `${BASE_URL}/ResourceEmployees`
        const data = axios.get(url).then(response => response.data)
        return data
     }
     async updateResourceProfile(datas,id){
        const url = `${BASE_URL}/ResourceEmployees/`+id
        const data = axios.put(url,datas).then(response => response.data)
        return data
     }
     async createResourceProfile(param){
      const url = `${BASE_URL}/ResourceEmployees`
      const data = axios.post(url,param).then(response => response.data)
      return data
   }
   async getKelompokProfile(){
      const url = `${BASE_URL}/UnitProfile`
      const data = axios.get(url).then(response => response.data)
      return data
   }
   async getResourceProfileId(id){
      const url = `${BASE_URL}/ResourceEmployees/GetByKelompokId/`+id
      const data = axios.get(url).then(response => response.data)
      return data
   }
   async getResourceProfileSkill(id){
      const url = `${BASE_URL}/ResourceEmployees/GetByEmployeeId/`+id
      const data = axios.get(url).then(response => response.data)
      return data
   }
   async getUsers(){
      const url = `${BASE_URL}/Users/GetAllUser`
      const data = axios.get(url).then(response => response.data)
      return data
   }
   async updateUsers(datas,id){
      const url = `${BASE_URL}/Users/updatebyid/`+id
      const data = axios.put(url,datas).then(response => response.data)
      return data
   }
   async createUsers(param){
      const url = `${BASE_URL}/Users/Registration`
      const data = axios.post(url,param).then(response => response.data)
      return data
   }
   async updatePass(datas,id){
      const url = `${BASE_URL}/Users/updatepassword/`+id
      const data = axios.put(url,datas).then(response => response.data)
      return data
   }
   async getStatusUser(npp){
      const url = `${BASE_URL}/Users/GetByNpp/`+npp
      const data = axios.get(url).then(response => response)
      return data
   }
   async getVendor(){
      const url = `${BASE_URL}/Manmonth/GetAll`
      const data = axios.get(url).then(response => response.data)
      return data
   }
   async createManmonth(param){
      const url = `${BASE_URL}/Manmonth`
      const data = axios.post(url,param).then(response => response.data)
      return data
   }
   async getKelompokByDivisi(idD,idS){
      const url = `${BASE_URL}/Kelompoks/GetByDivisiStatus/`+idD+'/'+idS
      const data = axios.get(url).then(response => response.data)
      return data
   }
   async updateDataLookup(datas,id){
      const url = `${BASE_URL}/Lookups/`+id
      const data = axios.put(url,datas).then(response => response.data)
      return data
   }
   async createTypeLookup(param){
      const url = `${BASE_URL}/Lookups`
      const data = axios.post(url,param).then(response => response.data)
      return data
   }
 }