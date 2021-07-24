const productsMocks = require('../utils/mocks/products');
const MongoLib = require('../lib/mongo');

class ProductService {
  constructor(){
    this.collection = 'products';
    this.mongoDB = new MongoLib();
  }

  async getProducts({ tags }) {
    const query = tags && { tags: { $in: tags } };
    const products = await this.mongoDB.getAll(this.collection, query);
    return products || [];
  }

  async getProduct({ productId} ) {
    const product = await this.mongoDB.get(this.collection, productId);
    return product || {};
  }

  async createProduct({ product  }) {
    const newProduct = await this.mongoDB.create(this.collection, product);
    return newProduct;
  }

  async updateProduct({ productId, product }) {
    const updateProduct = await this.mongoDB.update(this.collection, productId, product);
    return updateProduct;
  }
  patchProduct({ productId, product }) {
    return Promise.resolve(productsMocks[0]);
    //TODO: Crear metodo para patch
  }

  async deleteProduct({ productId }) {
    const deleteProduct = await this.mongoDB.delete(this.collection, productId);
    return deleteProduct;
  }

}

module.exports = ProductService; 