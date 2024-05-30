const request = require('supertest');
const express = require('express');
const authRoutes = require('../src/routes/authRoutes');
const lightingRoutes = require('../src/routes/lightingRoutes');
const weatherRoutes = require('../src/routes/weatherRoutes');
const sequelize = require('../src/config/db');

const app = express();
app.use(express.json());
app.use('/auth', authRoutes);
app.use('/lighting', lightingRoutes);
app.use('/weather', weatherRoutes);

beforeAll(async () => {
  await sequelize.sync({ force: true }); // Recreate the database schema for testing
});

describe('Auth Routes', () => {
  test('Register a new user', async () => {
    const response = await request(app)
      .post('/auth/register')
      .send({ username: 'testuser', password: 'testpassword' });

    expect(response.status).toBe(201);
    expect(response.body.username).toBe('testuser');
  });

  test('Login with registered user', async () => {
    await request(app)
      .post('/auth/register')
      .send({ username: 'testuser', password: 'testpassword' });

    const response = await request(app)
      .post('/auth/login')
      .set('Authorization', 'Basic ' + Buffer.from('testuser:testpassword').toString('base64'));

    expect(response.status).toBe(200);
    expect(response.body.user.username).toBe('testuser');
  });
});

describe('Lighting Routes', () => {
  test('Set lighting command', async () => {
    const loginResponse = await request(app)
      .post('/auth/login')
      .set('Authorization', 'Basic ' + Buffer.from('testuser:testpassword').toString('base64'));

    const token = loginResponse.body.token;

    const response = await request(app)
      .post('/lighting/set-lighting')
      .set('Authorization', `Bearer ${token}`)
      .send({ command: 'BRIGHT' });

    expect(response.status).toBe(200);
    expect(response.text).toBe('Lighting settings updated'); // Updated to match the actual response
  });
});

describe('Weather Routes', () => {
  test('Get current weather', async () => {
    const response = await request(app).get('/weather/current-weather');

    expect(response.status).toBe(200);
    // You can add more assertions based on the expected structure of your weather data
  });
});

afterAll(async () => {
  await sequelize.close();
});
