export const BASE_URL=import.meta.env.VITE_BASE_URL;

export const API_PATHS={
    AUTH:{
        REGISTER: import.meta.env.VITE_AUTH_REGISTER,
        LOGIN: import.meta.env.VITE_AUTH_LOGIN,
        GET_PROFILE: "/api/auth/profile",
    },
    IMAGE:{
        UPLOAD_IMAGE: "/api/auth/upload-image",
    },
    AI:{
        GENERATE_QUESTIONS: "/api/ai/generate-questions",
        GENERATE_EXPLANATIONS:"/api/ai/generate-explanation",
    },
    SESSION: {
        CREATE: "/api/session/create",
        GET_ALL:"/api/session/my-sessions",
        GET_ONE: (id) => `/api/session/${id}`,
        DELETE: (id) => `/api/session/${id}`,
    },
    QUESTION: {
        ADD_TO_SESSION: "/api/question/add",
        PIN: (id) => `/api/question/${id}/pin`,
        UPDATE_NOTE: (id) => `/api/${id}/note`,
    }
};