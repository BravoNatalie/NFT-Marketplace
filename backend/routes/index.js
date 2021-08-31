const tokensRoutes = require('./tokensRoutes');

const appRouter = (app) => {
  tokensRoutes(app);
};

module.exports = appRouter;
