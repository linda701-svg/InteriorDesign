import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'https://interiordesign-server.onrender.com/api';

// Must match ADMIN_SECRET in the backend .env (and Render environment variables)
const ADMIN_SECRET = 'archevo-admin-secret-2024';

const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json'
    }
});

// Attach the admin secret header on every request when admin is logged in
api.interceptors.request.use(
    (config) => {
        const isLoggedIn = localStorage.getItem('adminLoggedIn') === 'true';
        if (isLoggedIn) {
            config.headers['X-Admin-Secret'] = ADMIN_SECRET;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

export const projectService = {
    getProjects: (params) => api.get('/projects', { params }),
    getProject: (id) => api.get(`/projects/${id}`),
    createProject: (data) => api.post('/projects', data),
    updateProject: (id, data) => api.put(`/projects/${id}`, data),
    deleteProject: (id) => api.delete(`/projects/${id}`)
};

export const serviceService = {
    getServices: (params) => api.get('/services', { params }),
    createService: (data) => api.post('/services', data),
    updateService: (id, data) => api.put(`/services/${id}`, data),
    deleteService: (id) => api.delete(`/services/${id}`)
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
