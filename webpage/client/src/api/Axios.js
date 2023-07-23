import axios from 'axios';

const localAxios = axios.create( {
    baseURL: 'https://orbital2-api.onrender.com',
})

export default localAxios;