taskList = new Mongo.Collection('task');

Meteor.methods({
  addTask(text) {
    // Make sure the user is logged in before inserting a task
    if (! Meteor.userId()) {
      throw new Meteor.Error("not-authorized");
    }
 
    taskList.insert({
      text: text,
      createdAt: new Date(),            // current time
      owner: Meteor.userId(),           // _id of logged in user
      username: Meteor.user().username  // username of logged in user
    });
  },
 
  setChecked(taskId, setChecked) {
    taskList.update(taskId, { $set: { checked: setChecked} });
  },

  setPrivate(taskId, setToPrivate) {
    const task = taskList.findOne(taskId);
 
    // Make sure only the task owner can make a task private
    if (task.owner !== Meteor.userId()) {
      throw new Meteor.Error("not-authorized");
    }
 
    taskList.update(taskId, { $set: { private: setToPrivate } });
  },
 
  removeTask(taskId) {
    const task = taskList.findOne(taskId);
    if (task.private && task.owner !== Meteor.userId()) {
      // If the task is private, make sure only the owner can delete it
      throw new Meteor.Error("not-authorized");
    }
    taskList.remove(taskId);
  }
});