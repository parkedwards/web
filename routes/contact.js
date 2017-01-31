var contactModel = require('../models/contact.js'),
	express = require('express'),
	router = express.Router(),
	path = require('path'),
	kue = require('kue');

console.log('['+ __dirname + '/contact.js] okay');

router.post('/contact',function(req,res,next){
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
