import styles from "./page.module.css";
import {
  Banner,
  General,
  MostSearched,
  Publish,
  Questions,
  Way,
} from "@/sections";
import Developments from "@/sections/Home/Developments";
import { Suspense } from "react";

// const Header = dynamic(() => import('../components/Layout/Header'), { ssr: false })
export default function Home() {
  return (
    <Suspense>
      <main className={styles.main}>
        <Banner />
        <Developments />
        {/* <Exclusive /> */}
        <Publish />
        <General />
        <Way />
        <Questions />
        <MostSearched />
      </main>
    </Suspense>
  );
}
