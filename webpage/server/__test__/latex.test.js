const request = require('supertest');
const app = require('../server'); // the express server
const LaTex = require("../models/LaTex");
const jsonwebtoken = jest.requireActual('jsonwebtoken'); 
const mongoose = jest.requireActual('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');


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


const generateToken = (id) => {
  const token = jsonwebtoken.sign({id}, process.env.SECRET, {expiresIn: '1d'});
  return token;
}

let testId = 'testId';
let testuser = "testtest";
let token = generateToken(testuser);

describe('LaTex tests', () => {
    it('should create or update a LaTeX file', async () => {
      const res = await request(app)
        .post('/api/LaTexRouter/createOrUpdateLatexFile')
        .send({
          documentId: 'testLatexId1',
          title: 'LaTeX Document 1',
          token: token,
          latex: '\\begin{document} Hello, world! \\end{document}'
        });
  
      expect(res.statusCode).toEqual(200);
    });

    it('should share a LaTeX document', async () => {
      const newtex = new LaTex({_id: "Test2", creator: "User1", allowedUsers: "User1"})
      await newtex.save();
      const res = await request(app)
        .post('/api/LaTexRouter/shareLatex')
        .send({
          documentId: 'Test2',
          userToShareWith: 'user2Id'
        });
  
      expect(res.statusCode).toEqual(200);
    });

    it('should delete a LaTeX document', async () => {
      const res = await request(app)
        .post('/api/LaTexRouter/deleteLatex/testLatexId1');
  
      expect(res.statusCode).toEqual(200);
    });
});