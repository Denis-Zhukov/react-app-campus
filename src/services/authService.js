import $api from "../http";

const authService = {
    async login(login, password, remember) {
        return $api.post("/login", {login, password, remember});
    },
};

export default authService;