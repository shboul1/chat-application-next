import mongoose from "mongoose";

const roomSchema = new mongoose.Schema({
  data: {
    type: Object,
    required: true,
    messages: {
      type: Array,
      default: [],
    },
  },
});

export default mongoose.models.Room || mongoose.model("Room", roomSchema);
