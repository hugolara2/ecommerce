/**TODO:
 * [] Usar express-debug
 * [] Usar express-slash
 */
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const boom = require('boom');
const productsRouter = require('./routes/views/products');
const productApiRouter = require('./routes/api/products');

const {
  errorHandler,
  wrapErrors,
  clienErrorHandler,
  logErrors
} = require('./utils/middlewares/errorsHandles'); 

const isRequestAjaxOrApi = require('./utils/isRequestAjaxOrApi');

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

app.use(function(req, res, next) {
  if(isRequestAjaxOrApi) {
    const {
      output: { statusCode, payload}
    } = boom.notFound();

    res.status(statusCode).json(payload);
  }
  res.status(404).render("404");
});

//Error handlers
app.use(logErrors);
app.use(wrapErrors);
app.use(errorHandler);
app.use(clienErrorHandler);

//Server
app.listen(port, () => {
  console.log(`Application listening at http://localhost:${port}`);
});