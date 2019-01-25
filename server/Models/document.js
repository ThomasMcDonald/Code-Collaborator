module.exports = function(mongoose) {

var DocumentSchema =  mongoose.Schema({
  _roomID: {
    type: String,
    required:true
  },
  _title:{
    type: String,
    required:true
  },
  _dateCreated:{
    type: String,
    required:true
  },
  _content: {
    type: Array,
    required: true
  },
  action:{
    type: String,
    required: false
  }
});


var Document = mongoose.model('Document', DocumentSchema);
return Document;
};
