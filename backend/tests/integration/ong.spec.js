const request = require('supertest');
const app = require('../../src/app');
const connection = require('../../src/database/connection');

describe('ONG', () => {
    beforeEach(async () => {
      await connection.migrate.rollback();
    });

    afterAll(async () => {
      await connection.destroy();
      await connection.migrate.latest();
    });

    it('Should be able to crate a new ONG', async() => {
      const response = await request(app)
        .post('/ongs')
        .send({
          name: "AACD2",
          email: "contato@teste.com",
          whatsapp: "4700000000",
          city: "Recife",
          uf: "PE"
        });

        expect(response.body).toHaveProperty('id');
        expect(response.body.id).toHaveLength(8);
    });
});