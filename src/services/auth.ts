'use server'

import { cookies } from 'next/headers';
import { api } from '../services/api';

export async function login(user: string, password: string) {
  try {
    if (!user || !password) {
      throw new Error('User and password are required');
    }

    console.log('Attempting login with user:', user);
    
    const response = await api.post('/auth', { 
      name: user,
      password: password
    });
    
    if (!response.data?.token) {
      console.error('No token received in response:', response.data);
      throw new Error('Authentication failed: No token received');
    }
    
    console.log('Login successful, setting session cookie');
    
    (await cookies()).set('session', response.data.token, {
      httpOnly: false,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24 * 7, // 1 week
    });
    
    return { success: true };
    
  } catch (error) {
    console.error('Login error details:', error);
    throw error;
  }
}