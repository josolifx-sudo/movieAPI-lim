const mongoose = require("mongoose");
const Movie = require("../models/Movie");

function isValidObjectId(id) {
  return mongoose.Types.ObjectId.isValid(id);
}

async function addMovie(req, res) {
  try {
    const { title, director, year, description, genre } = req.body;

    if (!title || !director || !year || !description || !genre) {
      return res.status(400).send({ message: "All fields are required" });
    }

    const movie = await Movie.create({
      title,
      director,
      year,
      description,
      genre,
      comments: []
    });

    return res.status(201).send(movie);
  } catch (err) {
    return res.status(500).send({ message: "Server error" });
  }
}

async function getMovies(req, res) {
  try {
    const movies = await Movie.find().sort({ createdAt: -1 });
    return res.status(200).send({ movies });
  } catch (err) {
    return res.status(500).send({ message: "Server error" });
  }
}

async function getMovie(req, res) {
  try {
    const { id } = req.params;

    if (!isValidObjectId(id)) {
      return res.status(404).send({ message: "Movie not found" });
    }

    const movie = await Movie.findById(id);
    if (!movie) {
      return res.status(404).send({ message: "Movie not found" });
    }

    return res.status(200).send(movie);
  } catch (err) {
    return res.status(500).send({ message: "Server error" });
  }
}

async function updateMovie(req, res) {
  try {
    const { id } = req.params;

    if (!isValidObjectId(id)) {
      return res.status(404).send({ message: "Movie not found" });
    }

    const allowed = ["title", "director", "year", "description", "genre"];
    const updateData = {};

    for (const key of allowed) {
      if (req.body[key] !== undefined) updateData[key] = req.body[key];
    }

    const updated = await Movie.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true
    });

    if (!updated) {
      return res.status(404).send({ message: "Movie not found" });
    }

    return res.status(200).send({
      message: "Movie updated successfully",
      updatedMovie: updated
    });
  } catch (err) {
    return res.status(500).send({ message: "Server error" });
  }
}

async function deleteMovie(req, res) {
  try {
    const { id } = req.params;

    if (!isValidObjectId(id)) {
      return res.status(404).send({ message: "Movie not found" });
    }

    const deleted = await Movie.findByIdAndDelete(id);

    if (!deleted) {
      return res.status(404).send({ message: "Movie not found" });
    }

    return res.status(200).send({ message: "Movie deleted successfully" });
  } catch (err) {
    return res.status(500).send({ message: "Server error" });
  }
}

async function addComment(req, res) {
  try {
    const { id } = req.params;
    const { comment } = req.body;

    if (!isValidObjectId(id)) {
      return res.status(404).send({ message: "Movie not found" });
    }

    if (!comment) {
      return res.status(400).send({ message: "Comment is required" });
    }

    const movie = await Movie.findById(id);
    if (!movie) {
      return res.status(404).send({ message: "Movie not found" });
    }

    movie.comments.push({
      userId: req.user.id,
      comment
    });

    const updated = await movie.save();

    return res.status(200).send({
      message: "comment added successfully",
      updatedMovie: updated
    });
  } catch (err) {
    return res.status(500).send({ message: "Server error" });
  }
}

async function getComments(req, res) {
  try {
    const { id } = req.params;

    if (!isValidObjectId(id)) {
      return res.status(404).send({ message: "Movie not found" });
    }

    const movie = await Movie.findById(id).select("comments");
    if (!movie) {
      return res.status(404).send({ message: "Movie not found" });
    }

    return res.status(200).send({ comments: movie.comments });
  } catch (err) {
    return res.status(500).send({ message: "Server error" });
  }
}

module.exports = {
  addMovie,
  getMovies,
  getMovie,
  updateMovie,
  deleteMovie,
  addComment,
  getComments
};