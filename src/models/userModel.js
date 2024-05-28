const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const User = sequelize.define('User', {
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  token: {
    type: DataTypes.VIRTUAL,
    get() {
      return jwt.sign({ username: this.username }, process.env.SECRET);
    },
  },
  capabilities: {
    type: DataTypes.ARRAY(DataTypes.STRING),
    defaultValue:  ['read', 'write'],
  },
});

User.beforeCreate(async (user) => {
  try {
    const hashedPassword = await bcrypt.hash(user.password, 10);
    user.password = hashedPassword;
  } catch (error) {
    throw new Error(error.message);
  }
});

User.authenticateBasic = async (username, password) => {
  try {
    const user = await User.findOne({ where: { username } });
    if (!user) {
      throw new Error('Invalid User');
    }

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      throw new Error('Invalid User');
    }

    return user;
  } catch (error) {
    throw new Error(error.message);
  }
};


User.authenticateToken = async (token) => {
  try {
    const parsedToken = jwt.verify(token, process.env.SECRET);
    const user = await User.findOne({ where: { username: parsedToken.username } });
    if (!user) {
      throw new Error('Invalid Token');
    }
    return user;
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = User;
