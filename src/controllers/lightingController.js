const express = require('express');
const bearerAuth = require('../middleware/bearer');
const acl = require('../middleware/acl');
const { publishMessage } = require('../utils/mqttClient');

const router = express.Router();

router.post('/set-lighting', bearerAuth, acl('write'), async (req, res) => {
  try {
    const { color, intensity } = req.body;

    publishMessage('home/lighting', JSON.stringify({ color, intensity }));

    res.status(200).send('Lighting settings updated');
  } catch (e) {
    res.status(500).send(e.message);
  }
});

module.exports = router;
