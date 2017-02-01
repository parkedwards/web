var contactModel = require('../models/contact.js'),
  express = require('express'),
  router = express.Router(),
  path = require('path')

const { queue } = require('../app');

console.log('[' + __dirname + '/contact.js] okay');

router.post('/', function (req, res, next) {

  var formData = req.body;
  console.log("user form received: ", formData);

  var job = queue.create('contact', {
    title: 'Ditt.io Contact Form Submission',
    to: 'contact@ditt.io',
    formData: formData
  }).save(function (err) {
    if (err) {
      console.error(err);
      return res.status(400).end();
    }
    else {
      console.log('success!');
      return res.status(201).end();
    }
  });

});

module.exports = router;
