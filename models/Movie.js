const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    comment: {
      type: String,
      required: true,
      trim: true
    }
  },
  { timestamps: true }
);

const movieSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    director: { type: String, required: true, trim: true },
    year: { type: Number, required: true },
    description: { type: String, required: true, trim: true },
    genre: { type: String, required: true, trim: true },
    imageUrl: { type: String, default: "" }
    comments: [commentSchema]
  },
  { timestamps: true }
);

module.exports = mongoose.model("Movie", movieSchema);