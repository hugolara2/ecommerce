const assert = require('assert');
const proxyquire = require('proxyquire');
let ruta = require('../services/products');

const {
  MongoLibMock,
  getAllStub,
  createStub 
} = require('../utils/mocks/mongo.lib');

const {
  productsMocks
} = require('../utils/mocks/products');

describe("services - products", function(){
  const ProductsService = proxyquire(ruta, {
    "../lib/mongo": MongoLibMock
  });

  const productsService = new ProductsService();

  describe('when getProduct method is called', async () => {
    it('should call the getAll MongoLib method', async () => {
      await productsService.getProducts({});
      assert.strictEqual(getAllStub.called, true);
    });
  });
  
});