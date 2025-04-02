// File: src/utils/axios/index.ts
import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';
import {
  BadRequestError,
  NotAuthorizedError,
  NotFoundError,
  ResourceAlreadyExistsError,
  ApplicationError
} from '../errors';

// Service URLs
const SERVICE_URLS = {
  BACKEND_BASE_URL: process.env.BACKEND_BASE_URL || ''
};

// Function to create axios instance for a specific service
const createServiceClient = (baseURL: string): AxiosInstance => {
  const instance = axios.create({
    baseURL,
    timeout: 30000, // 30 seconds
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    }
  });

  // Response interceptor for handling errors
  instance.interceptors.response.use(
    (response) => {
      return response;
    },
    (error: AxiosError) => {
      if (error.response) {
        const errorMessage = (error.response.data as { message?: string })?.message || 'An error occurred';
        const url = error.config?.url || 'unknown endpoint';

        console.error(`Error response: ${error.response.status} ${url}`);

        switch (error.response.status) {
          case 400:
            throw new BadRequestError(errorMessage);
          case 401:
            throw new NotAuthorizedError(errorMessage);
          case 403:
            throw new NotAuthorizedError('Forbidden - you don\'t have permission');
          case 404:
            throw new NotFoundError(errorMessage);
          case 422:
            throw new ResourceAlreadyExistsError(errorMessage);
          case 500:
          default:
            throw new ApplicationError(errorMessage, error.response.status);
        }
      } else if (error.request) {
        console.error('No response received:', error.request);
        throw new ApplicationError('No response from server, please try again later', 503);
      } else {
        console.error('Error setting up request:', error.message);
        throw new ApplicationError(error.message);
      }
    }
  );

  return instance;
};

// Create instances for each service
const bookServiceClient = createServiceClient(SERVICE_URLS.BACKEND_BASE_URL);

// Helper function to create standard API methods
const createApiClient = (instance: AxiosInstance) => ({
  get: <T>(url: string, config?: AxiosRequestConfig) =>
    instance.get<T, AxiosResponse<T>>(url, config),
  post: <T>(url: string, data?: any, config?: AxiosRequestConfig) =>
    instance.post<T, AxiosResponse<T>>(url, data, config),
  put: <T>(url: string, data?: any, config?: AxiosRequestConfig) =>
    instance.put<T, AxiosResponse<T>>(url, data, config),
  delete: <T>(url: string, config?: AxiosRequestConfig) =>
    instance.delete<T, AxiosResponse<T>>(url, config),
  patch: <T>(url: string, data?: any, config?: AxiosRequestConfig) =>
    instance.patch<T, AxiosResponse<T>>(url, data, config)
});

// Creat client for the Backend services
export const apiClient = createApiClient(bookServiceClient);

// Default export for backward compatibility
export default apiClient
