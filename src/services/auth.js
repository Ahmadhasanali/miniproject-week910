import axios from 'axios';

const API_URL = 'http://localhost:8000';

const register = (firstName, lastName, email, password) => {
    return axios.post(`${API_URL}/users/register`, {
        first_name: firstName,
        last_name: lastName,
        email: email,
        password: password,
    });
};

const login = (email, password) => {
    return axios.post(`${API_URL}/users/login`, {
        email: email,
        password: password,
    }).then(response => {
        if (response.data.token) {
            localStorage.setItem('user', JSON.stringify(response.data));
        }

        return response.data;
    });
};

const logout = () => {
    localStorage.removeItem('user');
};

const authService = {
    register,
    login,
    logout,
};

export default authService;
