import axios from 'axios';

// Create custom Axios instance with default configurations
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || '/api', // Support environment variable in production, fallback to local proxy in dev
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor for uniform error handling
api.interceptors.response.use(
  (response) => response.data,
  (error) => {
    // Extract a user-friendly error message from the response
    const apiError = {
      message: error.response?.data?.message || 'A network error occurred. Please try again.',
      error: error.response?.data?.error || 'Network Error',
      status: error.response?.status,
    };
    return Promise.reject(apiError);
  }
);

export const taskService = {
  /**
   * Fetch tasks with optional filters
   * @param {string} search
   * @param {string} status
   */
  getTasks: (search = '', status = '') => {
    const params = {};
    if (search) params.search = search;
    if (status && status !== 'all') params.status = status;
    return api.get('/tasks', { params });
  },

  /**
   * Get a single task by ID
   * @param {string} id
   */
  getTaskById: (id) => {
    return api.get(`/tasks/${id}`);
  },

  /**
   * Create a new task
   * @param {object} taskData { title, description, dueDate }
   */
  createTask: (taskData) => {
    return api.post('/tasks', taskData);
  },

  /**
   * Update an existing task (fields or completion toggle)
   * @param {string} id
   * @param {object} taskData
   */
  updateTask: (id, taskData) => {
    return api.put(`/tasks/${id}`, taskData);
  },

  /**
   * Delete a task by ID
   * @param {string} id
   */
  deleteTask: (id) => {
    return api.delete(`/tasks/${id}`);
  },
};

export default api;
