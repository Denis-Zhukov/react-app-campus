import axios from "axios";

export const API_URL = "https://jsonplaceholder.typicode.com";

const $api = axios.create({
    withCredentials: true,
    baseURL: API_URL,
});

$api.interceptors.request.use((config) => {
    config.headers.Authorizaiton = `Bearer ${localStorage.getItem("token")}`;
    return config;
});

$api.interceptors.response.use((config) => config,
    async (error) => {
        const originalRequest = error.config;
        if( error.response.status === 401 && error.config && !error.config._isRetry ) {
            originalRequest._isRetry = true;
            try {
                const response = await axios.get(`${API_URL}/refresh`, {withCredentials: true});
                localStorage.setItem("token", response.data.access_token);
                return $api.request(originalRequest);
            } catch(e) {
                localStorage.removeItem("token");
            }
        }
        throw error;
    },
);

export default $api;