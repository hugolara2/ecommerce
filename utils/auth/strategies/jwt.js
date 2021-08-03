const passport = require('passport');
const { Strategy, ExtractJWT } = require('passport-jwt');
const boom = require('boom');
const { config } = require('../../../config');
const MongoLib = require('../../../lib/mongo');

passport.use(
  new Strategy(
    {
      secretOrKey: config.authJwtSecret,
      jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken()
    },
    async function(tokenPayload, callback) {
      const mongoDB = new MongoLib();

      try {
        const [user] = await mongoDB.getAll("users", {
          username: tokenPayload.sub
        });

        if(!user) {
          return callback(boom.unauthorized(), false);
        }
        return callback(null, user);
      } catch(error) {
        return callback(error);
      }
    }
  )
);