const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema(
  {
    comment: {
      type: String,
      required: [true, "Comment is required"]
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null
    }
  },
  { timestamps: true }
);

const movieSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"]
    },
    director: {
      type: String,
      required: [true, "Director is required"]
    },
    year: {
      type: Number,
      required: [true, "Year is required"]
    },
    description: {
      type: String,
      required: [true, "Description is required"]
    },
    genre: {
      type: String,
      required: [true, "Genre is required"]
    },

    // OPTIONAL: image or gif URL
    imageUrl: {
      type: String,
      default: ""
    },

    // COMMENTS ARRAY
    comments: {
      type: [commentSchema],
      default: []
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Movie", movieSchema);