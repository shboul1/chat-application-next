import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import { useRouter } from "next/router";
const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const router = useRouter();

  async function handleEnterRoom() {
    const resp = await fetch("/api/rooms", {
      method: "POST",
    });
    const { roomId } = await resp.json();
    router.push(`/rooms/${roomId}`);
  }
  return (
    <main className={`${styles.main} ${inter.className}`}>
      <h1 className={styles.title} onClick={handleEnterRoom}>
        Enter Room! ➡️
      </h1>
    </main>
  );
}
