
Meteor.publish("tasks", function() {
	return taskList.find({
      $or: [
        { private: {$ne: true} },
        { owner: this.userId }
      ]
    });
});

Meteor.startup(function() {
    // code to run on server at startup
});
