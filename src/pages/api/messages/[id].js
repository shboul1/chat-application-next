import Message from "@/models/message.mongo";

export default async function handler(req, res) {
  const { id } = req.query;
  switch (req.method) {
    case "GET":
      const messages = await Message.find(
        { roomId: id },
        { __v: 0, roomId: 0 }
      );
      const serializedMessages = messages.map((message) => {
        return {
          id: message._id,
          message: message.message,
        };
      });
      return res.status(200).json({ messages: serializedMessages });
    case "DELETE":
      const deletedMessage = await Message.findByIdAndDelete(id, {
        __v: 0,
        roomId: 0,
      });
      return res.status(200).json({ message: deletedMessage });
  }
}
