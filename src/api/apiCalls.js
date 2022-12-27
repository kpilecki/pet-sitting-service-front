import axios from "axios";

const BASE_URL = "http://localhost:8080";

export const signup = ( user ) => {
    return axios.post( BASE_URL + '/api/1.0/customers', user );
};

export const login = ( user ) => {
    return axios.post( BASE_URL + '/api/auth/login',  user);
};

export default { login, signup };