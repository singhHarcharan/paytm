// Use environment variable if available, otherwise default to local development
const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001';
export const API_BASE_URL = `${API_BASE}/api/v1`;

// Log the API base URL in development for debugging
if (import.meta.env.DEV) {
  console.log('API Base URL:', API_BASE_URL);
}
