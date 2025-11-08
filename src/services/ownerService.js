const owners = require('../models/owner');
const bcrypt = require('bcryptjs');

function findOwnerByEmail(email) {
  return owners.find(o => o.email === email);
}

function createOwner({ name, email, password, phone }) {
  if (findOwnerByEmail(email)) {
    throw { status: 409, message: 'E-mail já cadastrado.' };
  }
  if (!name || !email || !password || !phone) {
    throw { status: 400, message: 'Todos os campos são obrigatórios.' };
  }
  if (password.length < 8) {
    throw { status: 400, message: 'A senha deve ter no mínimo 8 caracteres.' };
  }
  const hash = bcrypt.hashSync(password, 10);
  const owner = { id: owners.length + 1, name, email, password: hash, phone, active: true };
  owners.push(owner);
  return owner;
}

function validateOwner(email, password) {
  const owner = findOwnerByEmail(email);
  if (!owner || !owner.active) {
    throw { status: 401, message: 'Credenciais inválidas ou usuário inativo.' };
  }
  if (!bcrypt.compareSync(password, owner.password)) {
    throw { status: 401, message: 'Credenciais inválidas.' };
  }
  return owner;
}

module.exports = { findOwnerByEmail, createOwner, validateOwner };
