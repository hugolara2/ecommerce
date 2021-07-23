const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const productsRouter = require('./routes/views/products');
const productApiRouter = require('./routes/api/products');

//app
const app = express();

//Port
const port = 3000;

//Static files
app.use("/static", express.static(path.join(__dirname, "public")));

//View engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

app.use(bodyParser.json());

//Routes
app.use('/products', productsRouter);
app.use("/api/products", productApiRouter);

//Redirect
app.get('/', (req, res) => {
  res.redirect('/products');
});

//Server
app.listen(port, () => {
  console.log(`Application listening at http://localhost:${port}`);
});