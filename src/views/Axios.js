import axios from 'axios'
const BASE_URL = 'http://35.219.8.90:81/api'
const options = {
    headers: {
        'Content-Type': 'application/json',
        'Access-Allow-Control': '*'
    }
}
export class Axios{ 
   async getLookup(){
       const url = `${BASE_URL}/Lookups`
       const data = axios.get(url,options).then(response => response.data)
       return data
    }
    async createLookup(param){
        const url = `${BASE_URL}/Lookups`
        const data = axios.post(url,options,param).then(response => response.data)
        return data
     }

 } 