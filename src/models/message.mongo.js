import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
  roomId: {
    type: String || mongoose.Schema.Types.ObjectId,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
});

export default mongoose.models.Message ||
  mongoose.model("Message", messageSchema);
