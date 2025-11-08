const ownerService = require('../services/ownerService');
const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'segredo';
const JWT_EXPIRES = '2h';

exports.register = (req, res) => {
  try {
    const owner = ownerService.createOwner(req.body);
    res.status(201).json({ id: owner.id, name: owner.name, email: owner.email, phone: owner.phone });
  } catch (err) {
    res.status(err.status || 500).json({ error: err.message });
  }
};

exports.login = (req, res) => {
  try {
    const owner = ownerService.validateOwner(req.body.email, req.body.password);
    const token = jwt.sign({ id: owner.id, email: owner.email }, JWT_SECRET, { expiresIn: JWT_EXPIRES });
    res.json({ token });
  } catch (err) {
    res.status(err.status || 500).json({ error: err.message });
  }
};
