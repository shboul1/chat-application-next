import { pusherServer } from "@/lib/pusher";
import Room from "@/models/room.mongo";
import dbConnect from "@/lib/mongodb";

export default async function handler(req, res) {
  await dbConnect();
  switch (req.method) {
    case "POST":
      const { roomId, message } = JSON.parse(req.body);
      await pusherServer.trigger(roomId, "incoming-message", message);
      await Room.findByIdAndUpdate(
        roomId,
        { $push: { "data.messages": message } },
        { new: true }
      );
      return res.status(200).json({ message });
  }
}
