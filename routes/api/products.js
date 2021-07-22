const express = require('express');
const router = express.Router();
const productMock = require('../../utils/mocks/products');


router.get('/', (req, res) => {
  const { query } = req.params;

  res.status(200).json({
    data: productMock,
    message: 'products listed'
  });
});

router.get('/:productId', (req, res) => {
  const { productId } = req.params;

  res.status(200).json({
    data: productMock[0],
    message: 'product retrieved'
  });
});

router.post('/', (req, res) => {
  
  res.status(201).json({
    data: productMock[0],
    message: 'product listed'
  });
});

router.put('/:productId', (req, res) => {
  
  res.status(200).json({
    data: productMock,
    message: 'product updated'
  });
});

router.delete('/:productId', (req, res) => {
  
  res.status(200).json({
    data: productMock,
    message: 'product deleted'
  });
});

module.exports = router;