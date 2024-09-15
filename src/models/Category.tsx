import mongoose from "mongoose";

// Define the schema for the Category model
const categorySchema = new mongoose.Schema(
  {
    name: {
      type: mongoose.Schema.Types.String,
      required: true,
      trim: true,
      unique: true,
    },
    slug: {
      type: mongoose.Schema.Types.String,
      unique: true,
      required: true,
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
      required: true,
    },
    added_at: {
      type: mongoose.Schema.Types.Date,
      default: Date.now,
      required: true,
    },
    updated_by: {
      type: mongoose.Schema.Types.ObjectId,
    },
    updated_at: {
      type: mongoose.Schema.Types.Date,
    },
  },
  {
    timestamps: true,
  }
);

const Category =
  mongoose.models.Category || mongoose.model("Category", categorySchema);

export default Category;
