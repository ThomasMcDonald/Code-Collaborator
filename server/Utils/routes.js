const documentController = require('../controllers').Document;

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

    
    app.get('/generateDocument', function(req, res){
      const ranString = util.roomGenerate(10); 
      documentController.create(req,res, ranString);
    });

    app.post('/updateDocument', documentController.update);

    app.post('/runDocument', async function(req, res){
      const {code} = req.body;
      const currentTime = new Date().getTime();


      //write the submitted code to a file
      // fs.writeFileSync(`./tmp/${currentTime}.js`, code);

      vm.run(code, 'vm.js');
      console.log(sandBoxOuput);

      let functionWithCallbackInSandbox = vm.run(`module.exports = ${code}`);

      const data = await functionWithCallbackInSandbox();

      res.status(200).send(data);

      // exec = require('child_process').exec;
      
    });

    app.post('/getDocument', documentController.get);

};
