module.exports = function(app, io, connectedUser, controller) {

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

      socket.on('save', function(content){
        console.log("Saving");
        (async function(){
          return await controller.document.updateDocument(content);
        })().then(result => {
          console.log(result);
        });
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
            Users[content.room].push(new connectedUser(socket.id,0));
          }
          else{
            Users[content.room].push(new connectedUser(socket.id,0));
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
