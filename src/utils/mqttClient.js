const mqtt = require('mqtt');
require('dotenv').config();

const brokerUrl = process.env.MQTT_BROKER_URL;
const options = {
  username: process.env.MQTT_USERNAME,
  password: process.env.MQTT_PASSWORD,
};

console.log('MQTT Broker URL:', brokerUrl);
console.log('MQTT Username:', options.username);
// Do not log the password for security reasons

const client = mqtt.connect(brokerUrl, options);

client.on('connect', () => {
  console.log('Connected to MQTT broker');
});

client.on('error', (err) => {
  console.error('MQTT connection error:', err);
});

client.on('message', (topic, message) => {
  console.log(`Received message from ${topic}: ${message.toString()}`);
});

const publishMessage = (topic, message) => {
  client.publish(topic, message, (err) => {
    if (err) {
      console.error('Publish error:', err);
    } else {
      console.log(`Message published to ${topic}: ${message}`);
    }
  });
};

module.exports = {
  client,
  publishMessage,
};
