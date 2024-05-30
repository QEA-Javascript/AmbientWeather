require('dotenv').config();
const { Sequelize } = require('sequelize');

console.log("DATABASE_URL:", process.env.DATABASE_URL);

const DATABASE_URL="postgres://qilinxie:HT5S1XwITcsBwMDo50MPdpqNJEw8qdcA@dpg-cop7piacn0vc73do1mrg-a.oregon-postgres.render.com/ambientweatheruser?sslmode=require";

const sequelize = new Sequelize(DATABASE_URL, {
  dialect: 'postgres',
  logging: false,
});

sequelize.authenticate()
  .then(() => {
    console.log('Database connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

module.exports = sequelize;
