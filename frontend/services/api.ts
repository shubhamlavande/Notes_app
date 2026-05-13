import axios, { AxiosInstance, InternalAxiosRequestConfig } from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

class ApiService {
  private api: AxiosInstance;

  constructor() {
    this.api = axios.create({
      baseURL: API_URL,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // Add token to requests if it exists
    this.api.interceptors.request.use(
      (config: InternalAxiosRequestConfig) => {
        const token = localStorage.getItem('token');
        if (token && config.headers) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );
  }

  // Auth endpoints
  async register(name: string, email: string, password: string) {
    const response = await this.api.post('/auth/register', { name, email, password });
    return response.data;
  }

  async login(email: string, password: string) {
    const response = await this.api.post('/auth/login', { email, password });
    return response.data;
  }

  async getMe() {
    const response = await this.api.get('/auth/me');
    return response.data;
  }

  // Notes endpoints
  async getNotes() {
    const response = await this.api.get('/notes');
    return response.data;
  }

  async createNote(title: string, content: string) {
    const response = await this.api.post('/notes', { title, content });
    return response.data;
  }

  async updateNote(id: string, title: string, content: string) {
    const response = await this.api.put(`/notes/${id}`, { title, content });
    return response.data;
  }

  async deleteNote(id: string) {
    const response = await this.api.delete(`/notes/${id}`);
    return response.data;
  }
}

export default new ApiService();