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

    async editSportsPostService(post) {
        return $api.post(`/posts/`, post);
    },
};

export const {
    getSportsPostsService,
    getSportsPostByIdService,
    deleteSportsPostService,
    editSportsPostService
} = sportsService;