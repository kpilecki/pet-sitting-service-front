import axios from "axios";
import authHeader from "./authHeader";
const BASE_URL = "http://localhost:8080";

export const getPets = async () => {
    const response = await axios.get( BASE_URL + '/api/pets', { headers: authHeader() });
    return response.data;
};

export const getPetById = async ( id ) => {
  const response = await axios.get( BASE_URL + '/api/pets/' + id, { headers:authHeader() });
  return response.data;
};

export const savePet = async ( pet ) => {
    return await axios.post( BASE_URL + '/api/pets', pet, { headers: authHeader() });
};

export const updatePet = async ( pet ) => {
    return await axios.put( BASE_URL + '/api/pets', pet, { headers: authHeader() });
};

export const getPetImage = async ( id ) => {
    const response = await axios.get( BASE_URL + '/api/images/pet/' + id , { headers: authHeader() });
    return response.data;
};

export const savePetImage = async ( { id, image } ) => {
    console.log( id);
    console.log( image );
    const formData = new FormData();
    formData.append("file", image );
    return await axios.post( BASE_URL + '/api/images/pet/' + id, formData, { headers: authHeader() });
};