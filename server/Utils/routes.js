module.exports = function(app, express, io,path) {


    console.log("Routes Module Loaded");

    app.get('/**', function(req,res){
        res.sendFile(path.resolve('dist/code-therapy/index.html'));
    });

};
