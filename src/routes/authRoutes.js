const express = require('express');
const router = express.Router();
const basicAuth = require('../middleware/basic');
const bearerAuth = require('../middleware/bearer');
const acl = require('../middleware/acl');
const { users } = require('../models');

router.post('/register', async (req, res) => {
  try {
    const user = await users.create(req.body);
    res.status(201).send(user);
  } catch (e) {
    res.status(400).send(e.message);
  }
});

router.post('/login', basicAuth, (req, res) => {
  res.status(200).send({ user: req.user, token: req.user.token });
});

router.get('/protected', bearerAuth, acl('read'), (req, res) => {
  res.status(200).send('You have access to this route');
});

module.exports = router;
