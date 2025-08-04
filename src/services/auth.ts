// src/services/auth.ts
"use server"

import { cookies } from 'next/headers';
import { api } from './api';

export async function login(user: string, password: string) {
  try {
    if (!user || !password) {
      throw new Error('User and password are required');
    }

    console.log('Attempting login with user:', user);
    
    const response = await api.post('/auth', { 
      user: user,
      password: password
    });
    
    if (!response.data?.token) {
      console.error('No token received in response:', response.data);
      throw new Error('Authentication failed: No token received');
    }
    
    console.log('Login successful, setting session cookie');
    
    // Set the cookie with appropriate settings
    const isProduction = process.env.NODE_ENV === 'production';
    const cookieStore = cookies();
    
    (await cookieStore).set({
      name: 'session',
      value: response.data.token,
      httpOnly: false, 
      secure: isProduction, // Only send over HTTPS in production
      sameSite: 'lax', // Helps with CSRF protection
      path: '/',
      maxAge: 60 * 60 * 24 * 7, // 1 week
    });
    
    return { success: true };
    
  } catch (error: any) {
    console.error('Login error:', {
      message: error.message,
      response: error.response?.data,
      status: error.response?.status,
      stack: error.stack
    });
    
  
    if (error.response) {
      if (error.response.status === 401) {
        throw new Error('Invalid username or password');
      } else if (error.response.status >= 500) {
        throw new Error('Server error. Please try again later.');
      }
    } if (error.request) {
      throw new Error('No response from server. Please check your connection.');
    }
    
    throw new Error(error.message || 'An error occurred during login');
  }
}