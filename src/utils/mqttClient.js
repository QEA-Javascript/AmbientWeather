const mqtt = require('mqtt');
require('dotenv').config();

const brokerUrl = process.env.MQTT_BROKER_URL;
const options = {
  // username: process.env.MQTT_USERNAME,
  // password: process.env.MQTT_PASSWORD,
  // port: 8883,
  protocol: 'mqtt',
};

const client = mqtt.connect(brokerUrl, options);

client.on('connect', () => {
  console.log('Connected to MQTT broker');
});
// Subscribe to a topic
const topic = 'weather/lighting';

// const publishMessage = (topic, message) => {
//   client.publish(topic, message, (err) => {
//     if (err) {
//       console.error(`Subscription error: ${err}`);
//     } else {
//       console.log(`Subscribed to topic: ${topic}`);
//     }
//   });
// };

client.on('error', (err) => {
  console.error('MQTT connection error:', err);
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
