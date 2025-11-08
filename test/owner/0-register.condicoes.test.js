const { api, expect } = require('../setup');
const validOwners = require('../fixtures/owner.json');
const invalidOwners = require('../fixtures/owner-invalid.json');

describe('Condições de Teste - Registro de Proprietário', () => {
  it('deve registrar um novo proprietário com dados válidos', async () => {
    const owner = validOwners[0];
    const res = await api.post('/api/owners/register').send(owner);
    expect(res.status).to.be.oneOf([201, 409]);
    if (res.status === 201) {
      expect(res.body).to.have.property('id');
      expect(res.body).to.have.property('email', owner.email);
    } else {
      expect(res.body).to.have.property('error');
    }
  });

  it('deve falhar ao registrar proprietário já existente', async () => {
    const owner = validOwners[0];
    const res = await api.post('/api/owners/register').send(owner);
    expect(res.status).to.equal(409);
    expect(res.body).to.have.property('error');
  });

  it('deve falhar ao registrar sem campos obrigatórios', async () => {
    const owner = invalidOwners[0];
    const res = await api.post('/api/owners/register').send(owner);
    expect(res.status).to.equal(400);
    expect(res.body).to.have.property('error');
  });

  it('deve falhar ao registrar com senha fora dos requisitos', async () => {
    const owner = invalidOwners[2];
    const res = await api.post('/api/owners/register').send(owner);
    expect(res.status).to.equal(400);
    expect(res.body).to.have.property('error');
  });

  it('deve falhar ao registrar com e-mail inválido', async () => {
    const owner = invalidOwners[1];
    const res = await api.post('/api/owners/register').send(owner);
    expect(res.status).to.equal(400);
    expect(res.body).to.have.property('error');
  });
});
