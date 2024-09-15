import mongoose from "mongoose";

// Define the schema for the Tag model
const tagSchema = new mongoose.Schema(
  {
    name: {
      type: mongoose.Schema.Types.String,
      required: true,
      trim: true,
    },
    slug: {
      type: mongoose.Schema.Types.String,
      unique: true,
      required: true,
      trim: true,
    },
    description: {
      type: mongoose.Schema.Types.String,
      trim: true,
    },
    visible: {
      type: mongoose.Schema.Types.Boolean,
      default: true,
    },
    added_by: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    added_at: {
      type: mongoose.Schema.Types.Date,
      default: Date.now,
      required: true,
    },
    updated_by: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    updated_at: {
      type: mongoose.Schema.Types.Date,
    },
  },
  {
    timestamps: true,
  }
);

const Tag = mongoose.models.Tag || mongoose.model("Tag", tagSchema);

export default Tag;
