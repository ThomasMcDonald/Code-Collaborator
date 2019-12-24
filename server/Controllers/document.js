const Document = require('../models').Document;
module.exports = {
        create(req, res, generatedCode){
            const docoDate = new Date().toString();
            return Document.create(
                {
                    roomID: generatedCode, 
                    title: docoDate,
                    content: '//',
                })
                .then(document => res.status(201).send(document))
                .catch(error => res.status(400).send(error))
        },
         update(req,res){
            const {title, roomID, content } = req.body;
            console.log(title,roomID,content);
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
         }
}