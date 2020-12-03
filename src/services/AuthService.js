import axios from 'axios';

const API_URL = 'http://localhost:8080/api/auth';

class AuthService {
    login(username, password) {
        return axios.post(API_URL + '/signin', {
            username,
            password
        }).then(response => {
            if (response.data.access_token) {
                localStorage.setItem('user', JSON.stringify(response.data));
            }
            return response.data;
        });
    }

    signup(username, email, password) {
        return axios.post(API_URL + " /signup", {
            username,
            email,
            password
        });
    }

    logout() {
        localStorage.removeItem('user');
    }

    getUser() {
        return JSON.parse(localStorage.getItem('user'));
    }
}


export default new AuthService();