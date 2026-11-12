const request = require('supertest')
const app = require('../../../app')
const { resetTestDB } = require('./config')

describe('Flashcards API Endpoints', () => {
  let api

  beforeEach(async () => {
    await resetTestDB()
  })

  beforeAll(() => {
    api = app.listen(4001, () => {
      console.log('Test server running on port 4001')
    })
  })

  afterAll((done) => {
    console.log('Gracefully closing server')
    api.close(done)
  })


  describe('GET /flashcards', () => {
    it('should return all flashcards with a status code 200', async () => {
      const response = await request(api).get('/flashcards');

      expect(response.status).toBe(200);
      expect(response.body).toBeInstanceOf(Array);
      expect(response.body.length).toBeGreaterThan(0);
    });
  })
});