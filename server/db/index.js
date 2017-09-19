var mysql = require('mysql');

// Create a database connection and export it from this file.
// You will need to connect with the user "root", no password,
// and to the database "chat".

module.exports = {
  writeToDB: function({username, message, roomname}) {
    var connection = mysql.createConnection({
      host     : 'localhost',
      user     : 'root',
      password : 'plantlife',
      database : 'chat'
    });

    connection.connect();

    connection.query(`INSERT INTO users (name) VALUES (${mysql.escape(username)})`,
      (error, results, fields) => {
        if (error) throw error;

        var userId = results.insertId;
        connection.query(`INSERT INTO rooms (name) VALUES (${mysql.escape(roomname)})`,
          (error, results, fields) => {
            if (error) throw error;
            console.log('>>>>>>>>USER_ID', userId);

            var roomId = results.insertId;
            connection.query(`INSERT INTO messages (username, message, roomname)
                              SELECT users.id, ${mysql.escape(message)}, rooms.id FROM users, rooms WHERE users.id=${mysql.escape(userId)} AND rooms.id=${mysql.escape(roomId)}
                              `,
                              //
                              // SET username = (SELECT id
                              //                 FROM users
                              //                 WHERE id = ${mysql.escape(userId)})
                              //     message = ${mysql.escape(message)}
                              //     roomname = (SELECT id
                              //                 FROM rooms
                              //                 WHERE id = ${mysql.escape(roomId)})

              (error, results, fields) => {
                // console.log(message);
                console.log('>>>>>>>USER_ID_ROOM_ID', userId, roomId);
                console.log(results);
                if (error) throw error;

                connection.end();

              }
            );
          }
        );
      }
    );
  }
}
