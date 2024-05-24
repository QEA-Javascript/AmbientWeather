const express = require('express');
const logger = require('./middleware/logger');
const authRoutes = require('./routes/authRoutes');
const lightingRoutes = require('./routes/lightingRoutes');
const weatherRoutes = require('./routes/weatherRoutes');
const sequelize = require('./config/db'); // Import Sequelize instance
const User = require('./models/userModel'); // Import User model
require('dotenv').config();

const app = express();

app.use(express.json());
app.use(logger);

app.use('/auth', authRoutes);
app.use('/lighting', lightingRoutes);
app.use('/weather', weatherRoutes);

const PORT = process.env.PORT || 3000;

// Synchronize models with the database
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
