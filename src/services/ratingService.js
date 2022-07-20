import $api from "../http";

const ratingService = {
    async getRatingInfoService() {
        return $api.get("/posts/1");
    },

    async getListOfStudentsService() {
        return $api.get("/users");
    },

    async getPageOfStudentsService({limit, page}) {
        return $api.get(`/users?_limit=${limit}&_start=${(page - 1) * limit}`);
    },

    async addStudentService(student) {
        return $api.post("/users", student);
    },

    async deleteStudentService(id) {
        return $api.post("/users", id);
    },
};

export const {
    getRatingInfoService,
    getListOfStudentsService,
    getPageOfStudentsService,
    addStudentService,
    deleteStudentService,
} = ratingService;