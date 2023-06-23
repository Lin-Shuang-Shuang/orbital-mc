import axios from 'axios';

const localAxios = axios.create( {
    baseURL: 'http://localhost:3002',
})

export default localAxios;