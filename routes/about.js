var express = require('express'),
	router = express.Router(),
	path = require('path'),
	content = require('../views/about.json');

console.log('[' + __dirname + '/about.js]: okay');
var sortedTeam = content.team.sort(function() { return .5 - Math.random(); });
/* GET home page. */
router.get('/', function(req, res, next) {
	//console.log("about to test req" + req);
	if(!req) 
		return next();
	res.render('about', {	
		team:sortedTeam, 
		mission:content.mission, 
		about:content.about,
		locations:content.locations
	});
});

module.exports = router;
