"use client"

import styles from './page.signup.module.scss';
import Image from 'next/image';
import LogoImg from '../../../public/logoAA.png';
import { api } from "@/src/services/api";
import { toast } from 'react-toastify';
import Link from 'next/link';

export default function SignupPage() {
  async function handleSubmit(formData: FormData) {
    const name = formData.get('name') as string;
    const password = formData.get('password') as string;

    if (!name || !password) {
      return;
    }
    if (name.length < 4) {
      toast.warning('Name must have at least 4 characters');
      return;
    }
    if (password.length < 8) {
      toast.warning('Password must have at least 8 characters');
      return;
    }

    try {
      const response = await api.post('/users', { name, password });
      console.log('Resposta da API:', response.data);
      toast.success('User created successfully, redirecting to login page', {
        position: "top-center",
        autoClose: 1000,
        closeOnClick: false,
        pauseOnHover: false,
        draggable: false,
      });
      await (new Promise(resolve => setTimeout(resolve, 2000)))
      window.location.href = '/'
    } catch (err) {
      console.error(err);
      toast.warning('User already exists');
      return;
    }

  }

  return (
    <main className={styles.container}>
      <section className={styles.SignupPage}>
        <Link href="/" className={styles.LinkLogin}>
          
        </Link>
        <Image
          src={LogoImg}
          alt="Logo"
          priority
          suppressHydrationWarning
        />
        <span>create your account:</span>
        <form action={handleSubmit}>
          <div className={styles.formGroup}>
            <label htmlFor="name">User</label>
            <input
              id="name"
              name="name"
              type="text"
              required
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="password">Password</label>
            <input
              id="password"
              name="password"
              type="text"
              required
            />
          </div>
          <button>Register</button>
        </form>
      </section>
    </main>
  )
}