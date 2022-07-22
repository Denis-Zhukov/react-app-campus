import $api from "../http";

const eventsService = {
    async getEventsPostsService() {
        return $api.get("/posts?_limit=8");
    },

    async getEventsPostByIdService(id) {
        return $api.get(`/posts/${id}`);
    },

    async deleteEventsPostService(id) {
        return $api.post(`/posts/`, id);
    },

    async editEventsPostService(post) {
        return $api.post(`/posts/`, post);
    },
};

export const {
    getEventsPostsService,
    getEventsPostByIdService,
    deleteEventsPostService,
    editEventsPostService,
} = eventsService;