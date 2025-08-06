import styles from './page.home.module.scss'
import { Header } from './components/header'
import Image from 'next/image'
import Imagee from '@/public/tongue.jpg'


export default function Home() {
  

  return (
    <main className={styles.container}>
      <div>
      <Header />
        <h1>Home</h1>
        <Image src={Imagee} alt="Imagee" />
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto <br></br>repudiandae dolores illum inventore, delectus, consequatur commodi maxime, tempore eos sequi iste est. Iste iusto iure accusamus, sequi error neque magni!</p>
      </div>
    </main>
    
  )
}