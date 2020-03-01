const Document = require('../models').Document;
module.exports = {
        create(req, res, generatedCode){
            const docoDate = new Date().toString();
            return Document.create(
                {
                    roomID: generatedCode, 
                    title: docoDate,
                    content: '',
                })
                .then(document => res.status(201).send(document))
                .catch(error => res.status(400).send(error))
        },
         update(req,res){
            const {title, roomID, content } = req.body;
            console.log(title, roomID, content)
            return Document.update({
                title,
                content,
                },
                {
                where:{
                    roomID
                }
            })
            .then(document => res.status(201).send(document))
            .catch(error => res.status(400).send(error))
        },
        get(req,res){
            const {roomId} = req.body;

            return Document.findOrCreate({
                where: {
                    roomId
                },
                defaults: {
                    title: new Date().toString(),
                    roomID:roomId,
                    content: '',
                }
            })
            .then((document, created) => {
                res.status(201).send(document[0])
            })
            .catch(error => res.status(400).send(error))
        }
}