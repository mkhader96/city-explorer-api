"use strict";
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const axios = require("axios");
const server = express();
server.use(cors());
const PORT = process.env.PORT;

server.get("/weather", getWeatherData);



function getWeatherData(req, res) {
  let lat = req.query.lat;
  let lon = req.query.lon;
  let key = process.env.WEATHER_API_KEY;

  let weatherUrl = `https://api.weatherbit.io/v2.0/forecast/daily?lat=${lat}&lon=${lon}&key=${key}`;

  axios
    .get(weatherUrl)
    .then((result) => {
      const weatherArr = result.data.data.map((item) => {
        return new Forecast(item);
      });
      res.send(weatherArr);
    })
    .catch((err) => {
      res.status(500).send(`Not found ${err}`);
    });
}
class Forecast {
  constructor(item) {
    this.date = item.valid_date;
    this.description = `Low of ${item.min_temp}, high of ${item.max_temp} with ${item.weather.description}`;
  }
}


server.get("/movies", getMovies);
function getMovies(req, res) {
  let city = req.query.city;
  let key = process.env.MOVIE_API_KEY;

  let movieUrl = `https://api.themoviedb.org/3/search/movie?api_key=${key}&query=${city}`;

  axios
    .get(movieUrl)
    .then((result) => {
      const movieArr = result.data.results.map((movieItem) => {
        return new Movie(movieItem);
      });
      res.send(movieArr);
    })
    .catch((err) => {
      res.status(500).send(`Not found ${err}`);
    });
}

class Movie {
  constructor(item) {
    this.title = item.original_title;
    this.overview = item.overview;
    this.average_votes = item.vote_average;
    this.total_votes = item.vote_count;
    this.image_url = `https://image.tmdb.org/t/p/w500${item.poster_path}`;
    this.popularity = item.popularity;
    this.released_on = item.release_date;
  }
}

server.get("*", (req, res) => {
  res.send("Not found");
});

server.listen(PORT, () => {
  console.log(`Listening to PORT ${PORT}`);
});
