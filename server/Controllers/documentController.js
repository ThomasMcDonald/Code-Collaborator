module.exports = function(models, logger,util) {

	return {

		// This function will add a message document to the message collection
		createDocument: async function(content){
			return new Promise(function (resolve, reject) {

							models.document.find({_roomID: content}).exec(function (err, document) {
						       if (err) {
						         reject(err);
						       } else if (document.length == 0) {
										 	var docoDate = new Date().toString();
											var newDoc = new models.document({ _roomID:content, _title:docoDate,_dateCreated:docoDate, _content:[], action: ""});
											newDoc.save(function (error) {
						            if (error) {
						            	console.log(error);
						            }else{
													console.log("Room created");
						          		resolve({_roomID: content});
											}
						          });
									} else{
										console.log("Somehow there was a collision, Ill figure out a fix in a sec :)");
										reject("yuck");
									}
							});
						});
					},
		retrieveDocument: async function(_roomID){
			return new Promise(function (resolve, reject){
				models.document.find({_roomID: _roomID}).exec(function (err, document) {
						 if (err) {
							 reject(err);
						}else {
							document = document.find(i => i._roomID === _roomID);
							document.action = "newDoc";
							resolve(document)
						}
				});
			})
		},

		// This function takes in a channelID and returns all messages related to that Channel
		updateDocument: async function(documentContent) {
			return new Promise(function (resolve, reject) {
				models.document.findOneAndUpdate({_roomID: documentContent._roomID}, {$set: {_content: documentContent._content}}, function(err,doc) {
		       if (err) {
						  throw err;
						} else {
							resolve(documentContent);
						 }
     		});
			});
		}

	};
};
