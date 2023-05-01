import dbConnect from "@/lib/mongodb";
import Room from "@/models/room.mongo";

export default async function handler(req, res) {
  await dbConnect();
  switch (req.method) {
    case "GET":
      const { id } = req.query;
      const room = await Room.find(
        {
          _id: id,
        },
        { __v: 0 }
      );
      return res.status(200).json({ room });
  }
}
