Meteor.startup(function() {

	Accounts.ui.config({passwordSignupFields: "USERNAME_ONLY"});
	
    // Use Meteor.startup to render the component after the page is ready
    ReactDOM.render( < App / > , document.getElementById("render-target"));
});

Meteor.subscribe("tasks");
