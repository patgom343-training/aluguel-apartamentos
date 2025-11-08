const { api } = require('../setup.js');
const owners = require('../fixtures/owner.json');

async function getToken(ownerIndex = 0) {
  const res = await api.post('/api/owners/login').send({
    email: owners[ownerIndex].email,
    password: owners[ownerIndex].password
  });
  return res.body.token;
}

module.exports = { getToken };
