module.exports = function(app, io, connectedUser) {

    console.log("Sockets Module Loaded")
    var Users = {};

    io.on('connection', function(socket){
      socket.on('data', function(data){
      //  console.log(data.type + " - " + data.room);
        socket.to(data.room).emit(data.type, data.msg);
        if(data.type == "cursor") {
          for(var i=0;i<Users[data.room].length;i++){
              if(Users[data.room][i]._socket == socket.id){
                Users[data.room][i]._cursorPos = data.msg;
              }
          }
        }
      });

      socket.on('subscribe', function(content) {
        console.log('joining room', content.room);
        socket.join(content.room);
        if(Users[content.room] == null){
          Users[content.room] = [];
          Users[content.room].push(new connectedUser(socket.id,0));
        }
        else{
          Users[content.room].push(new connectedUser(socket.id,0));
        }
      });

        socket.on('unsubscribe', function(content) {
              console.log('leaving room', content.room);
              socket.leave(content.room);
          })

    });
};
