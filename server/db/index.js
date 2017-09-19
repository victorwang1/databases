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
        password : '',
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
      writeToUsers({username: username}, () => { 
        writeToRooms({roomname: roomname}, () => {
          connection.query(`INSERT INTO messages (username, message, roomname) 
                            SELECT users.id, ${mysql.escape(message)}, rooms.id 
                            FROM users, rooms 
                            WHERE users.name = ${mysql.escape(username)} AND rooms.name = ${mysql.escape(roomname)}`,
            (error, results, fields) => {
              if (error) throw error;
              connection.end();
              console.log('>>>>>>>>>>>>REACHED');
              callback(null, null);
            }
          );
        });
      });
    },

    readFromDB: function(callback) {
      var connection = module.exports.utils.setupConnection();
      connection.query(`SELECT users.name AS 'username', messages.message, rooms.name AS 'roomname' FROM users, messages, rooms WHERE users.id = messages.username AND rooms.id = messages.roomname`,
        (error, results, fields) => {
          if (error) throw error;
          connection.end();
          console.log('>>>>>>>>>', {results: results});
          callback(null, JSON.stringify({results: results}));
        }
      );
    }
  },

  users: {
    writeToDB: function({username}, callback) {
      var connection = module.exports.utils.setupConnection();
      connection.query(`INSERT INTO users (name) VALUES (${mysql.escape(username)})`,
        (error, results, fields) => {
          if (error) throw error;
          connection.end();
          console.log('>>>>>>>>>>>>USERS');
          callback(null, null);
        }
      );
    }
  },

  rooms: {
    writeToDB: function({roomname}, callback) {
      var connection = module.exports.utils.setupConnection();
      connection.query(`INSERT INTO rooms (name) VALUES (${mysql.escape(roomname)})`,
        (error, results, fields) => {
          if (error) throw error;
          connection.end();
          console.log('>>>>>>>>>>>>ROOMS');
          callback(null, null);
        }
      );
    }
  }
}
