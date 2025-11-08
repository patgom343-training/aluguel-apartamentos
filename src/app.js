const express = require('express');
const ownerRoutes = require('./routes/ownerRoutes');
const propertyRoutes = require('./routes/propertyRoutes');

const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const swaggerDocument = YAML.load(__dirname + '/../resources/swagger.yaml');

const app = express();
app.use(express.json());

app.use('/api/owners', ownerRoutes);
app.use('/api/properties', propertyRoutes);

// Swagger endpoint
app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.get('/', (req, res) => res.send('API de Gestão de Apartamentos por Temporada'));

module.exports = app;
