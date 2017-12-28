const request = require('supertest');
const { expect } = require('chai');

module.exports = (app) => {
  describe('# GET /api/v1', () => {
    it('Should get the main (index) API route',  async () => {
      try {
        const response = await request(app).get('/api/v1');
        expect(response.statusCode).to.equal(200);
        expect(response.body).to.be.a('object');
        expect(response.body.success).to.equal(true);
        return true;
      } catch (err) {
        throw err;
      }
    });
  });
};
