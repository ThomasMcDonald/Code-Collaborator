module.exports = function(app, express, io,path, controller,util) {


    console.log("Routes Module Loaded");


    app.get('/generateRoom', function(req, res){
        var ranString = util.roomGenerate();
        (async function(req,res, ranString){
          return await controller.document.createDocument(ranString);
       })(req,res,ranString).then(result =>{
         res.send(result);
       })

    });


    app.get('/**', function(req,res){
        res.sendFile(path.resolve('dist/code-therapy/index.html'));
    });
};
