const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema(
    {
      name: {
        type: String,
        required: true,
        trim: true,
      },
      status: {
        type: String,
        enum: ["QUEUED", "RUNNING", "SUCCESS", "FAILED"],
        default: "QUEUED",
        required: true,
      },
      createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
      details: {
        type: String,
        trim: true,
        required: true,
      },
      retryCount: {
        type: Number,
        default: 0,
      },
      errorMessage: {
        type: String,
        trim: true,
        default: "",
      },
    },
    { timestamps: true }
  );
  
  const Job = mongoose.model("Job", jobSchema);
  
  module.exports = Job;