module.exports = app => {
  const controller = require("../controllers/epcis.controller");

  var router = require("express").Router();

  router.get('/capture', controller.findAllCaptures);
  router.post('/capture', controller.createCapture);

  app.use("/api", router);
};
