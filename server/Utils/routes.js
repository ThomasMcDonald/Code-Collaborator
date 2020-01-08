const documentController = require('../controllers').Document;
const {NodeVM} = require('vm2');
const vm = new NodeVM({
    require: {
        external: true
    }
});

module.exports = function(app, path, util) {


    console.log("Routes Module Loaded");

    
    app.get('/generateDocument', function(req, res){
      const ranString = util.roomGenerate(10); 
      documentController.create(req,res, ranString);
    });

    app.post('/updateDocument', documentController.update);

    app.post('/runDocument', function(req, res){
      const {code} = req.body;
      vm.run(code);

      res.status(200).send("fin")
    });

    app.post('/getDocument', documentController.get);

};
