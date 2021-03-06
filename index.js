const Koa = require('koa');
const bodyParser = require('koa-bodyparser')();
const compress = require('koa-compress')();
const cors = require('@koa/cors')(/* Add your cors option */);
const helmet = require('koa-helmet')(/* Add your security option */);
const logger = require('koa-logger')();

const session = require('koa-session');
const passport = require('koa-passport');

const errorHandler = require('./middleware/error.middleware');
const applyApiMiddleware = require('./api');
const { isDevelopment } = require('./config');
const { port } = require('./config').server;

const app = new Koa();

/**
 * Add here only development middlewares
 */
if (isDevelopment) {
  app.use(logger);
}

app.keys = ['S3cR3tK3y($&*^%$#@!'];
require('./auth');

/**
 * Pass to our server instance middlewares
 */
app
  .use(errorHandler)
  .use(helmet)
  .use(compress)
  .use(cors)
  .use(bodyParser)
  .use(session(app))
  .use(passport.initialize())
  .use(passport.session());

/**
 * Apply to our server the api router
 */
applyApiMiddleware(app);

const server = app.listen(port, () => {
  console.log(`Server listening on port: ${port}`);
});

module.exports = server;
