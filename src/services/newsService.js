import $api from "../http";

const newsService = {
    async getLastNewsService() {
        return $api.get("/posts?_start=0&_limit=8");
    },

    async getNewsByIdService(id) {
        return $api.get(`/posts/${id}`);
    },

    async addNewsService(news) {
        const error = [];
        news.title.length === 0 && error.push("введите заголовок статьи");
        news.body.length === 0 && error.push("введите контент статьи");
        if( error.length ) throw new Error(error.join("; "));
        return $api.post(`/posts/`, news);
    },

    async deleteNewsService(id) {
        return $api.post(`/posts/`, {id});
    },

    async editNewsService(news) {
        return $api.post(`/posts/`, news);
    },
};

export const {
    getLastNewsService,
    getNewsByIdService,
    addNewsService,
    deleteNewsService,
    editNewsService,
} = newsService;