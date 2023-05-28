module.exports = app => {
  const controller = require("../controllers/epcis.controller");

  var router = require("express").Router();

  router.get('/capture', controller.findAllCaptures);
  router.post('/capture', controller.createCapture);
  router.delete('/capture',controller.deleteAllEpcis)
  // router.put('/capture/:id', controller.addEventToList);
  app.use("/api", router);
};
