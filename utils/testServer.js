const express = require('express');
const supertest = require('supertest');

function testserver(route) {
  const app = express();
  route(app);
  return supertest(app);
}

module.exports = testserver;