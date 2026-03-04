const isDevelopment = import.meta.env.MODE === 'development';

export const API_BASE_URL = isDevelopment
    ? 'http://localhost/hostel-connect/backend/api'
    : '/backend/api';

export const BACKEND_URL = isDevelopment
    ? 'http://localhost/hostel-connect/backend'
    : '/backend';
