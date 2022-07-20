import $api from "../http";

const sportsService = {
    async getSportsPostsService() {
        return $api.get("/posts?_limit=8");
    },

    async getSportsPostByIdService(id) {
        return $api.get(`/posts/${id}`);
    },

    async deleteSportsPostService(id) {
        return $api.post(`/posts/`, id);
    },
};

export const {
    getSportsPostsService,
    getSportsPostByIdService,
    deleteSportsPostService,
} = sportsService;