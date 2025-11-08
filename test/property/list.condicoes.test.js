const { api, expect } = require('../setup');
const validOwners = require('../fixtures/owner.json');
const validProperties = require('../fixtures/property.json');

let token;

before(async () => {
  // Login para obter token
  const res = await api.post('/api/owners/login').send({
    email: validOwners[0].email,
    password: validOwners[0].password
  });
  token = res.body.token;
});

describe('Condições de Teste - Lista de Apartamentos Disponíveis', () => {
  it('deve retornar apenas imóveis disponíveis', async () => {
    const res = await api.get('/api/properties/available').set('Authorization', `Bearer ${token}`);
    expect(res.status).to.equal(200);
    expect(res.body).to.be.an('array');
    res.body.forEach((property) => {
      expect(property.available).to.equal(true);
    });
  });
});
