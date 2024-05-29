const express = require('express');
const bearerAuth = require('../middleware/bearer');
const acl = require('../middleware/acl');


const router = express.Router();

router.post('/set-lighting', bearerAuth, acl('write'), (req, res) => {
  const { command } = req.body;

  const validCommands = ['BRIGHT', 'MEDIUM', 'DIM', 'OFF'];
  if (!validCommands.includes(command)) {
    return res.status(400).send('Invalid command');
  }

  console.log(`Lighting command "${command}" sent`);

  res.status(200).send(`Lighting command "${command}" sent`);
});

module.exports = router;
