const axios = require('axios');

const city= process.env.CITY;
const getWeatherData = async () => {
  const url = `https://api.weatherbit.io/v2.0/current?city=${city}&key=${process.env.WEATHER_API_KEY}`;
  const response = await axios.get(url);
  return response.data;
};

module.exports = { getWeatherData };
