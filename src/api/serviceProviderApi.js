import axios from "axios";
import authHeader from "./authHeader";
const BASE_URL = "http://localhost:8080";


export const getServiceProvider = async () => {
    const response = await axios.get( BASE_URL + '/api/providers/get', { headers: authHeader() } )
    return response.data;
}
export const getServiceProviderAbout = async () => {
    const response = await axios.get( BASE_URL + '/api/providers/about', { headers: authHeader() })
    return response.data;
}

export const updateServiceProviderAbout = async ( about ) => {
    return await axios.post( BASE_URL + "/api/providers/about", about,  { headers: authHeader() } );
}

export const getCustomerAddress = async () => {
    const response = await axios.get( BASE_URL + '/api/customers/address', { headers: authHeader() });
    return response.data;
}

export const createUpdateCustomerAddress = async ( address ) => {
    return await axios.post( BASE_URL + "/api/customers/address", address, { headers: authHeader() })
};