import $api from "../http";

const authService = {
    async login(login, password, remember) {
        return $api.post("/login", {login, password, remember});
    },

    async logout() {
        return $api.post("/logout");
    },
};

export default authService;