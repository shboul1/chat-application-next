import { pusherServer } from "@/lib/pusher";
import Message from "@/models/message.mongo";

export default async function handler(req, res) {
  switch (req.method) {
    case "POST":
      const { roomId, message } = JSON.parse(req.body);
      const newMessage = await Message.create({ roomId, message });
      const serializedMessage = {
        id: newMessage._id,
        message: newMessage.message,
      };
      await pusherServer.trigger(roomId, "incoming-message", serializedMessage);
      return res.status(200).json({ message: serializedMessage });
  }
}
