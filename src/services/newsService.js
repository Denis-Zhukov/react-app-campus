import $api from "../http";

const newsService = {
    async getLastNewsService() {
        return $api.get("/posts?_start=0&_limit=8");
    },

    async getNewsByIdService(id) {
        return $api.get(`/posts/${id}`);
    },

    async addNewsService(news) {
        return $api.post(`/posts/`, news);
    },

    async deleteNewsService(id) {
        return $api.post(`/posts/`, {id});
    },
};

export const {
    getLastNewsService,
    getNewsByIdService,
    addNewsService,
    deleteNewsService,
} = newsService;