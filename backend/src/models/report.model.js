import mongoose from "mongoose";

const reportSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },

  images: [
    {
      type: String,
      required: true
    }
  ],

  description: {
    type: String,
    required: true
  },

  address: {
    type: String,
    required: true
  },

  location: {
    latitude: Number,
    longitude: Number
  },

  caseType: {
    type: String,
    enum: ["Injured", "Sick", "Aggressive", "Abandoned", "Other"],
    required: true
  },

  severity: {
    type: String,
    enum: ["Low", "Medium", "High", "Emergency"],
    required: true
  },

  contactNumber: {
    type: String,
    required: true
  },

}, { timestamps: true });

const Report = mongoose.model("Report", reportSchema);
export default Report;
