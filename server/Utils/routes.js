module.exports = function(app, express, io) {


    console.log("Routes Module Loaded");

    app.get('/', function(req,res){
     res.sendFile(express.static(__dirname + '/dist/Chat-Factory'));
    });

};
