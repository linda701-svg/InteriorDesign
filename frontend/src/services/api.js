import axios from 'axios';

// Automatically detect if we're in development or production
// Use localhost if on dev, otherwise production URL
const API_URL = window.location.hostname === 'localhost' 
    ? 'http://localhost:5000/api'
    : 'https://interiordesign-server.onrender.com/api';

// This secret must match ADMIN_SECRET on the backend
const ADMIN_SECRET = 'archevo-admin-secret-2024';

const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json'
    }
});

// Interceptor to attach admin secret to protected requests
api.interceptors.request.use(
    (config) => {
        // Only attach if user is logged in as admin locally
        const isLoggedIn = localStorage.getItem('adminLoggedIn') === 'true';
        if (isLoggedIn) {
            config.headers['X-Admin-Secret'] = ADMIN_SECRET;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// Services
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
