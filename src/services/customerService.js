import axios from "axios";
import authHeader from "../api/authHeader";
const BASE_URL = "http://localhost:8080";

export const signup = ( customer ) => {
    return axios.post( BASE_URL + '/api/customers/signup', customer );
};

export const getCustomer = () => {
    return axios.get( BASE_URL +  'api/customers/get', { headers: authHeader() } );
};

export default { signup, getCustomer };