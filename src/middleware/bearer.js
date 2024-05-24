const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

module.exports = async (req, res, next) => {
  if (!req.headers.authorization) {
    return res.status(403).send('Authorization header is missing');
  }

  const token = req.headers.authorization.split(' ').pop();

  try {
    const parsedToken = jwt.verify(token, process.env.SECRET);
    const user = await User.findOne({ where: { username: parsedToken.username } });
    if (user) {
      req.user = user;
      next();
    } else {
      res.status(403).send('Invalid Token');
    }
  } catch (e) {
    res.status(403).send('Invalid Token');
  }
};
