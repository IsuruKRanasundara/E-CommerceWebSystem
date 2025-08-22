import api from "./api";

const AuthService = {
    login: async (email, password) => {
        const res = await api.post("/auth/login", { email, password });
        if (res.data.token) {
            localStorage.setItem("token", res.data.token);
        }
        return res.data;
    },

    register: async (userData) => {
        const res = await api.post("/auth/register", userData);
        return res.data;
    },

    logout: () => {
        localStorage.removeItem("token");
    },
};

export default AuthService;
