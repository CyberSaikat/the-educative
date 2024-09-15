import mongoose from "mongoose";

const resourcesContentSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  icon: mongoose.Schema.Types.String,
  title: mongoose.Schema.Types.String,
  content: mongoose.Schema.Types.String,
  created_at: { type: mongoose.Schema.Types.Date, default: Date.now },
  updated_at: { type: mongoose.Schema.Types.Date, default: Date.now },
  visible: { type: mongoose.Schema.Types.Boolean, default: true },
  user_id: mongoose.Schema.Types.ObjectId,
});

const featureSchema = new mongoose.Schema({
  icon: {
    type: String,
    required: true, // Assuming icon is a string representing the icon's name or path
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  link: {
    type: String,
    required: true,
  },
});

const newResourcesContentSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  features: {
    type: [featureSchema],
    required: true,
  },
  callToAction: {
    type: String,
    required: true,
  },
  imageSrc: {
    type: String,
    required: true,
  },
  imageCredit: {
    type: String,
    required: true,
  },
});

const resourceSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  icon: mongoose.Schema.Types.String,
  name: mongoose.Schema.Types.String,
  url: {
    type: mongoose.Schema.Types.String,
    unique: true,
    required: true,
  },
  description: mongoose.Schema.Types.String,
  created_at: { type: mongoose.Schema.Types.Date, default: Date.now },
  updated_at: { type: mongoose.Schema.Types.Date, default: Date.now },
  user_id: mongoose.Schema.Types.ObjectId,
  updated_by: mongoose.Schema.Types.ObjectId,
  image: mongoose.Schema.Types.String,
  credit: mongoose.Schema.Types.String,
  visible: { type: mongoose.Schema.Types.Boolean, default: true },
  content: newResourcesContentSchema,
  contents: {
    block_1: {
      type: resourcesContentSchema,
      default: null,
    },
    block_2: {
      type: resourcesContentSchema,
      default: null,
    },
    block_3: {
      type: resourcesContentSchema,
      default: null,
    },
    block_4: {
      type: resourcesContentSchema,
      default: null,
    },
    block_5: {
      type: resourcesContentSchema,
      default: null,
    },
    block_6: {
      type: resourcesContentSchema,
      default: null,
    },
    block_7: {
      type: resourcesContentSchema,
      default: null,
    },
  },
});

const Resources =
  mongoose.models.Resources || mongoose.model("Resources", resourceSchema);

export { Resources };
