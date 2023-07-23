const request = require('supertest');
const app = require('../server'); // the express server
const Document = jest.requireActual('../models/Document'); // the mongoose model
const Markdown = jest.requireActual('../models/Markdown'); // the mongoose model
const jsonwebtoken = jest.requireActual('jsonwebtoken'); 
//jest.mock('../models/Document');
//jest.mock('../models/Markdown');
const mongoose = jest.requireActual('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const mockFs = require('mock-fs');
const mammoth = require('mammoth');
const path = require('path');
const fs = require('fs');

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

/*
beforeEach(() => {
  // Clear all instances and calls to constructor and all methods:
  Document.mockClear();
  Markdown.mockClear();
});
*/
describe('File Routes', () => {

  // Test for POST /createFile
  it('should create a new file', async () => {
    const res = await request(app)
      .post('/api/fileRouter/createFile')
      .send({
        token: token,
        title: 'test title',
        text: 'test text'
      });
    expect(res.statusCode).toEqual(200);
  });

  // Test for POST /shareFile
  it('should share a file', async () => {
    const newdoc = new Document({_id: 'testId3', creator: "1", allowedUsers: "1", title: "title", data: "text"})
    await newdoc.save()
    const res = await request(app)
      .post('/api/fileRouter/shareFile')
      .set('Authorization', `Bearer ${token}`)
      .send({
        documentId: 'testId3',
        userToShareWith: 'testUserId'
      });
    expect(res.statusCode).toEqual(200);
  });

  // Test for POST /deleteFile/:id
  it('should delete a file', async () => {
    const res = await request(app)
      .post(`/api/fileRouter/deleteFile/${testId}`)
      .set('Authorization', `Bearer ${token}`);
    expect(res.statusCode).toEqual(200);
  });

  // Test for POST /shareMarkdown
  it('should share a markdown file', async () => {
    const newmark = new Markdown({_id: 'testDocumentId', creator: 'testuser', allowedUsers: 'testuser'})
    await newmark.save()
    const res = await request(app)
      .post('/api/fileRouter/shareMarkdown')
      .set('Authorization', `Bearer ${token}`)
      .send({
        documentId: 'testDocumentId',
        userToShareWith: 'testUserId'
      });
    expect(res.statusCode).toEqual(200);
  });

  // Test for POST /deleteMarkdown/:id
  it('should delete a markdown file', async () => {
    const newmark = new Markdown({_id: 'testDocumentId1', creator: 'testuser', allowedUsers: 'testuser'})
    await newmark.save();
    const res = await request(app)
      .post(`/api/fileRouter/deleteMarkdown/testDocumentId1`)
      .set('Authorization', `Bearer ${token}`);
    expect(res.statusCode).toEqual(200);
  });

/*
// Test for POST /uploadword
it('should upload a word file', async () => {
  // Mock fs to return a buffer representing a valid docx file
  const testFilePath = path.resolve(__dirname, './uploads/test.docx');
  const buffer = fs.readFileSync(testFilePath);

  mockFs({
    './uploads/test.docx': buffer,
  });

  const mockFile = {
    path: './uploads/test.docx',
    originalname: 'test.docx'
  };

  // Mock mammoth.extractRawText to return a fixed result when called
  jest.mock('mammoth', () => ({
    extractRawText: jest.fn().mockResolvedValue({ value: 'extracted text' }),
  }));

  const res = await request(app)
    .post('/api/fileRouter/uploadword')
    .attach('file', mockFile.path)
    .set('Authorization', `Bearer ${token}`);
    
  expect(res.statusCode).toEqual(200);
  // check that response includes the title and data
  expect(res.body).toEqual({
    title: 'test',
    data: 'extracted text'
  });
  mockFs.restore();
}); 
*/
  // Test for GET /downloadword/:id
  it('should download a word file', async () => {
    const newdoc = new Document({_id: 'testId4', title: "Hello", creator: 1, allowedUsers: 1, data: { ops: [{ insert: "Hello World" }] }})
    await newdoc.save()
    const res = await request(app)
      .get(`/api/fileRouter/downloadword/${newdoc._id}`)
      .set('Authorization', `Bearer ${token}`);
    expect(res.statusCode).toEqual(200);
    expect(res.header['content-type']).toEqual('application/vnd.openxmlformats-officedocument.wordprocessingml.document');
  });

  // Test for POST /uploadMarkdown
  it('should upload a markdown file', async () => {
    const res = await request(app)
      .post('/api/fileRouter/uploadMarkdown')
      .set('Authorization', `Bearer ${token}`)
      .attach('file', './uploads/test1.md');
    expect(res.statusCode).toEqual(200);
  });

  // Test for GET /exportMarkdown/:id
  it('should export a markdown file', async () => {
    const newmark = new Markdown({_id: 'testDocumentId1', creator: 'testuser', allowedUsers: 'testuser'})
    await newmark.save();
    const res = await request(app)
      .get(`/api/fileRouter/exportMarkdown/testDocumentId1`)
      .set('Authorization', `Bearer ${token}`);
    expect(res.statusCode).toEqual(200);
  });

    // Test for GET /downloadMarkdown/:id
  it('should download a markdown file', async () => {
    const newmark = new Markdown({_id: 'testDocumentId2', creator: 'testuser', allowedUsers: 'testuser', data: "11"})
    await newmark.save();
    const res = await request(app)
      .get(`/api/fileRouter/downloadMarkdown/${newmark._id}`)
      .set('Authorization', `Bearer ${token}`);
    expect(res.statusCode).toEqual(200);
  });
});