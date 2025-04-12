import mongoose, { Schema } from "mongoose";

const ResidentSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  contact: {
    type: String,
    required: true,
  },
  profileImage: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
});

const Resident =
  mongoose.models.Resident || mongoose.model("Resident", ResidentSchema);
export default Resident;
