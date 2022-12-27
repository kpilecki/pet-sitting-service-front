import axios from "axios";
import authHeader from "./authHeader";
const BASE_URL = "http://localhost:8080";

export const getCustomer = async () => {
    const response = await axios.get( BASE_URL + '/api/customers/get', { headers: authHeader() } );
    return response.data;
};

export const updateCustomer = async ( customer ) => {
    return await axios.post( BASE_URL + "/api/customers/", customer,  { headers: authHeader() } );
};

export const getCustomerAddress = async () => {
    const response = await axios.get( BASE_URL + '/api/customers/address', { headers: authHeader() });
    return response.data;
};

export const createUpdateCustomerAddress = async ( address ) => {
  return await axios.post(  BASE_URL + "/api/customers/address", address, { headers: authHeader() });
};

export const updateProfileImage = async ( image ) => {
    const formData = new FormData();
    formData.append("file", image );
    return await axios.post(  BASE_URL + '/api/images/customer', formData, {
        headers: authHeader()
    });
};

export const getProfileImage = async () => {
    const response = await axios.get( BASE_URL + '/api/images/customer', { headers: authHeader() });
    return response.data;
};
