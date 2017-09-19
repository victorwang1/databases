var mysql = require('mysql');

// Create a database connection and export it from this file.
// You will need to connect with the user "root", no password,
// and to the database "chat".

module.exports = {
  utils: {
    setupConnection: function() {
      var connection = mysql.createConnection({
        host     : 'localhost',
        user     : 'root',
        password : 'plantlife',
        database : 'chat'
      });

      connection.connect();

      return connection;
    }
  },

  messages: {
    writeToDB: function({username, message, roomname}, callback) {
      var connection = module.exports.utils.setupConnection();
      var writeToUsers = module.exports.users.writeToDB;
      var writeToRooms = module.exports.rooms.writeToDB;
      writeToUsers({username: username}, (err, results) => {
        var userId = results.insertId;
        writeToRooms({roomname: roomname}, (err, results) => {
          if (err) console.log('heyheyhey');
          var roomId = results.insertId;
          console.log('>>>>> INSERTING MESSAGE');
          console.log(userId, roomId);

          connection.query(`INSERT INTO messages (username, message, roomname)
                            VALUES
                            ((SELECT id as 'userId' FROM users
                              WHERE id = ${mysql.escape(userId)}),
                                         ${mysql.escape(message)},
                             (SELECT id as 'roomId' FROM rooms
                              WHERE id = ${mysql.escape(roomId)}))`,
            (error, results, fields) => {
              if (error) {
                console.log(error)
              };
              connection.end();
              // console.log('>>>>>>>>>>>>', username, message, roomname);
              callback(null, null);
            }
          );
        });
      });
    },

    readFromDB: function(callback) {
      var connection = module.exports.utils.setupConnection();
      connection.query(`SELECT messages.id, users.name AS 'username', messages.message, rooms.name AS 'roomname' FROM users, messages, rooms
                        WHERE users.id = messages.username AND rooms.id = messages.roomname
                        ORDER BY messages.id DESC`,
        (error, results, fields) => {
          if (error) console.log(error);
          connection.end();
          // console.log('>>>>>>>>> READ', {results: results});
          callback(null, JSON.stringify({results: results}));
        }
      );
    }
  },

  users: {
    writeToDB: function({username}, callback) {
      var connection = module.exports.utils.setupConnection();
      connection.query(`INSERT IGNORE INTO users (name) VALUES (${mysql.escape(username)})`,
        (error, results, fields) => {
          if (error) {
            console.log(error);
          } else {
            console.log('>>>>>>>>>>>>USERS');
            console.log(results);
            if (results.insertId === 0)  {
              connection.query(`SELECT id FROM users
                                WHERE name = ${mysql.escape(username)}`,
                (error, results, fields) => {
                  if (error) console.log('yo' + error);
                  console.log("duplicated username >>> results");
                  console.log(results);
                  callback(null, {insertId: results[0].id});
                }
              );
            } else {
              callback(null, results);
            }
          }
          connection.end();
        }
      );
    }
  },

  rooms: {
    writeToDB: function({roomname}, callback) {
      var connection = module.exports.utils.setupConnection();
      connection.query(`INSERT IGNORE INTO rooms (name) VALUES (${mysql.escape(roomname)})`,
        (error, results, fields) => {
          if (error) {
            console.log(error);
          } else {
            console.log('>>>>>>>>>>>>ROOMS');
            console.log(results);
            if (results.insertId === 0) {
              connection.query(`SELECT id FROM rooms
                                WHERE name = ${mysql.escape(roomname)}`,
                (error, results, fields) => {
                  if (error) console.log('yo' + error);
                  console.log("duplicated roomname >>> results");
                  console.log(results);
                  callback(null, {insertId: results[0].id});
                }
              )
            } else {
              callback(null, results);
            }
          }
          connection.end();
        }
      );
    }
  }
}
