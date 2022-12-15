import axios from "axios";

export const signup = ( customer ) => {
    return axios.post( '/api/customers/signup', customer );
};

export default { signup };