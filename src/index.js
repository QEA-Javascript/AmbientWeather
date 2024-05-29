const express = require('express');
const logger = require('./middleware/logger');
const authRoutes = require('./routes/authRoutes');
const lightingRoutes = require('./routes/lightingRoutes');
const weatherRoutes = require('./routes/weatherRoutes');
const sequelize = require('./config/db');
require('dotenv').config();
require('./utils/scheduleJobs');


const app = express();

app.use(express.json());
app.use(logger);

app.use('/auth', authRoutes);
app.use('/lighting', lightingRoutes);
app.use('/weather', weatherRoutes);

const PORT = process.env.PORT || 3000;

sequelize.sync()
  .then(() => {
    console.log('All models were synchronized successfully.');
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch(err => {
    console.error('Error synchronizing models:', err);
  });
