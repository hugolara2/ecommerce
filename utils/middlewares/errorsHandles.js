const Sentry = require('@sentry/node');
const { config } = require('../../config');

const Tracing = require('@sentry/tracing');

Sentry.init({
  dsn: `https://${config.sentryDSN}@sentry.io/${config.sentryID}`,
    // Set tracesSampleRate to 1.0 to capture 100%
  // of transactions for performance monitoring.
  // We recommend adjusting this value in production
  tracesSampleRate: 1.0,
});

const transaction = Sentry.startTransaction({
  op: "test",
  name: "My First Transaction",
});

// setTimeout(() => {
//   try {
//     foo();
//   } catch(err) {
//     Sentry.captureException(err);
//   } finally {
//     transaction.finish();
//   }
// }, 99);

function logErrors(err, req, res, next) {
  Sentry.captureException(err);
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