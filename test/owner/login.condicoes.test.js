const { api, expect } = require('../setup');
const validOwners = require('../fixtures/owner.json');
const invalidLogins = require('../fixtures/login-invalid.json');

let token;

describe('Condições de Teste - Login de Proprietário', () => {
  it('deve fazer login com usuário registrado', async () => {
    const owner = validOwners[0];
    const res = await api.post('/api/owners/login').send({
      email: owner.email,
      password: owner.password
    });
    expect(res.status).to.equal(200);
    expect(res.body).to.have.property('token');
    token = res.body.token;
  });

  it('deve falhar ao fazer login com usuário não registrado', async () => {
    const res = await api.post('/api/owners/login').send(invalidLogins[0]);
    expect(res.status).to.equal(401);
    expect(res.body).to.have.property('error');
  });

  it('deve falhar ao fazer login sem informar dados obrigatórios', async () => {
    const res = await api.post('/api/owners/login').send(invalidLogins[1]);
    expect(res.status).to.equal(401);
    expect(res.body).to.have.property('error');
  });

  it('deve falhar ao fazer login com senha inválida', async () => {
    const res = await api.post('/api/owners/login').send(invalidLogins[2]);
    expect(res.status).to.equal(401);
    expect(res.body).to.have.property('error');
  });

  it('deve acessar rota protegida com token válido', async () => {
    const res = await api.get('/api/properties/available').set('Authorization', `Bearer ${token}`);
    expect(res.status).to.equal(200);
  });

  it('deve negar acesso à rota protegida com token inválido', async () => {
    const res = await api.get('/api/properties/available').set('Authorization', 'Bearer tokeninvalido');
    expect(res.status).to.equal(401);
  });
});
