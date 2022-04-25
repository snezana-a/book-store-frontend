import axios from "axios";

const instance = axios.create({
    baseURL: 'https://emt-lab-bookstore-web.herokuapp.com/',
    headers: {
        'Access-Control-Allow-Origin' : '*',
        'Access-Control-Allow-Methods' : 'DELETE, POST, GET, OPTIONS',
        'Access-Control-Allow-Headers' : 'Content-Type, Authorization, X-Requested-With, Origin, Accept',
        'Authorization': localStorage.getItem("JWT")
    }
})

export default instance;