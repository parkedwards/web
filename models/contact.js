// contact.js pulls in the mongoose(mg) from models.js
//
var mongoose = require('./models.js').mg,
	Schema = mongoose.Schema;

console.log('['+ __dirname + '/contact.js] okay');
var contactSchema = new Schema({
	contactName: String,
	contactEmail: String,
	contactTitle: String,
	contactPhone: String
});

module.exports.contact = contactSchema;
