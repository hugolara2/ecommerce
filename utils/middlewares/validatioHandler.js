const Joi = require('joi');

function validate(data, schema) {
  const { error } = Joi.object(schema).validate(data);
  return error;
}

//Lo ideal a demas del body es poder checar los parametros de url's 
function validationHandler(schema, check = "body") { 
  return function(req, res, next) {
    const error = validate(req[check], schema);
    error ? next(new Error(error)) : next();
  };
}

module.exports = validationHandler;