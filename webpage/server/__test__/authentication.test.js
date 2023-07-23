const request = require('supertest');
const app = require('../server');  // Update with your correct server file path
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const User = require('../models/users');  // Update with your correct model file path

let mongoServer;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const mongoUri = mongoServer.getUri();
  await mongoose.connect(mongoUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
});


afterAll(async () => {
  await mongoose.connection.close();
  await mongoServer.stop();
});

describe('Authentication', () => {
  // Registration
  describe('POST /register', () => {
    // 1.1 Legitimate registration
    it('should register a new user', async () => {
      const res = await request(app)
        .post('/api/authRouter/register')
        .send({
          username: 'testuser',
          email: 'testuser@example.com',
          password: 'testpassword'
        });
      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty('message', 'successful registration');
    });

    // 1.2 Using a non-email for registration
    it('should not register a new user with invalid email', async () => {
      const res = await request(app)
        .post('/api/authRouter/register')
        .send({
          username: 'testuser',
          email: 'notavalidemail',
          password: 'testpassword'
        });
      expect(res.statusCode).toEqual(500);
    });

    // 1.3 Using an already taken username for registration
    it('should not register a new user with existing username', async () => {
      // Insert a user with this username
      //await User.register('testuser', 'testuser2@example.com', 'testpassword2');

      const res = await request(app)
        .post('/api/authRouter/register')
        .send({
          username: 'testuser', // This username is already taken
          email: 'uniqueuser@example.com',
          password: 'testpassword'
        });
      expect(res.statusCode).toEqual(500);
    });

    // 1.4 Using an already taken email for registration
    it('should not register a new user with existing email', async () => {
      // Insert a user with this email
      //await User.register('testuser2', 'testuser@example.com', 'testpassword2');

      const res = await request(app)
        .post('/api/authRouter/register')
        .send({
          username: 'uniqueuser',
          email: 'testuser@example.com', // This email is already taken
          password: 'testpassword'
        });
      expect(res.statusCode).toEqual(500);
    });
  });

  // Login
  describe('POST /login', () => {
    // 2.1 Legitimate login
    it('should login an existing user', async () => {
      const res = await request(app)
        .post('/api/authRouter/login')
        .send({
          input: 'testuser',
          password: 'testpassword'
        });
      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty('newToken');
    });

    // 2.2 Login using invalid username
    it('should not login with invalid username', async () => {
      const res = await request(app)
        .post('/api/authRouter/login')
        .send({
          input: 'invaliduser',
          password: 'testpassword'
        });
      expect(res.statusCode).toEqual(500);
    });

    // 2.3 Login using invalid password
    it('should not login with invalid password', async () => {
      const res = await request(app)
        .post('/api/authRouter/login')
        .send({
          input: 'testuser',
          password: 'invalidpassword'
        });
      expect(res.statusCode).toEqual(500);
    });
  });
});