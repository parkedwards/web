var express = require('express'),
	router = express.Router(),
	path = require('path'),
	content = require('../views/content.json');

console.log('[' + __dirname + '/index.js]: okay');

/* GET home page. */
router.get('/', function(req, res, next) {
	console.log("about to test req" + req);
	if(!req) 
		return next();
	var random = req.app.get('random');
	res.render('index', {random: random, 
		mastheadText:content.masthead[random],
		mb1Text:content.mb1[random],
		mb1Headline:content.mb1Headline[random],
		mb2Text:content.mb2[random],
		mb2Headline:content.mb2Headline[random],
		mb3Text:content.mb3[random],
		mb3Headline:content.mb3Headline[random],
		contactText:content.contact[random],
		contactHeadline:content.contactHeadline[random],
		aboutText:content.about[random],
		aboutHeadline:content.aboutHeadline[random],
		aboutButton:content.aboutButton[random],
		footerName:content.footer.name,
		footerAddress:content.footer.address,
		footerTerms:content.footer.terms,
	});
});

module.exports = router;
