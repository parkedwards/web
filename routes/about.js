let express = require('express'),
  router = express.Router(),
  path = require('path'),
  content = require('../views/about.json');

console.log('[' + __dirname + '/about.js]: okay');
let sortedTeam = content.team.sort(function () { return .5 - Math.random(); });

router.get('/', function (req, res, next) {
  if (!req) {
    return next();
  }
  
  res.render('about', {
    team: sortedTeam,
    mission: content.mission,
    about: content.about,
    locations: content.locations
  });
});

module.exports = router;
