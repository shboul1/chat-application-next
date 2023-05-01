import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [rooms, setRooms] = useState([]);
  const router = useRouter();
  useEffect(() => {
    (async () => {
      const res = await fetch("/api/rooms");
      const rooms = await res.json();
      if (rooms) {
        setRooms(rooms.room);
      }
    })();
  }, []);
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
      {rooms?.map((room) => (
        <div key={room?._id}>
          <h2 onClick={() => router.push(`/rooms/${room?._id}`)}>{room._id}</h2>
        </div>
      ))}
    </main>
  );
}
