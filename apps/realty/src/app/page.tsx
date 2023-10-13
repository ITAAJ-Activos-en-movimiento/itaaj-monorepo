import Image from 'next/image'
import styles from './page.module.css'
import dynamic from 'next/dynamic'
import { Banner, Exclusive, General, MostSearched, Publish, Questions, Way } from '@/sections'
import { Footer } from '@/components'
 
const Header = dynamic(() => import('../components/Layout/Header'), { ssr: false })
export default function Home() {
  return (
    <>
    <main className={styles.main}>
    <Banner />
    <Exclusive />
    <Publish />
    <General />
    <Way />
    <Questions />
    <MostSearched />
    </main>
    </>
    
  )
}

