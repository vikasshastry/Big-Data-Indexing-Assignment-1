var router = require("express").Router();
const planRoutes = require("./plans.route");
const config = require("../config/config");

const defaultRoutes = [
  {
    path: "/",
    route: planRoutes,
  },
];

const devRoutes = [
  // routes available only in development mode
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

if (config.env === "development") {
  devRoutes.forEach((route) => {
    router.use(route.path, route.route);
  });
}

module.exports = router;
