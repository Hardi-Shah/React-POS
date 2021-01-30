import axios from "axios";

 export const apiurl='http://localhost:3002/categories';

export function getCategoryService(){
    return axios.get(`${apiurl}`)
}
export function editCategoryService(id,values) {
  return axios.put(`${apiurl}/${id}`, values);
}
export function getCategoryServiceById(id){
    return axios.get(`${apiurl}/${id}`)
}
export function addCategoryService(values) {
    return axios.post(`${apiurl}`, values);
  }
  export function deleteCategoryServiceById(id){
    return axios.delete(`${apiurl}/${id}`)
}
