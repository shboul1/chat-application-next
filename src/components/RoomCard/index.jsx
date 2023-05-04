import React from "react";
import styles from "./styles.module.css";
import { useRouter } from "next/router";
import { MdOutlineArrowForwardIos } from "react-icons/md";

export default function RoomCard({ room, index }) {
  const router = useRouter();
  return (
    <div
      className={styles.roomCard}
      onClick={() => router.push(`/rooms/${room?._id}`)}
    >
      <div>
        <strong>Room #{index + 1}</strong>
        <p className={styles.roomId}>ID: {room._id}</p>
      </div>
      <div>
        <MdOutlineArrowForwardIos />
      </div>
    </div>
  );
}
