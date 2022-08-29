const express = require('express');
const cors = require('cors');
const server = express();
const weather = require('./data/weather.json');
require('dotenv').config();
server.use(cors());

PORT = 3000;

server.get('/', (req, res) => {
    res.send('Hello World');
})

server.get('/test', (req, res) => {
    res.send('Hello World from test route');
    console.log('Hello World from test route');

})

server.get('/weather', (req, res) => {
    let weatherData = weather.map((item) => {
        return item.data[0].clouds;
        
    });
    console.log(weatherData);
    res.send(weatherData);
    console.log(req.query)
    
})

server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})

