const express = require('express');
const { getWeatherData } = require('../routes/weatherService');

const router = express.Router();

router.get('/current-weather', async (req, res) => {
  try {
    const weatherData = await getWeatherData();
    res.status(200).send(weatherData);
  } catch (e) {
    res.status(500).send(e.message);
  }
});

module.exports = router;
