import styles from './styles.module.scss';
import Image from 'next/image'
import LogoImg from '@/public/logoAA.png'


export function Header(){
    return(
        <header className={styles.headerContainer}>
            <div className={styles.logoContainer}>
            <Image src={LogoImg} alt="Logo" id={styles.logo} />
            </div>
            <div className={styles.headerContent}>

            </div>
        </header>

    )
}