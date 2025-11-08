exports.update = (req, res) => {
  try {
    const property = require('../services/propertyService').updateProperty(req.params.id, req.user.id, req.body);
    res.json(property);
  } catch (err) {
    res.status(err.status || 500).json({ error: err.message });
  }
};
const propertyService = require('../services/propertyService');


exports.create = (req, res) => {
  try {
    const property = propertyService.createProperty({ ...req.body, ownerId: req.user.id });
    res.status(201).json(property);
  } catch (err) {
    res.status(err.status || 500).json({ error: err.message });
  }
};

exports.updateAvailability = (req, res) => {
  try {
    const { available } = req.body;
    const property = propertyService.updateAvailability(req.params.id, req.user.id, available);
    res.json(property);
  } catch (err) {
    res.status(err.status || 500).json({ error: err.message });
  }
};

exports.listAvailable = (req, res) => {
  try {
    const { city, minPrice, maxPrice, type } = req.query;
    const properties = propertyService.listAvailable({
      city,
      minPrice: minPrice ? Number(minPrice) : undefined,
      maxPrice: maxPrice ? Number(maxPrice) : undefined,
      type
    });
    res.json(properties);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
