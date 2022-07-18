import $api from "../http";

const authService = {
    async login(login, password) {
        return $api.post("/login", {login, password});
    },
};

export default authService;