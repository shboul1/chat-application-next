import mongoose from "mongoose";

const roomSchema = new mongoose.Schema({
  data: {
    type: Object,
    required: true,
  },
});

export default mongoose.models.Room || mongoose.model("Room", roomSchema);
