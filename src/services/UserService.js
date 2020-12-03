import axios from 'axios';
import authHeader from './AuthHeader';

const API_URL = 'http://localhost:8080/api/test';

class UserService{
    getPublicContent(){
        return axios.get(API_URL + "/all-access", {
            headers: authHeader()
        });
    }

    getUserContent(){
        return axios.get(API_URL + "/user", {
            headers: authHeader()
        });
    }

    getModContent(){
        return axios.get(API_URL + "/mod", {
            headers: authHeader()
        });
    }

    getAdminContent(){
        return axios.get(API_URL + "/admin", {
            headers: authHeader()
        });
    }
}

export default new UserService();