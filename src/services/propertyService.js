const properties = require('../models/property');


function createProperty({ title, description, address, city, price, type, ownerId, available }) {
  if (!title || !description || !address || !city || !price) {
    throw { status: 400, message: 'Todos os campos obrigatórios devem ser preenchidos.' };
  }
  if (properties.find(p => p.address === address && p.ownerId === ownerId)) {
    throw { status: 409, message: 'Imóvel já cadastrado neste endereço para este proprietário.' };
  }
  const property = {
    id: properties.length + 1,
    title,
    description,
    address,
    city,
    price,
    type: type || 'apartamento',
    available: typeof available === 'boolean' ? available : true,
    ownerId
  };
  properties.push(property);
  return property;
}


function updateAvailability(id, ownerId, available) {
  const property = properties.find(p => p.id === Number(id) && p.ownerId === ownerId);
  if (!property) {
    throw { status: 404, message: 'Imóvel não encontrado.' };
  }
  property.available = !!available;
  return property;
}

function updateProperty(id, ownerId, data) {
  const property = properties.find(p => p.id === Number(id) && p.ownerId === ownerId);
  if (!property) {
    throw { status: 404, message: 'Imóvel não encontrado.' };
  }
  // Não permitir duplicidade de endereço para o mesmo proprietário
  if (data.address && data.address !== property.address) {
    if (properties.find(p => p.address === data.address && p.ownerId === ownerId)) {
      throw { status: 409, message: 'Imóvel já cadastrado neste endereço para este proprietário.' };
    }
  }
  Object.assign(property, data);
  return property;
}

function normalize(str) {
  return str ? str.normalize('NFD').replace(/\p{Diacritic}/gu, '').toLowerCase().trim() : '';
}

function listAvailable({ city, minPrice, maxPrice, type }) {
  return properties.filter(p =>
    p.available &&
    (!city || normalize(p.city) === normalize(city)) &&
    (!type || normalize(p.type) === normalize(type)) &&
    (!minPrice || p.price >= minPrice) &&
    (!maxPrice || p.price <= maxPrice)
  );
}

module.exports = { createProperty, listAvailable, updateAvailability, updateProperty };
