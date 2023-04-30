import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
  message: {
    type: String,
    required: true,
  },
  roomId: {
    type: String || Number,
    required: true,
  },
});

export default mongoose.models.Message ||
  mongoose.model("Message", messageSchema);
