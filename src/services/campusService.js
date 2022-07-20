import $api from "../http";

const authService = {
    async getCampusInfoService() {
        return $api.get("/comments/15");
    },

    async getCampusImagesService() {
        return $api.get(`/photos?_limit=9`);
    },

    async getSettlingCampusInfoService() {
        return $api.get("/posts/1");
    },
};

export const {
    getCampusInfoService,
    getSettlingCampusInfoService,
    getCampusImagesService,
} = authService;