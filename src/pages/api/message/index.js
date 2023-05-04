import Room from "@/models/room.mongo";

export default async function handler(req, res) {
  switch (req.method) {
    case "DELETE":
      const { roomId, messageId } = req.body;
      await Room.findByIdAndUpdate(
        roomId,
        { $pull: { messages: { $elemMatch: { id: messageId } } } },
        { new: true }
      );
      return res.status(200).json({ messageId, removed: true });
  }
}
