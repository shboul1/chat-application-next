import mongoose from "mongoose";

const roomSchema = new mongoose.Schema({
  messages: {
    type: Array,
    default: [],
  },
});

export default mongoose.models.Room || mongoose.model("Room", roomSchema);
