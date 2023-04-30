import dbConnect from "@/lib/mongodb";
import Room from "@/models/room.mongo";

export default async function handler(req, res) {
  await dbConnect();
  switch (req.method) {
    case "GET":
      const rooms = await Room.find({}, { _id: 0, __v: 0 });
      return res.status(200).json({ rooms });
    case "POST":
      const createdRoom = await Room.create({
        data: {
          messages: [],
        },
      });
      return res.status(200).json({ roomId: createdRoom.id });
    default:
      return res.status(400);
  }
}
