require('dotenv').config();
const schedule = require('node-schedule');
const { getWeatherData } = require('../routes/weatherService');
const mqtt = require('mqtt');
const mqttUrl = process.env.MQTT_URL;
const client = mqtt.connect(mqttUrl);

client.on('connect', () => {
  console.log('Connected to MQTT broker');
});
client.on('error', (err) => {
  console.error('MQTT connection error:', err);
});

const updateLighting = async () => {
  try {
    console.log('Fetching weather data...');
    const weatherData = await getWeatherData();
    const condition = weatherData.data[0].weather.description.toLowerCase();
    let color;
    switch (condition) {
    case 'clear sky':
      color = 'Clear';
      break;
    case 'few clouds':
    case 'scattered clouds':
    case 'broken clouds':
      color = 'Partly Cloudy';
      break;
    case 'overcast clouds':
      color = 'Overcast';
      break;
    case 'rain':
    case 'light rain':
    case 'moderate rain':
    case 'heavy rain':
      color = 'Rain';
      break;
    case 'thunderstorm':
    case 'thunderstorm with light rain':
    case 'thunderstorm with rain':
    case 'thunderstorm with heavy rain':
      color = 'Thunderstorm';
      break;
    case 'snow':
    case 'light snow':
    case 'heavy snow':
      color = 'Snow';
      break;
    case 'mist':
    case 'fog':
      color = 'Fog';
      break;
    default:
      color = 'Unknown';
      break;
    }
    console.log(`Weather condition: ${condition}, setting color: ${color}`);
    client.publish('weather/lighting', color, (err) => {
      if (err) {
        console.error('Error publishing to MQTT:', err);
      } else {
        console.log(`Published color ${color} to weather/lighting`);
      }
    });
  } catch (error) {
    console.error('Error updating lighting:', error);
  }
};

schedule.scheduleJob('*/10 * * * * *', updateLighting);
