import { useState, useEffect } from 'react';
import apiService from '../services/api';
import { User } from '../types';

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const response = await apiService.getMe();
        if (response.success) {
          setUser(response.user);
          setIsLoggedIn(true);
        }
      } catch (error) {
        localStorage.removeItem('token');
      }
    }
    setLoading(false);
  };

  const register = async (name: string, email: string, password: string) => {
    setError('');
    setSuccess('');
    try {
      const response = await apiService.register(name, email, password);
      if (response.success) {
        localStorage.setItem('token', response.token);
        setUser(response.user);
        setIsLoggedIn(true);
        setSuccess('Registration successful!');
        setTimeout(() => setSuccess(''), 3000);
      }
    } catch (err: any) {
      setError(err.response?.data?.message || err.response?.data?.errors?.[0]?.msg || 'Registration failed');
      setTimeout(() => setError(''), 3000);
    }
  };

  const login = async (email: string, password: string) => {
    setError('');
    setSuccess('');
    try {
      const response = await apiService.login(email, password);
      if (response.success) {
        localStorage.setItem('token', response.token);
        setUser(response.user);
        setIsLoggedIn(true);
        setSuccess('Login successful!');
        setTimeout(() => setSuccess(''), 3000);
      }
    } catch (err: any) {
      setError(err.response?.data?.message || 'Login failed');
      setTimeout(() => setError(''), 3000);
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
    setIsLoggedIn(false);
  };

  return {
    user,
    isLoggedIn,
    loading,
    error,
    success,
    register,
    login,
    logout,
  };
};