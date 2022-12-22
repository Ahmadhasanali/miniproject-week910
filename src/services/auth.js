import axios from 'axios';

const API_URL = 'http://13.214.149.116';

const register = (username, email, password) => {
    return axios.post(`${API_URL}/user/register`, {
        username: username,
        email: email,
        password: password,
    });
};

const login = (email, password) => {
    return axios.post(`${API_URL}/user/login`, {
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
