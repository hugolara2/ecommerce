const express = require('express');
const path = require('path'); 
const app = express();
const port = 3000;
const productsRouter = require('./routes/products');
const productApiRouter = require('./routes/api/products');

app.use("/static", express.static(path.join(__dirname, "public")));

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

app.use('/products', productsRouter);
app.use("/api/products", productApiRouter);

app.listen(port, () => {
  console.log(`Application listening at http://localhost:${port}`);
});