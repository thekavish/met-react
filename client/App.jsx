
// App component - represents the whole app
App = React.createClass({

  // This mixin makes the getMeteorData method work
  mixins: [ReactMeteorData],

  getInitialState() {
    return {
      hideCompleted: false,
    }
  },
 
  // Loads items from the task collection and puts them on this.data.tasks
  getMeteorData() {
    let query = {};
 
    if (this.state.hideCompleted) {
      // If hide completed is checked, filter tasks
      query = {checked: {$ne: true}};
    }
 
    return {
      tasks: taskList.find(query, {sort: {createdAt: -1}}).fetch(),
      incompleteCount: taskList.find({checked: {$ne: true}}).count(),
      currentUser: Meteor.user()
    };
  },
 
  renderTasks() {

    return this.data.tasks.map((task) => {

      const currentUserId = this.data.currentUser && this.data.currentUser._id;
      const showPrivateButton = task.owner === currentUserId;

      return <Task key={task._id} task={task} showPrivateButton={showPrivateButton} />;
    });

  },

  handleSubmit(event) {
    // event.preventDefault();

    // Find the text field via the React ref
    var text = ReactDOM.findDOMNode(this.refs.textInput).value.trim();

    Meteor.call("addTask", text);

    // Clear form
    ReactDOM.findDOMNode(this.refs.textInput).value = "";
  },

  toggleHideCompleted() {
    this.setState({hideCompleted: ! this.state.hideCompleted});
  },
  
  render() {
    return (
      <div className="ui container">
        <header>
          <h1>Todo List ({this.data.incompleteCount})</h1>

          <label className="hide-completed"> 
              <input type="checkbox"
                readOnly={true} 
                checked={this.state.hideCompleted} 
                onClick={this.toggleHideCompleted} />
                Hide Completed Tasks
          </label>

          <AccountsUIWrapper />

          { this.data.currentUser ?
            <form className="new-task" onSubmit={this.handleSubmit} >
              <input
                type="text"
                ref="textInput"
                placeholder="Type new tasks and press enter" />
            </form> : ''
          }
        </header>
        <ul> {this.renderTasks()} </ul>
      </div>
    );
  }
});
