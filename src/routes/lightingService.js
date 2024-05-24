const SerialPort = require('serialport');

const port = new SerialPort('/dev/ttyUSB0', {
  baudRate: 9600,
});

const setLighting = (color) => {
  port.write(color, (err) => {
    if (err) {
      console.error('Error on write: ', err.message);
    } else {
      console.log('Message written');
    }
  });
};

module.exports = { setLighting };
