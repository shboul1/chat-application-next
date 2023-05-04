import { pusherServer } from "@/lib/pusher";
import Room from "@/models/room.mongo";

export default async function handler(req, res) {
  switch (req.method) {
    case "POST":
      const { roomId, message } = JSON.parse(req.body);
      const newMessage = {
        id: crypto.randomUUID(),
        message,
      };
      await pusherServer.trigger(roomId, "incoming-message", newMessage);
      await Room.findByIdAndUpdate(
        roomId,
        {
          $push: {
            messages: newMessage,
          },
        },
        { new: true }
      );
      return res.status(200).json({ message });
  }
}
