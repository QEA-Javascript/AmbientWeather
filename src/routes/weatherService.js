const axios = require('axios');

const getWeatherData = async () => {
  const url = `https://api.weatherbit.io/v2.0/current?city=Seattle&key=${process.env.WEATHER_API_KEY}`;
  const response = await axios.get(url);
  return response.data;
};

module.exports = { getWeatherData };
