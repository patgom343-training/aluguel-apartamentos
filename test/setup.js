require('dotenv').config();
const supertest = require('supertest');
const chai = require('chai');
const expect = chai.expect;
const api = supertest(process.env.BASE_URL || 'http://localhost:3000');

module.exports = { api, expect };
