const express = require("express");
const router = express.Router();

const movieController = require("../controllers/movieController");
const { verify, verifyAdmin } = require("../auth");

// Admin CRUD
router.post("/addMovie", verify, verifyAdmin, movieController.addMovie);
router.patch("/updateMovie/:id", verify, verifyAdmin, movieController.updateMovie);
router.delete("/deleteMovie/:id", verify, verifyAdmin, movieController.deleteMovie);

// Public
router.get("/getMovies", movieController.getMovies);
router.get("/getMovie/:id", movieController.getMovie);

// Authenticated users
router.patch("/addComment/:id", verify, movieController.addComment);
router.get("/getComments/:id", verify, movieController.getComments);

module.exports = router;