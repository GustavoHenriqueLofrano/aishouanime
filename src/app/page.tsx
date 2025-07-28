"use client"

import 'react-toastify/dist/ReactToastify.css';
import { login } from '../services/auth';
import { toast } from 'react-toastify';
import Image from 'next/image';
import styles from './page.module.scss';
import LogoImg from '../../public/logoAA.png';
import Link from 'next/link';

export default function LoginPage() {
  async function handleLogin(formData: FormData ){
    
    const user = formData.get('user') as string;
    const password = formData.get('password') as string;
    
    if (!user || !password) {
      toast.error('User and password are required', {
        autoClose: 1000,
      });
      return;
    }

    try {
      const result = await login(user, password);

      if (result) {
        window.location.href = '/home';
      } else {
        throw new Error('Authentication failed');
        
      }
    } catch (error) {
      console.error('Login error:', error);
      toast.error('User or password invalid', {
        autoClose: 1500,
      });
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
        <form action={handleLogin}>
          <div className={styles.formGroup}>
            <label htmlFor="user">User</label>
            <input
              name="user"
              type="text"
              id="user"
              required
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="password">Password</label>
            <input
              name="password"
              type="password"
              id="password"
              required
            />
          </div>
          <button type="submit" className={styles.submitButton}>
            Login
          </button>
          <p className={styles.registerLink}>
            Don't have an account?
            <Link href="/signup">
              Sign up
            </Link>
          </p>
        </form>
      </section>
    </main>
  )
}
