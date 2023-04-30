import { pusherServer } from "../../lib/pusher";
import Message from "../../models/message.mongo";
import dbConnect from "../../lib/mongodb";

export default async function handler(req, res) {
  await dbConnect();
  switch (req.method) {
    case "GET":
      const messages = await Message.find({}, { _id: 0, __v: 0 });
      return res.status(200).json({ messages });
    case "POST":
      const { roomId, message } = JSON.parse(req.body);
      pusherServer.trigger(roomId, "incoming-message", message);
      Message.create({ message, roomId });
      return res.status(200).json({ message });
  }
}
