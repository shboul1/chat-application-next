import mongoose from "mongoose";

const roomSchema = new mongoose.Schema({});

export default mongoose.models.Room || mongoose.model("Room", roomSchema);
