const schedule = require('node-schedule');
const { getWeatherData } = require('../routes/weatherService');
// const { setLighting } = require('../routes/lightingService');

const updateLighting = async () => {
  try {
    const weatherData = await getWeatherData();
    const condition = weatherData.data[0].weather.description;
    let color;

    switch (condition.toLowerCase()) {
      case 'clear sky':
        color = 'bright';
        break;
      case 'few clouds':
        color = 'dim';
        break;
      case 'rain':
        color = 'blue';
        break;
      default:
        color = 'white';
        break;
    }

    setLighting(color);
  } catch (error) {
    console.error('Error updating lighting:', error);
  }
};

// // Schedule job every 10 seconds for now
// schedule.scheduleJob('*/10 * * * * *', updateLighting);
