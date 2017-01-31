var contactModel = require('../models/contact.js'),
	express = require('express'),
	router = express.Router(),
	path = require('path'),
	queue = require('kue');

console.log('['+ __dirname + '/contact.js] okay');

router.post('/', function (req, res, next) {
  
  console.log('inside contact route!');

	var formData = req.body;
	console.log("user form received: ", formData);

	var job = queue.create('contact', {
		title: 'Ditt.io Contact Form Submission',
		to: 'contact@ditt.io',
		formData: formData
		}).save( function(err){
			if( !err ) console.log( job.id );
		});
});

module.exports = router;
