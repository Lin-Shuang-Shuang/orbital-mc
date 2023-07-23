const request = require('supertest');
const app = require('../server'); // the express server // the mongoose model
const jsonwebtoken = jest.requireActual('jsonwebtoken'); 
const mongoose = jest.requireActual('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const mockFs = require('mock-fs');
const mammoth = require('mammoth');
const path = require('path');
const fs = require('fs');
const Notes = jest.requireActual("../models/StickyNotes");
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



afterEach(() => {
  jest.clearAllMocks();
});

afterEach(() => {
  mockFs.restore();
});

describe('Sticky Note tests', () => {
    it('should get all notes of a user', async () => {
      const newNote = new Notes({ _id: 'testNoteId1', creator: 'testUserId', allowedUsers: ['testUserId'], title: 'Note 1', data: 'Note 1 data' });
      await newNote.save();
  
      const res = await request(app)
        .get('/api/stickyNoteRouter/notes')
        .set('Authorization', `Bearer ${token}`);
  
      expect(res.statusCode).toEqual(200);
    });
  
    it('should create a note', async () => {
      const res = await request(app)
        .post('/api/stickyNoteRouter/createNote')
        .send({
          id: 'testNoteId2',
          token: token,
          title: 'Note 2',
          text: 'Note 2 data'
        });
  
      expect(res.statusCode).toEqual(200);
    });

  
    it('should share a note', async () => {
  
      const res = await request(app)
        .post('/api/stickyNoteRouter/shareNote')
        .set('Authorization', `Bearer ${token}`)
        .send({
          documentId: 'testNoteId2',
          userToShareWith: 'testUserId2'
        });
  
      expect(res.statusCode).toEqual(200);
      expect(res.text).toEqual('Successfully shared');
  
      const note = await Notes.findById('testNoteId2');
      expect(note.allowedUsers).toContain('testUserId2');
    });
  
    it('should delete a note', async () => {
  
      const res = await request(app)
        .post('/api/stickyNoteRouter/deleteNote/testNoteId1')
        .set('Authorization', `Bearer ${token}`);
  
      expect(res.statusCode).toEqual(200);
  
      const note = await Notes.findById('testNoteId1');
      expect(note).toBeNull();
    });
  });