const express = require('express');
const router = express.Router();
const bearerAuth = require('../middleware/bearer');
const acl = require('../middleware/acl');

router.post('/set-lighting', bearerAuth, acl('write'), async (req, res) => {
  try {
    res.status(200).send('Lighting settings updated');
  } catch (e) {
    res.status(500).send(e.message);
  }
});

module.exports = router;
