'use client'
import styles from './page.module.scss';
import LogoImg from '@/public/logoAA.png';
import Image from 'next/image';
import Link from 'next/link';
import 'react-toastify/dist/ReactToastify.css';
import { login } from '@/src/services/auth';
import { toast } from 'react-toastify';


export default function LoginPage() {
  
  async function handleLogin(event: FormData) {
    
    const user = event.get('user') as string;
    const password = event.get('password') as string;
    
    if (!user || !password) {
      toast.warning('User and password are required');
      return;
    }
    try {
      await login(user, password);
      toast.success('Login successful');
      window.location.href = '/home';
    } catch (err) {
      console.error(err);
      toast.warning('User or password is incorrect');
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
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="password">Password</label>
            <input
              name="password"
              type="password"
              id="password"
            />  
          </div>
          <button 
            type="submit" 
            className={styles.submitButton}
          >
            Login
          </button>
          <p className={styles.error}></p>
          <p className={styles.registerLink}>
            Don&apos;t have an account?
            <Link href="/signup">
              Sign up
            </Link>
          </p>
        </form>
      </section>
    </main>
  )
}
