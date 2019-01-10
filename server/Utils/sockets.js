module.exports = function(app, io) {

    console.log("Sockets Module Loaded")

    io.on('connection', function(socket){
      socket.on('data', function(data){
        console.log(data.type + " - " + data.room);
        socket.to(data.room).emit(data.type, data.msg);
      });

      socket.on('subscribe', function(content) {
        console.log('joining room', content.room);
        socket.join(content.room);
      });

        socket.on('unsubscribe', function(content) {
              console.log('leaving room', content.room);
              socket.leave(content.room);
          })

    });
};
