
Meteor.publish("tasks", function() {
	return taskList.find({$or: [{ private: {$ne: true} }, { owner: this.userId } ]
    });
});

Meteor.startup(function() {
    // code to run on server at startup
    process.env.MAIL_URL = 'smtp://kavish%40deligence.com:Dec@2015@smtp.deligence.com:587';
});

Meteor.methods({
  sendEmail(to, from, subject, html) {

    // Let other method calls from the same client start running, without waiting for the email sending to complete.

    // this.unblock();
    Email.send({to: to, from: from, subject: subject, html: html });
  }
});
