// API Configuration
// This will use environment variable in production or fallback to localhost in development

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8080';

export default API_BASE_URL;
