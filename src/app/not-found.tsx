import Link from 'next/link';
import styles from './not-found.module.scss';   
import Image from 'next/image';
import NotFoundImg from '@/public/luffy.jpg'

export default function NotFoundPage() {
    return (
        <main className={styles.container}>
            <section className={styles.notFound}>
                <h1>404</h1>
                <h2>Page not found</h2>
                <Image src={NotFoundImg} alt="Not Found" />
                <span><Link href="/home"><i className="bi bi-arrow-left"></i> Go back to home</Link></span>
            </section>
        </main>
    )
}
