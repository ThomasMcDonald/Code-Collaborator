module.exports = function(models, logger,util, passport) {

	return {

		// This function will register a new user
		createUser: function(req, res){
      var user = new models.user({email:req.body.email, name:req.body.name});

      user.setPassword(req.body.password);

      user.save(function(err) {
        var token;
        token = user.generateJwt();
        res.status(200);
        res.json({
          "token" : token
        });
      });
    },
    loginUser: function(req, res){
      passport.authenticate('local', function(err, user, info){
        var token;

        // If Passport throws/catches an error
        if (err) {
          res.status(404).json(err);
          return;
        }

        // If a user is found
        if(user){
          token = user.generateJwt();
          res.status(200);
          res.json({
            "token" : token
          });
        } else {
          // If user is not found
          res.status(401).json(info);
        }
      })(req, res);
    },
    getUser: function(req, res){
      // If no user ID exists in the JWT return a 401
      if (!req.payload._id) {
        res.status(401).json({
          "message" : "UnauthorizedError: private profile"
        });
      } else {
        // Otherwise continue
        models.user.findById(req.payload._id).exec(function(err, user) {
            res.status(200).json(user);
          });
      }
    },
	};
};
