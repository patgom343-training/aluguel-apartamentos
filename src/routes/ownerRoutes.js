const express = require('express');
const router = express.Router();
const ownerController = require('../controllers/ownerController');

router.post('/register', ownerController.register);
router.post('/login', ownerController.login);

module.exports = router;
