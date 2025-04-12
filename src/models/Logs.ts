import mongoose, { Schema } from "mongoose";

const LogSchema = new Schema({
  resident: {
    type: Schema.Types.ObjectId,
    ref: "Resident",
    default: null,
  },
  visitor: {
    type: Schema.Types.ObjectId,
    ref: "Visitor",
    default: null,
  },
  entryTime: {
    type: Date,
    default: Date.now,
  },
  isRegistered: {
    type: Boolean,
    default: false,
  },
});

const Log = mongoose.models.Log || mongoose.model("Log", LogSchema);
export default Log;
