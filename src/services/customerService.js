import axios from "axios";
import authHeader from "../api/authHeader";

export const signup = ( customer ) => {
    return axios.post( '/api/customers/signup', customer );
};

export const getCustomer = () => {
    return axios.get( 'api/customers/get', { headers: authHeader() } );
};

export default { signup, getCustomer };