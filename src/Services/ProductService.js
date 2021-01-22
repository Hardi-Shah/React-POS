import axios from "axios";

export const apiurl='http://localhost:3002/products';

export function getProductService(){
    return axios.get(`${apiurl}`)
}
export function editProductService(id,values) {
  return axios.put(`${apiurl}/${id}`, values);
}
export function getProductServiceById(id){
    return axios.get(`${apiurl}/${id}`)
}
export function addProductService(values) {
    return axios.post(`${apiurl}`, values);
  }
  export function deleteProductServiceById(id){
    return axios.delete(`${apiurl}/${id}`)
}
