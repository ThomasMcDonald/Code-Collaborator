module.exports = function(app, io) {

    console.log("Sockets Module Loaded")

    io.on('connection', function(socket){
      socket.on('data', function(data){
        console.log(data);
      });

    });
};
