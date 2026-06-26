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
    type: {              
        type: String,
        default: 'Point'
    },
    coordinates: [Number]
}
,
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
  status:{
    type:String,
    enum: ['open', 'in_progress','resolved'],
    default:'open'
  }

}, { timestamps: true });
reportSchema.index({ location: '2dsphere' });// activates the mongodb geospatial functionality 

const Report = mongoose.model("Report", reportSchema);
export default Report;
