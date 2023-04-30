import { pusherServer } from "@/lib/pusher";
import Message from "@/models/message.mongo";
import Room from "@/models/room.mongo";
import dbConnect from "@/lib/mongodb";

export default async function handler(req, res) {
  await dbConnect();
  switch (req.method) {
    case "POST":
      const { roomId, message } = JSON.parse(req.body);
      pusherServer.trigger(roomId, "incoming-message", message);
      await Room.findByIdAndUpdate(roomId, {
        $push: { messages: message },
      });
      return res.status(200).json({ message });
  }
}
