const Sentry = require('@sentry/node');
const { config } = require('../../config');
const boom = require('boom');
const isRequestAjaxOrApi = require('../../utils/isRequestAjaxOrApi');

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

function withErrorStack(err, stack) {
  if(config.dev) {
    return { ...err, stack };
  }
}

function logErrors(err, req, res, next) {
  Sentry.captureException(err);
  console.log(err.stack);
  next(err);
}

function wrapErrors(err, req, res, next) {
  if(!err.isBoom) {
    next(boom.badImplementation(err));
  }
  next(err);
}

function clienErrorHandler(err, req, res, next) {
  const {
    output: { statusCode, payload}
  } = err;

  //Catch errors for ajax request or if an error ocurrs while streaming
  if(isRequestAjaxOrApi(req) || res.headersSent) {
    res.status(500).json(withErrorStack(payload, err.stack));
  } else {
    next(err);
  }
}

function errorHandler(err, req, res, next) {
  const {
    output: { statusCode, payload}
  } = err; 

  res.status(statusCode);
  res.render("error", withErrorStack(payload, err.stack));

}

module.exports = {
  logErrors,
  clienErrorHandler,
  errorHandler,
  wrapErrors
};