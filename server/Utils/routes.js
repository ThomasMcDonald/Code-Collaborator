module.exports = function(app, express, io,path, util) {


    console.log("Routes Module Loaded");


    app.get('/generateRoom', function(req, res){
        // var result = util.roomGenerate();

        // moved this here because it wasnt working within its own file :)
        var text = "";
        var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

        for (var i = 0; i < 6; i++)
          text += possible.charAt(Math.floor(Math.random() * possible.length));

        console.log(text);
        res.send({_roomID: text});
    });


    app.get('/**', function(req,res){
        res.sendFile(path.resolve('dist/code-therapy/index.html'));
    });
};
