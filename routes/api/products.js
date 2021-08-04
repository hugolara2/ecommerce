/**
 * TODO: 
 * [] Usar jwt para red social.
 * [] Sacar las funciones de la funcion principal
 */
const express = require('express');
const passport = require('passport');
const ProductService = require('../../services/products');

const validation = require('../../utils/middlewares/validatioHandler');

const { productIdSchema, 
  productTagSchema, 
  createProductSchema, 
  updateProductSchema} = require('../../utils/schemas/products'); 

// JWT strategy
require('../../utils/auth/strategies/jwt');

function productsApi(app) {

  const router = express.Router();
  app.use("/api/products", router);

  const productService = new ProductService();

  router.get('/', async (req, res, next) => {
    const { tags } = req.query;

    try{
      const product = await productService.getProducts({ tags });

      res.status(200).json({
        data: product,
        message: 'products listed'
      });
    } catch(err) {
      next(err);
    }
    
  });

  router.get('/:productId', async (req, res, next) => {
    const { productId } = req.params;

    try{
      const products = await productService.getProduct({ productId });

      res.status(200).json({
        data: products,
        message: 'products retrieved'
      });
    } catch(err) {
      next(err);
    }

  });

  router.post('/', validation(createProductSchema), async (req, res, next) => {
    const { body: product } = req ;

    try{
      const producto = await productService.createProduct({ product });
      
      res.status(201).json({
        data: producto,
        message: 'product listed'
      });
    } catch(err) {
      next(err);
    }
    
  });

  router.put('/:productId', passport.authenticate("jwt", { session: false}), validation({ productId: productIdSchema }, "params"), validation(updateProductSchema), 
    async (req, res, next) => {
    const { productId } = req.params;
    const { body: product } = req;

    try{
      const updatedProducto = await productService.updateProduct({ productId, product });
      res.status(200).json({
        data: updatedProducto,
        message: 'product updated'
      });
    } catch(err) {
      next(err);
    }
    
  });

  // router.patch('/:productId', async (req, res, next) => {
  //   const { productId } = req.params;
  //   const { body: product } = req; 

  //   try{
  //     const patchedProducto = await productService.patchProduct({ productId, product });
  //     res.status(200).json({
  //       data: patchedProducto,
  //       message: "Product updated"
  //     });
  //   } catch(err) {
  //     next(err);
  //   }

  // });

  router.delete('/:productId', passport.authenticate("jwt", { session: false}), async (req, res, next) => {
    const { productId } = req.params;

    try{
      const deletedProduct = await productService.deleteProduct({ productId });
      res.status(200).json({
        data: deletedProduct,
        message: 'product deleted'
      });
    } catch(err) {
      next(err);
    }
    
  });
}
module.exports = productsApi;