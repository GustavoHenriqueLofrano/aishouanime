// src/services/auth.ts
"use server"

import { cookies } from 'next/headers';
import { api } from './api';
import { AxiosError } from 'axios';

export async function login(user: string, password: string) {
  try {
    console.log('Attempting login with user:', user);
    
    const response = await api.post('/auth', { 
      user: user.trim(),
      password: password.trim()
    });
    
    if (!response.data?.token) {
      console.error('No token received in response:', response.data);
      throw new Error('Authentication failed: No token received');
    }
    
    console.log('Login successful, setting session cookie');
    const cookieStore = await cookies();
    cookieStore.set({
      name: 'session',
      value: response.data.token,
      httpOnly: false,
      path: '/',
      secure: process.env.NODE_ENV === 'production',
    });
    
    return { success: true };
  } catch (error: unknown) {
    const axiosError = error as AxiosError;
    console.error('Login error:', {
      message: axiosError.message,
      response: axiosError.response?.data,
      status: axiosError.response?.status
    });
    
    if (axiosError.response?.status === 401) {
      throw new Error('User or password invalid');
    }
  }
}