import axios from 'axios';

const localAxios = axios.create( {
    baseURL: 'https://technotes-api.onrender.com',
})

export default localAxios;