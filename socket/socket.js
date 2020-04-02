controller = require('../controllers/myController');

module.exports = function(io) {

users = [];
  io.on('connection', function(socket) {
     console.log(socket.id + ' user connected');

// =========== User Register ================
     
     socket.on('setUsername', function(data) {
      controller.userExist(data, response => {
        if (response == "exist")
          socket.emit("userExist", data.name + " username is taken! Try some other username.");
        else {
          controller.storeUser(data, response => {
            if (response == "success")
              socket.emit("user", data.name + " user registered successfully");
            else
              socket.emit("user", "There is error while registering" + data.name + " user")
          });
        }
      });

    });
// =========== User Register End ================

// =========== Simple One to One chat ================

  socket.on("setUname", (data) => {
    console.log(data)
    users.push(data.socket_id);
  });


   socket.on('msg', function(data) {
    // console.log(users)
      io.to(users[0]).to(users[1]).emit('newmsg', data);
   });

// =========== Simple One to One chat ================




     socket.on('disconnect', () => {
        console.log("A user disconnected")
     });
  });

};