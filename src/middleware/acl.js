module.exports = capability => {
  return (req, res, next) => {
    if (req.user && req.user.capabilities.includes(capability)) {
      next();
    } else {
      res.status(403).send('Access Denied');
    }
  };
};
