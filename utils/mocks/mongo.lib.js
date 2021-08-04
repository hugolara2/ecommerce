const  { productsMocks, filteredProductsMock } = require('./products');
const sinon = require('sinon');

const getAllStub = sinon.stub();
const tagQuery = { tags: { $in: ["expensive"] } };

getAllStub.withArgs("products").resolves(productsMocks);
getAllStub.withArgs("products", tagQuery).resolves(filteredProductsMock("expensive"));

const createStub = sinon.stub().resolves("60fb4eb11c449787919b8de0")

class MongoLibMock {
  getAll(collection, query) {
    return getAllStub(collection, query);
  }

  create(collection, data) {
    return createStub(collection, data);
  }
}

module.exports = {
  getAllStub, 
  createStub, 
  MongoLibMock
}