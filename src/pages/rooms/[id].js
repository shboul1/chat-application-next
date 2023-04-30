import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { pusherClient } from "@/lib/pusher";
import React from "react";

export default function Room() {
  const router = useRouter();
  const { id } = router.query;

  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  useEffect(() => {
    (async () => {
      if (id) {
        const res = await fetch(`/api/messages/${id}`);
        const { messages } = await res.json();
        setMessages(messages);
      }
    })();
  }, [id]);

  useEffect(() => {
    if (id) {
      pusherClient.subscribe(id);
      pusherClient.bind("incoming-message", (message) => {
        setMessages((prev) => [...prev, { message }]);
        setNewMessage("");
      });
    }

    return () => pusherClient.unsubscribe(id);
  }, [id]);

  async function handleSendMessage() {
    await fetch("/api/messages", {
      method: "POST",
      body: JSON.stringify({
        roomId: id,
        message: newMessage,
      }),
    });
  }

  return (
    <div>
      <h1>Room {id}</h1>
      <ul>
        {messages.map((message, index) => (
          <li key={index}>{message.message}</li>
        ))}
      </ul>
      <br />
      <br />
      <br />
      <textarea
        value={newMessage}
        onChange={(e) => setNewMessage(e.target.value)}
      ></textarea>{" "}
      <br />
      <button onClick={handleSendMessage}>Send</button>
    </div>
  );
}
