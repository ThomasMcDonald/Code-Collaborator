module.exports = function(models, logger) {

	return {

		// This function will add a message document to the message collection
		createDocument: function(content){
			var newMessage = new models.message(content);
			 newMessage.save(function (error) {
		            if (error) {
		            	console.log(error)
		            }else{
		          	console.log({statusCode: "Message", msg: "Message Added" });
							}
		          });
		},

		// This function takes in a channelID and returns all messages related to that Channel
		updateDocument: async function(channelID) {
			return new Promise(function (resolve, reject) {
				models.message.find({_channelID: channelID}).exec(function (err, messages) {
			       if (err) {
			         console.log(err);
			       } else if (messages) {
			       	resolve(messages);
			       }
				});
			});
		}

	};
};
