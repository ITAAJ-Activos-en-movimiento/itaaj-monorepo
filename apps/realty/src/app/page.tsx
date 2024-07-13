// import Image from 'next/image'
import Search from '@/components/Search'
import styles from './page.module.css'
// import dynamic from 'next/dynamic'
import { Banner, General, MostSearched, Publish, Questions, Way } from '@/sections'
// import { Footer } from '@/components'
import Developments from '@/sections/Home/Developments'
 
// const Header = dynamic(() => import('../components/Layout/Header'), { ssr: false })
export default function Home() {
  return (
    <>
    <main className={styles.main}>
    <Banner />
    <Developments />
    {/* <Exclusive /> */}
    <Publish />
    <General />
    <Way />
    <Questions />
    <MostSearched />
    <Search />
    </main>
    </>
    
  )
}

