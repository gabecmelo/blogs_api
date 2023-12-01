const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../../src/app');

const { expect } = chai;

chai.use(chaiHttp);

/* Exemplo de teste de integração */
describe('Hello', function () {
  it('should return hello world', async function () {
    const response = await chai.request(app).get('/');
    expect(response.status).to.be.equal(200);
  });
});