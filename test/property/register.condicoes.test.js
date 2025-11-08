const { api, expect } = require('../setup');
const validOwners = require('../fixtures/owner.json');
const validProperties = require('../fixtures/property.json');
const invalidProperties = require('../fixtures/property-invalid.json');

let token;

before(async () => {
  // Login para obter token
  const res = await api.post('/api/owners/login').send({
    email: validOwners[0].email,
    password: validOwners[0].password
  });
  token = res.body.token;
});

describe('Condições de Teste - Registro de Imóveis', () => {
  it('deve cadastrar imóvel com proprietário autenticado', async () => {
    const res = await api.post('/api/properties')
      .set('Authorization', `Bearer ${token}`)
      .send(validProperties[0]);
    expect(res.status).to.be.oneOf([201, 409]);
  });

  it('deve falhar ao cadastrar imóvel sem autenticação', async () => {
    const res = await api.post('/api/properties').send(validProperties[0]);
    expect(res.status).to.equal(401);
  });

  it('deve falhar ao cadastrar imóvel sem campos obrigatórios', async () => {
    const res = await api.post('/api/properties')
      .set('Authorization', `Bearer ${token}`)
      .send(invalidProperties[0]);
    expect(res.status).to.equal(400);
  });

  it('deve falhar ao cadastrar imóvel com valor de diária negativo', async () => {
    const res = await api.post('/api/properties')
      .set('Authorization', `Bearer ${token}`)
      .send(invalidProperties[1]);
    expect(res.status).to.equal(400);
  });

  it('deve falhar ao cadastrar imóvel com valor de diária em formato inválido', async () => {
    const res = await api.post('/api/properties')
      .set('Authorization', `Bearer ${token}`)
      .send(invalidProperties[2]);
    expect(res.status).to.equal(400);
  });

  it('deve falhar ao cadastrar dois imóveis com o mesmo endereço para o mesmo proprietário', async () => {
    const res1 = await api.post('/api/properties')
      .set('Authorization', `Bearer ${token}`)
      .send(validProperties[1]);
    const res2 = await api.post('/api/properties')
      .set('Authorization', `Bearer ${token}`)
      .send(validProperties[1]);
    expect(res2.status).to.equal(409);
  });
});
