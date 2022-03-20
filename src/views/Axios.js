import axios from 'axios'
const BASE_URL = 'http://192.168.131.124:85/api'
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
        const data = axios.put(url,datas).then(response => response.data)
        return data
     }
     async updateManmonth(datas,id){
      const url = `${BASE_URL}/Manmonth/`+id
      const data = axios.put(url,datas).then(response => response.data)
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
   async getKelompok(){
      const url = `${BASE_URL}/Kelompoks`
      const data = axios.get(url).then(response => response.data)
      return data
   }
   async getJenjab(){
      const url = `${BASE_URL}/Jenjab`
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
   async createDataLookup(param){
      const url = `${BASE_URL}/Lookups`
      const data = axios.post(url,param).then(response => response.data)
      return data
   }
   async getWla(){
      const url = `${BASE_URL}/WLA/GetWLAHeader`
      const data = axios.get(url).then(response => response.data)
      return data
   }
   async createWlaHeader(param){
      const url = `${BASE_URL}/WLA/WLAHeader`
      const data = axios.post(url,param).then(response => response.data)
      return data
   }
   async updateWlaHeader(datas,id){
      const url = `${BASE_URL}/WLA/WLAHeader/`+id
      const data = axios.put(url,datas).then(response => response.data)
      return data
   }
   async getWla2(id){
      const url = `${BASE_URL}/WLA/GetWLADetailByHeaderId/`+id
      const data = axios.get(url).then(response => response.data)
      return data
   }
   async createWlaDetail(param){
      const url = `${BASE_URL}/WLA/WLADetail`
      const data = axios.post(url,param).then(response => response.data)
      return data
   }
   async updateWlaDetail(datas,id){
      const url = `${BASE_URL}/WLA/WLADetail/`+id
      const data = axios.put(url,datas).then(response => response.data)
      return data
   }
   async getUtilization(startdate,finishdate,kelompokid,roleid){
      const url = `${BASE_URL}/Utilization/GetViewUtilizationByID/${startdate}/${finishdate}/${kelompokid}/${roleid}`
      const data = axios.get(url).then(response => response.data)
      return data
   }
   async getUtilizationDetail(id){
      const url = `${BASE_URL}/Utilization/GetViewProjectByID/${id}`
      const data = axios.get(url).then(response => response.data)
      return data
   }
   async createMandaysUsage(param){
      const url = `${BASE_URL}/MandaysUsage`
      const data = axios.post(url,param).then(response => response.data)
      return data
   }
   async updateMandaysUsage(datas,id){
      const url = `${BASE_URL}/MandaysUsage/${id}`
      const data = axios.put(url,datas).then(response => response.data)
      return data
   }
   // async getMandayId(id){
   //    const url = `${BASE_URL}/Manday/${id}`
   //    const data = axios.get(url).then(response => response.data)
   //    return data
   // }
 }
