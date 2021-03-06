const kue = require('kue');
const queue = kue.createQueue();

const helper = require('sendgrid').mail;
const subject = 'Hello from Ditt.io!';

module.exports = queue.process('contact', (job, done) => {
  setTimeout(() => {
    let from_email = new helper.Email(job.data.from);
    let to_email = new helper.Email(job.data.email);
    let content = new helper.Content('text/plain', 'Some awesome content here + URL!');
    let mail = new helper.Mail(from_email, subject, to_email, content);

    let sg = require('sendgrid')(process.env.SENDGRID_API_KEY);

    let request = sg.emptyRequest({
      method: 'POST',
      path: '/v3/mail/send',
      body: mail.toJSON(),
    });

    sg.API(request, (err, res) => {
      if (err) {
        console.error(err);
      }

      console.log('================================');
      console.log(res.statusCode);
      console.log(res.body);
      console.log(res.headers);
      console.log(`sent email to ${job.data.email}`);
      done();
    })
  }, 3000);
});

