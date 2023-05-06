import React from "react";
import { Inter } from "next/font/google";
import { useRouter } from "next/router";
import { useState, useEffect, useRef } from "react";
import { pusherClient } from "@/lib/pusher";
import { getBaseURL } from "@/utils";
import styles from "@/styles/Room.module.css";
const inter = Inter({ subsets: ["latin"] });

import MessageCard from "@/components/MessageCard";

export async function getServerSideProps({ params }) {
  const { id } = params;
  const res = await fetch(`${getBaseURL()}/api/messages/${id}`);
  const { messages } = await res.json();
  return {
    props: {
      existingMessages: messages ?? [],
    },
  };
}

export default function Room({ existingMessages }) {
  const router = useRouter();
  const { id } = router.query;
  const messageHandlerRef = useRef(null);

  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState(existingMessages ?? []);

  useEffect(() => {
    if (id) {
      pusherClient.subscribe(id);
    }

    if (messageHandlerRef.current) {
      pusherClient.unbind("incoming-message", messageHandlerRef.current);
    }

    messageHandlerRef.current = (message) => {
      setMessages((prev) => [...prev, message]);
    };

    pusherClient.bind("incoming-message", messageHandlerRef.current);
    return () => {
      pusherClient.unsubscribe(id);
      pusherClient.unbind("incoming-message", messageHandlerRef.current);
    };
  }, [id]);

  async function handleSendMessage(e) {
    e.preventDefault();
    const message = e.target[0].value;
    await fetch("/api/messages", {
      method: "POST",
      body: JSON.stringify({
        roomId: id,
        message,
      }),
    });
  }

  async function handleDeleteMessage(messageId) {
    try {
      setLoading(true);
      const res = await fetch(`/api/messages/${messageId}`, {
        method: "DELETE",
      });
      if (res) {
        setLoading(false);
        setMessages((prev) => prev.filter((m) => m.id !== messageId));
      }
    } catch (error) {
      setLoading(false);
      console.log({ error });
    }
  }

  return (
    <div className={`${styles.roomContainer} ${inter.className}`}>
      <h1>Room {id}</h1>
      <div className={styles.messagesContainer}>
        {messages?.map((message) => (
          <MessageCard
            key={message?.id}
            message={message}
            handleDelete={handleDeleteMessage}
            loading={loading}
          />
        ))}
      </div>

      <form onSubmit={handleSendMessage}>
        <textarea></textarea> <br />
        <button type="submit">Send</button>
      </form>
      <button onClick={() => router.push("/")}>Back to Home</button>
    </div>
  );
}
