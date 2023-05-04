import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import { useRouter } from "next/router";
import { getBaseURL } from "@/utils";
import RoomCard from "@/components/RoomCard";
const inter = Inter({ subsets: ["latin"] });

export async function getServerSideProps() {
  const res = await fetch(`${getBaseURL()}/api/rooms`);
  const rooms = await res.json();
  return {
    props: {
      rooms: rooms ?? [],
    },
  };
}

export default function Home({ rooms }) {
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
      <div className={styles.roomsContainer}>
        {rooms.room?.map((room, index) => (
          <RoomCard key={room?._id} room={room} index={index} />
        ))}
      </div>
      <button className={styles.createRoomBtn} onClick={handleEnterRoom}>
        Create New Room
      </button>
    </main>
  );
}
