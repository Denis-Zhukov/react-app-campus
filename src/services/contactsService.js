import $api from "../http";

const contactsService = {
    async getContactsService(login, password) {
        return $api.get("/users?_limit=5");
    },
};

export const {
    getContactsService,
} = contactsService;