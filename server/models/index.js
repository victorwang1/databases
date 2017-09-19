var db = require('../db');

module.exports = {
  messages: {
    get: function (req, res, callback) {
      db.messages.readFromDB(callback);
    },
    post: function (req, res, callback) {
      db.messages.writeToDB(req.body, callback);
    }
  }
  // ,
  //
  // users: {
  //   get: function () {
  //
  //   },
  //   post: function (req, res, callback) {
  //     db.users.writeToDB(req.body, callback);
  //   }
  // },
  //
  // rooms: {
  //   get: function () {
  //
  //   },
  //   post: function (req, res, callback) {
  //     db.rooms.writeToDB(req.body, callback);
  //   }
  // }
};
