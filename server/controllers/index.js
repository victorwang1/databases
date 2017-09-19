var models = require('../models');

module.exports = {
  messages: {
    get: function (req, res) {
      models.messages.get(req, res, (err, data) => {
        res.statusCode = 200;
        res.end(data);
      });
    },
    post: function (req, res) {
      // console.log('!!!!!!!!!!!!!!!!!', req);
      models.messages.post(req, res, (err, data) => {
        res.statusCode = 201;
        res.end();
      });
    }
  }
  // ,
  //
  // users: {
  //   get: function (req, res) {
  //
  //   },
  //   post: function (req, res) {
  //     models.users.post(req, res, (err, data) => {
  //       res.statusCode = 201;
  //       res.end();
  //     });
  //   }
  // },
  //
  // rooms: {
  //   get: function (req, res) {
  //
  //   },
  //   post: function (req, res) {
  //     models.rooms.post(req, res, (err, data) => {
  //       res.statusCode = 201;
  //       res.end();
  //     });
  //   }
  // }
};
