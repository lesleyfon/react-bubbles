import axios from 'axios';

function getToken(){
   return localStorage.getItem('token');
}
export default function(){
    
    return axios.create({
        baseURL: 'http://localhost:5000',
        headers: {
            Authorization: getToken()
        }
    })
}