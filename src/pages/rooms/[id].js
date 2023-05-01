import { useRouter } from "next/router";
import { useState, useEffect, useRef } from "react";
import { pusherClient } from "@/lib/pusher";
import React from "react";

export default function Room() {
  const router = useRouter();
  const { id } = router.query;
  const messageHandlerRef = useRef(null);

  const [messages, setMessages] = useState([]);
  useEffect(() => {
    (async () => {
      if (id) {
        const res = await fetch(`/api/rooms/${id}`);
        const { room } = await res.json();
        if (room[0]?.data?.messages) setMessages(room[0]?.data?.messages);
      }
    })();
  }, [id]);

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

  return (
    <div className="roomContainer">
      <h1>Room {id}</h1>
      <ul>
        {messages.map((message) => (
          <li key={message + 1}>{message}</li>
        ))}
      </ul>
      <br />
      <br />
      <br />
      <form onSubmit={handleSendMessage}>
        <textarea></textarea> <br />
        <button type="submit">Send</button>
      </form>
      <br />
      <button onClick={() => router.push("/")}>Back to Home</button>
    </div>
  );
}
