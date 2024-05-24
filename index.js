const express = require('express');
const axios = require('axios');
const schedule = require('node-schedule');//library to support scheduling dynamically?
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

const WEATHER_API_KEY = process.env.WEATHER_API_KEY;
const WEATHER_API_URL = process.env.WEATHER_API_URL;
const LOCATION = process.env.LOCATION;

app.use(express.json());

const fetchWeatherData = async () => {
  try {
    const response = await axios.get(`${WEATHER_API_URL}?q=${LOCATION}&appid=${WEATHER_API_KEY}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching weather data:', error);
  }
};

const adjustLighting = (weatherData) => {
  const condition = weatherData.weather[0].main.toLowerCase();
  let color;
  switch (condition) {
    case 'clear':
      color = 'blue';
      break;
    case 'clouds':
      color = 'gray';
      break;
    case 'rain':
      color = 'purple';
      break;
    case 'snow':
      color = 'white';
      break;
    default:
      color = 'yellow';
  }
  console.log(`Adjusting lighting to ${color} based on ${condition}`);
  // TODO: Send color to Raspberry Pi for actual lighting adjustment
};

// Schedule the weather data fetching every 10 seconds for now
schedule.scheduleJob('*/10 * * * * *', async () => {
  const weatherData = await fetchWeatherData();
  if (weatherData) {
    adjustLighting(weatherData);
  }
});

app.get('/', (req, res) => {
  res.send('AmbientWeather server is running');
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
