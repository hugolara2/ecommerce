const { config } = require('../../config');

function logErrors(err, req, res, next) {
  console.log(err.stack);
  next(err);
}

function clienErrorHandler(err, req, res, next) {
  //CAtch errors for ajax reques
  if(req.xhr) {
    res.status(500).json({ err: err });
  } else {
    next(err);
  }
}

function errorHandler(err, req, res, next) {
  //Catch error while streaming
  if(res.headersSent) {
    next(err);
  }
  
  if(!config.dev) {
    delete err.stack;
  }

  res.status(err.status || 500);
  res.render("error", { error: err.message } );

}

module.exports = {
  logErrors,
  clienErrorHandler,
  errorHandler,

};