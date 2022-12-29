import axios from "axios";
import authHeader from "./authHeader";
const BASE_URL = "http://localhost:8080";


export const getServiceProvider = async () => {
    const response = await axios.get( BASE_URL + '/api/providers/get', { headers: authHeader() } )
    return response.data;
}
export const getServiceProviderProfileInfo = async () => {
    const response = await axios.get( BASE_URL + '/api/providers/info', { headers: authHeader() })
    return response.data;
}

export const updateServiceProviderProfileInfo = async ( info ) => {
    return await axios.post( BASE_URL + "/api/providers/info", info,  { headers: authHeader() } );
}

export const getServices = async () => {
    const response = await axios.get( BASE_URL + '/api/services', { headers: authHeader() } )
    return response.data;
}

export const saveService = async ( service ) => {
    return await axios.post( BASE_URL + "/api/services", service,  { headers: authHeader() } );
}

export const updateService = async ( service ) => {
    return await axios.put( BASE_URL + "/api/services", service,  { headers: authHeader() } );
}

export const deleteService = async ( id ) => {
    return await axios.delete( BASE_URL + "/api/services/" + id ,  { headers: authHeader() } );
}

export const findServiceProviders = async () => {
    const response = await axios.get( BASE_URL + '/api/providers/find', { headers: authHeader() } )
    return response.data;
}

export const getImageById = async ( id ) => {
    const response = await axios.get( BASE_URL + '/api/images/' + id,{ headers: authHeader() });
    return response.data;
};

export const getServiceProviderById = async ( id ) => {
    const response = await axios.get( BASE_URL + '/api/providers/view/' + id, { headers: authHeader() } )
    return response.data;
};
