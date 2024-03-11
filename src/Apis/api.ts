
import axios from 'axios';
import { API_BASE_URL } from './constants';



export const getApiCall = async (endpoint: string) => {
    try {
        const response: any = await axios.get(`${API_BASE_URL}/${endpoint}`);
        // console.log("response", response)
        return response.data;
    } catch (error) {
        // console.log("error",error)
        throw error;
    }

}