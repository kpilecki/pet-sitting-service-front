import axios from "axios";

export const signup = ( provider ) => {
    return axios.post( '/api/providers/signup', provider );
};

export default { signup };