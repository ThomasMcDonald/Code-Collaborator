var jwt = require('express-jwt');

module.exports = function(app, express, io,path, controller,util) {
    console.log("Routes Module Loaded");

    var auth = jwt({
      secret: 'MY_SECRET',
      userProperty: 'payload'
    });
    // Room End points
    app.get('/generateRoom', function(req, res){
        var ranString = util.roomGenerate(10);
        (async function(req,res, ranString){
          return await controller.document.createDocument(ranString);
       })(req,res,ranString).then(result =>{
         res.send(result);
       })
    });

    // User End points
    app.post("/api/v1/login", controller.user.loginUser);

    app.post("/api/v1/register", controller.user.createUser);

    app.get("/api/v1/profile", auth, controller.user.getUser);
};
