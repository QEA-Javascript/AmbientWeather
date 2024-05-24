const express = require('express');
const basicAuth = require('../middleware/basic');
const { users } = require('../models');

const router = express.Router();

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

module.exports = router;
