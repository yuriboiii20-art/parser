import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || '/api/parser';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000,
});

/**
 * Upload PDF resume file with progress tracking
 * @param {File} file 
 * @param {Function} onProgress 
 * @returns {Promise<Object>}
 */
export const uploadResume = async (file, onProgress) => {
  const formData = new FormData();
  formData.append('resume', file);

  const response = await api.post('/upload', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    onUploadProgress: (progressEvent) => {
      if (progressEvent.total) {
        const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
        if (onProgress) onProgress(percentCompleted);
      }
    },
  });

  return response.data;
};

/**
 * Fetch sample structured resume JSON
 * @returns {Promise<Object>}
 */
export const getSampleResume = async () => {
  const response = await api.get('/sample');
  return response.data;
};

/**
 * Download extracted JSON file URL
 * @param {string} [fileId] 
 * @returns {string} Download URL
 */
export const getDownloadUrl = (fileId) => {
  if (fileId) {
    return `${API_BASE_URL}/download/${fileId}`;
  }
  return `${API_BASE_URL}/download`;
};

export default api;
