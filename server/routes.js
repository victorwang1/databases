var controller = require('./controllers');
var router = require('express').Router();

//Connect controller methods to their corresponding routes
var retrieveKey = (req) => req.body = JSON.parse(Object.keys(req.body)[0]);

router.get('/messages', controller.messages.get);

router.post('/messages', (req, res) => {
  retrieveKey(req);
  controller.messages.post(req, res);
});

// router.get('/users', controller.users.get);
//
// router.post('/users', controller.users.post);
//
// router.get('/rooms', controller.users.get);
//
// router.post('/rooms', controller.users.post);

module.exports = router;
