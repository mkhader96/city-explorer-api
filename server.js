"use strict";
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const server = express();
server.use(cors());
const PORT = process.env.PORT;

let getWeatherData = require("./Weather.js");
server.get("/weather", getWeatherData);

let getMovies = require("./Movies.js");
server.get("/movies", getMovies);

server.get("*", (req, res) => {
  res.send("Not found");
});

server.listen(PORT, () => {
  console.log(`Listening to PORT ${PORT}`);
});
