var contactModel = require('../models/contact.js'),
  express = require('express'),
  router = express.Router(),
  path = require('path')

const { queue } = require('../app');

console.log('[' + __dirname + '/contact.js] okay');

router.post('/', function (req, res, next) {

  let {
    name,
    email,
    url,
    comment,
  } = req.body;

  console.log("user form received: ", req.body);

  var job = queue.create('contact', {
    title: 'Ditt.io Contact Form Submission',
    from: 'contact@ditt.io',
    name,
    email,
    url,
    comment,
  }).save(function (err) {
    if (err) {
      console.error(err);
      return res.status(400).end();
    }
    else {
      console.log('contact form submission added to MQ!');
    }
  });
  // other chainable methods:
  // can also set attempts ( job.attempts() )
  // can also set priority ( job.priority('high') )

  job.on('complete', () => {
    console.log(`job for ${req.body.email} completed!`);
  });

  job.on('failed', () => {
    console.error(`job for ${req.body.email} failed!`);
  });

  // redis size keeps filling up...might have to do with the extra listeners being applied with each route call

  return res.status(201).end();

});

module.exports = router;
