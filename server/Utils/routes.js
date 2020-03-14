const documentController = require('../controllers').Document;
const {spawn, exec} = require('child_process');

const fs = require('fs');
const {NodeVM} = require('vm2');

let sandBoxOuput = {}

const vm = new NodeVM({
  sandbox: { sandBoxOuput },
    require: {
        external: true
    }
});

module.exports = function(app, path, util) {


    console.log("Routes Module Loaded");

    app.post('/getDocument', documentController.get);
    
    app.get('/generateDocument', function(req, res){
      const ranString = util.roomGenerate(10); 
      documentController.create(req,res, ranString);
    });

    app.post('/updateDocument', documentController.update);

    app.post('/runDocument', async function(req, res){
      const {code} = req.body;
      const currentTime = new Date().getTime();

      docker.run('node', ['-it'], process.stdout, function (err, data, container) {
        console.log(data.StatusCode);
      });
      
    });

    

};
