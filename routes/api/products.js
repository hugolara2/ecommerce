const express = require('express');
const router = express.Router();
const ProductService = require('../../services/products');

const  productService = new ProductService();


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
    const product = await productService.getProduct({ productId });

    res.status(200).json({
      data: product,
      message: 'product retrieved'
    });
  } catch(err) {
    next(err);
  }

});

router.post('/', async (req, res, next) => {
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

router.put('/:productId', async (req, res, next) => {
  const { productId } = req.params;
  const { body: product } = req;

  try{
    const producto = await productService.updateProduct({ productId, product });
    res.status(200).json({
      data: producto,
      message: 'product updated'
    });
  } catch(err) {
    next(err);
  }
  
});

router.patch('/:productId', async (req, res, next) => {
  const { productId } = req.params;
  const { body: product } = req; 

  try{
    const producto = await productService.patchProduct({ productId, product });
    res.status(200).json({
      data: producto,
      message: "Product updated"
    });
  } catch(err) {
    next(err);
  }

});

router.delete('/:productId', async (req, res, next) => {
  const { productId } = req.params;

  try{
    const product = await productService.deleteProduct({ productId });
    res.status(200).json({
      data: product,
      message: 'product deleted'
    });
  } catch(err) {
    next(err);
  }
  
});

module.exports = router;