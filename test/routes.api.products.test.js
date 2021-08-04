const assert = require('assert');
const { test } = require('mocha');
const proxyquire = require('proxyquire');
let ruta = require('../routes/api/products')

const {
  productsMocks,
  ProductsServiceMocks
} = require('../utils/mocks/products');

const testServer = require('../utils/testServer');

describe("routes- api - products", function(){
  const route = proxyquire(ruta, {
    '../../services/products': ProductsServiceMocks
  });

  const request = testServer(route);

  describe("GET /products", function(){
    it("should respond with status 200", function(done){
      request.get("/api/products").expect(200, done);
    });

    it("should respond with content type json", function(done){
      request.get("/api/products").expect("Content-type", /json/, done);
    });

    it("should respond with not error", function(done) {
      request.get("/api/products").end((err, res) => {
        assert.strictEqual(err, null);
        done();
      });
    });

    it("should respond with the list of products", function(done){
      request.get("/api/products").end((err, res) => {
        assert.deepEqual(res.body, {
          data: productsMocks, 
          message: "products listed"
        });
      });
    });

  });
});