import mongoose, { Schema } from "mongoose";

const VisitorSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    contact: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    purposeOfVisit: {
      type: String,
      required: true,
    },
    profileImage: {
      type: String,
      required: true,
    },
    visitorId: {
      type: String,
      enum: ["Aadhar", "Passport", "Driving License", "Voter ID"],
      required: true,
    },
    visitorIdNumber: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Visitor =
  mongoose.models.Visitor || mongoose.model("Visitor", VisitorSchema);
export default Visitor;
