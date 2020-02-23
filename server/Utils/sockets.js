module.exports = function(app, io) {

    console.log("Sockets Module Loaded")
    var Users = {};

    io.on('connection', function(socket){

      socket.on('data', function(data){
        if(data.type == "cursor") {
          for(var i=0;i<Users[data.room].length;i++){
              if(Users[data.room][i]._socket == socket.id){
                Users[data.room][i]._cursorPos = data.msg;
                socket.to(data.room).emit(data.type, Users[data.room][i]);
              }
          }
        }else{
          socket.to(data.room).emit(data.type, data.msg);
        }
      });

      socket.on('subscribe', function(content) {
        (async function(content){
          return await controller.document.retrieveDocument(content.room);
        })(content).then(result =>{
          console.log('joining room', content.room);
          socket.join(content.room);
          console.log(result);
          socket.emit("message",result);
          if(Users[content.room] == null){
            Users[content.room] = [];
          }
          else{
            socket.to(content.room).emit("cursor", Users[content.room][Users[content.room].length-1]);
          }
        });
      });

        socket.on('unsubscribe', function(content) {
              console.log('leaving room', content.room);
              socket.leave(content.room);
          })

    });
};
