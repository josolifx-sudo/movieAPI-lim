const dns = require("dns");
dns.setServers(["1.1.1.1", "1.0.0.1"]);

require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const port = 4000;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

const mongoUri = process.env.MONGODB_URI || "mongodb+srv://admin:admin1234@limdb.ciggboe.mongodb.net/b598-s84?appName=LimDB";

mongoose.connect(mongoUri, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

mongoose.connection.once('open', () => console.log('Now connected to MongoDB Atlas.'));

const userRoutes = require("./routes/userRoutes");
const movieRoutes = require("./routes/movieRoutes");

app.use("/users", userRoutes);
app.use("/movies", movieRoutes);


if(require.main === module){
  app.listen(process.env.PORT || port, () => {
      console.log(`API is now online on port ${ process.env.PORT || port }`)
  });
}

module.exports = { app, mongoose };