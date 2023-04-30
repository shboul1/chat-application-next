import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import { useRouter } from "next/router";
const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const router = useRouter();
  function handleEnterRoom() {
    const roomId = Math.floor(Math.random() * 1000000);
    router.push(`/rooms/${roomId}`);
  }
  return (
    <main className={`${styles.main} ${inter.className}`}>
      <h1 className={styles.title} onClick={handleEnterRoom}>
        Enter Room!
      </h1>
    </main>
  );
}
