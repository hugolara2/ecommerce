const express = require('express');
const router = express.Router();
const productMock = require('../utils/mocks/products');



router.get('/', (req, res) => {
  res.render("products", {productMock});
});

module.exports = router;