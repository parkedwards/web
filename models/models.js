// this controls our connection to the db
// this should be required on all schema files in ./models
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/dittio');

var db = mongoose.connection;
db.on('error', console.error.bind('[mongodb]: connection error'));
db.once('open',function(callback){
	console.log('[mongodb]: connection successful');
});

module.exports = db;
module.exports.mg = mongoose;
