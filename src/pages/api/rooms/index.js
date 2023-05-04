import dbConnect from "@/lib/mongodb";
import Room from "@/models/room.mongo";

export default async function handler(req, res) {
  await dbConnect();
  switch (req.method) {
    case "GET":
      const room = await Room.find({}, { __v: 0 });
      return res.status(200).json({ room });
    case "POST":
      const createdRoom = await Room.create({
        messages: [],
      });
      return res.status(200).json({ roomId: createdRoom.id });
    default:
      return res.status(400);
  }
}
