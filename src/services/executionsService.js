import $api from "../http";

const executionsService = {
    async getExecutionsPostsService() {
        return $api.get("/posts?_limit=8&_start=8");
    },

    async getExecutionsPostByIdService(id) {
        return $api.get(`/posts/${id}`);
    },

    async deleteExecutionsPostService(id) {
        return $api.post(`/posts/`, id);
    },

    async editExecutionsPostService(post) {
        return $api.post(`/posts/`, post);
    },
};

export const {
    getExecutionsPostsService,
    getExecutionsPostByIdService,
    deleteExecutionsPostService,
    editExecutionsPostService,
} = executionsService;