import { useRouter } from "next/router";
import { useState, useEffect, useRef } from "react";
import { pusherClient } from "@/lib/pusher";
import React from "react";
import { getBaseURL } from "@/utils";

export async function getServerSideProps({ params }) {
  const { id } = params;
  const res = await fetch(`${getBaseURL()}/api/messages/${id}`);
  const { messages } = await res.json();
  return {
    props: {
      Oldmessages: messages ?? [],
    },
  };
}

export default function Room({ Oldmessages }) {
  const router = useRouter();
  const { id } = router.query;
  const messageHandlerRef = useRef(null);

  const [messages, setMessages] = useState(Oldmessages ?? []);
  useEffect(() => {
    if (id) {
      pusherClient.subscribe(id);
    }

    if (messageHandlerRef.current) {
      pusherClient.unbind("incoming-message", messageHandlerRef.current);
    }

    messageHandlerRef.current = (message) => {
      console.log({ message });
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
    await fetch("/api/message", {
      method: "DELETE",
      body: JSON.stringify({
        roomId: id,
        messageId,
      }),
    });
  }

  return (
    <div className="roomContainer">
      <h1>Room {id}</h1>
      <ul>
        {messages?.map((message) => (
          <li key={message?.id}>
            {message.message} ---
            <button onClick={() => handleDeleteMessage(message?.id)}>❌</button>
          </li>
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
