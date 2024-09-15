import mongoose from "mongoose";

// Define the schema for the Post model
const postSchema = new mongoose.Schema(
  {
    title: {
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
    content: {
      type: mongoose.Schema.Types.String,
      required: true,
    },
    excerpt: {
      type: mongoose.Schema.Types.String,
      trim: true,
    },
    author: {
      type: mongoose.Schema.Types.String,
      required: true,
    },
    publish_date: {
      type: mongoose.Schema.Types.Date,
      default: Date.now,
    },
    updated_date: {
      type: mongoose.Schema.Types.Date,
    },
    status: {
      type: mongoose.Schema.Types.String,
      enum: ["draft", "published", "archived"],
      default: "draft",
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    subcategory: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Subcategory",
      required: true,
    },
    tags: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Tag",
      },
    ],
    metaTitle: {
      type: mongoose.Schema.Types.String,
    },
    metaDescription: {
      type: mongoose.Schema.Types.String,
    },
    metaKeywords: {
      type: mongoose.Schema.Types.String,
    },
    featuredImage: {
      type: mongoose.Schema.Types.String || mongoose.Schema.Types.Buffer,
    },
    imageCredit: {
      type: mongoose.Schema.Types.String,
    },
    visible: {
      type: mongoose.Schema.Types.Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

const Post = mongoose.models.Post || mongoose.model("Post", postSchema);

export default Post;
