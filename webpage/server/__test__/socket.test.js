const request = require('supertest');
const app = require('../server'); // the express server
const Document = jest.requireActual('../models/Document'); // the mongoose model
const Markdown = jest.requireActual('../models/Markdown');
const LaTex = jest.requireActual("../models/LaTex"); // the mongoose model
const jsonwebtoken = jest.requireActual('jsonwebtoken'); 

//Test cases here only test the functionality of the methods specified in the controller, socketIO functionality is not tested here.

describe('Testing routes', () => {

    it('should create a document', async () => {
      const res = await request(app)
        .post('/api/DummySocketRouter/dummyFindOrCreateDoc')
        .send({
          id: 'testId',
          user: 'testUser',
          title: 'testTitle',
        });
  
      expect(res.statusCode).toEqual(200);
      expect(res.text).toEqual('Created');
    });
  
    it('should find all documents', async () => {
      
      const res = await request(app)
        .post('/api/DummySocketRouter/dummyFindAll')
        .send({ user: 'testUser' });
  
      expect(res.statusCode).toEqual(200);
      expect(res.text).toEqual('Found');
    });
  
    it('should find all markdowns', async () => {
      
      const res = await request(app)
        .post('/api/DummySocketRouter/dummyfindAllMarkdown')
        .send({ user: 'testUser' });
  
      expect(res.statusCode).toEqual(200);
      expect(res.text).toEqual('Found');
    });
  
    it('should find all latex documents', async () => {
      
      const res = await request(app)
        .post('/api/DummySocketRouter/dummyfindAllLaTex')
        .send({user: 'testUser'});
  
      expect(res.statusCode).toEqual(200);
      expect(res.text).toEqual('Found');
    });
  
    it('should create a markdown document', async () => {
      const res = await request(app)
        .post('/api/DummySocketRouter/dummyfindOrCreateMark')
        .send({
          id: 'testId',
          user: 'testUser',
          title: 'testTitle',
        });
  
      expect(res.statusCode).toEqual(200);
      expect(res.text).toEqual('Created');
    });
  
    it('should create a latex document', async () => {
      const res = await request(app)
        .post('/api/DummySocketRouter/dummyfindOrCreateLatex')
        .send({
          id: 'testId',
          user: 'testUser',
          title: 'testTitle',
        });
  
      expect(res.statusCode).toEqual(200);
      expect(res.text).toEqual('Created');
    });
  });
