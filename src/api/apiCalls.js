import axios from "axios";

export const signup = ( user ) => {
    return axios.post( '/api/1.0/customers', user );
};

export const login = ( user ) => {
    return axios.post( '/api/auth/login',  user);
};

export default { login, signup };