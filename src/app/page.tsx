"use client"

import 'react-toastify/dist/ReactToastify.css';
import { login } from '../services/auth';
import { toast } from 'react-toastify';
import Image from 'next/image';
import styles from './page.module.scss';
import LogoImg from '../../public/logoAA.png';
import Link from 'next/link';
import { useState } from 'react';

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false);

  async function handleLogin(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault(); // Prevent default form submission
    const formData = new FormData(event.currentTarget); // Create FormData from the form
    const user = formData.get('user') as string;
    const password = formData.get('password') as string; 
    
    if (!user?.trim() || !password?.trim()) {
      toast.error('User and password are required', {
        autoClose: 1000,
      });
      return;
    }

    setIsLoading(true);

    try {
      await login(user, password);
      // Redirect on successful login
      window.location.href = '/home';
    } catch (error: any) {
      console.error('Login error:', error);
      // Show error message from the API or a default one
      toast.error(error.message || 'Failed to login. Please try again.', {
        autoClose: 1000,
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <main className={styles.container}>
      <section className={styles.login}> 
        <Image
          src={LogoImg}
          alt="Logo"
          priority
        />
        <h1>Login</h1>
        <form onSubmit={handleLogin}>
          <div className={styles.formGroup}>
            <label htmlFor="user">User</label>
            <input
              name="user"
              type="text"
              id="user"
              required
              disabled={isLoading}
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="password">Password</label>
            <input
              name="password"
              type="password"
              id="password"
              required
              disabled={isLoading}
            />
          </div>
          <button type="submit" disabled={isLoading}>
            {isLoading ? 'Logging in...' : 'Login'}
          </button>
          <p className={styles.registerLink}>
            Don&apos;t have an account?{' '}
            <Link href="/signup">
              Sign up
            </Link>
          </p>
        </form>
      </section>
    </main>
  )
}
