import Message from "@/models/message.mongo";
import dbConnect from "@/lib/mongodb";

export default async function (req, res) {
  await dbConnect();
  if (req.method === "GET") {
    const { id } = req.query;
    const messages = await Message.find(
      {
        roomId: id,
      },
      { _id: 0, __v: 0 }
    );
    return res.status(200).json({ messages });
  }
}
