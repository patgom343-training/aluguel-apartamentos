const express = require('express');
const router = express.Router();
const propertyController = require('../controllers/propertyController');
const auth = require('../middleware/auth');


router.post('/', auth, propertyController.create);
router.get('/available', propertyController.listAvailable);
router.put('/:id/available', auth, propertyController.updateAvailability);
router.put('/:id', auth, propertyController.update);

module.exports = router;
