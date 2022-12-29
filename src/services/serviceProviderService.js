import axios from "axios";
const BASE_URL = "http://localhost:8080";
export const signup = ( provider ) => {
    return axios.post( BASE_URL + '/api/providers/signup', provider );
};

export default { signup };