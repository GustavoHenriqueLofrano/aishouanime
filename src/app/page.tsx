"use server"

import 'react-toastify/dist/ReactToastify.css';
import { api } from '../services/api';
import { toast } from 'react-toastify';
import Image from 'next/image';
import styles from './page.module.scss';
import LogoImg from '../../public/logoAA.png';
import Link from 'next/link';
import { cookies } from 'next/headers';

export default function LoginPage() {


  async function handleLogin(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault(); // Prevent default form submission
    const formData = new FormData(event.currentTarget); // Create FormData from the form
    const user = formData.get('user') as string;
    const password = formData.get('password') as string; 
    
    if (!user || !password) {
      toast.error('User and password are required', {
        autoClose: 1000,
      });
      return;
    }

    try{
      const response = await api.post('/auth', { user, password })
        if(!response.data.token){
          toast.error('User or password invalid', {
            autoClose: 1000,
          });
          return;
        }
        (await cookies()).set('session', response.data.token, {
          httpOnly: false,
          secure: process.env.NODE_ENV === 'production',
          maxAge: 60 * 60 * 24 * 7,
          path: '/',
        });

        window.location.href = '/home'

    } catch (error) {
      console.error('Login error:', error);
      toast.error('An error occurred during login', {
        autoClose: 1000,
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
        <form onSubmit={handleLogin}>
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
          <button type="submit">
            Login
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
