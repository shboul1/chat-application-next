import Room from "@/models/room.mongo";

export default async function handler(req, res) {
  switch (req.method) {
    case "GET":
      const { id } = req.query;
      const room = await Room.find({ _id: id }, { __v: 0 });
      const messages = room[0]?.messages;
      return res.status(200).json({ messages });
  }
}
