import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json'
    }
});

// Add a request interceptor to include auth token
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

export const authService = {
    login: (credentials) => api.post('/auth/login', credentials),
    register: (credentials) => api.post('/auth/register', credentials),
    getMe: () => api.get('/auth/me')
};

export const projectService = {
    getProjects: (params) => api.get('/projects', { params }),
    getProject: (id) => api.get(`/projects/${id}`),
    createProject: (data) => api.post('/projects', data),
    updateProject: (id, data) => api.put(`/projects/${id}`, data),
    deleteProject: (id) => api.delete(`/projects/${id}`)
};

export const categoryService = {
    getCategories: (params) => api.get('/categories', { params }),
    createCategory: (data) => api.post('/categories', data),
    updateCategory: (id, data) => api.put(`/categories/${id}`, data),
    deleteCategory: (id) => api.delete(`/categories/${id}`)
};

export const inquiryService = {
    getInquiries: (params) => api.get('/inquiries', { params }),
    submitInquiry: (data) => api.post('/inquiries', data),
    deleteInquiry: (id) => api.delete(`/inquiries/${id}`)
};

export const statsService = {
    getDashboardStats: () => api.get('/stats/dashboard')
};

export default api;

