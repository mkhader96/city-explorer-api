const express = require('express');
const cors = require('cors');
const server = express();
const weather = require('./data/weather.json');
require('dotenv').config();
server.use(cors());


const PORT = process.env.PORT || 3000;

server.get('/', (req, res) => {
    res.send('Hello World');
})

server.get('/test', (req, res) => {
    res.send('Hello World from test route');
    console.log('Hello World from test route');

})

server.get('/weather', handleWeather);
server.use('*', (req, res) => res.status(404).send('page not found'));

function handleWeather(req, res) {
  let lat = req.query.lat;
  let lon = req.query.lon;
  const city = weather.find(city => city.lat === lat && city.lon === lon);
  if(city != undefined)
  {
    const weatherArray = city.data.map(day => new Forecast(day));
    res.status(200).send(weatherArray);
    console.log(weatherArray);
  }
  else
  {
    errorHandler(res);
  }
}

function errorHandler(res) {
  res.status(500).send('something went wrong');
}
  

function Forecast(day) {
  this.date = day.valid_date
  this.description = day.weather.description
}

server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})

