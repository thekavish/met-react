
// App component - represents the whole app
App = React.createClass({

  // This mixin makes the getMeteorData method work
  mixins: [ReactMeteorData],

  getInitialState() {
    return {
      hideCompleted: false,
    }
  },
  
  componentDidMount:function() { $(document).ready(function() { $('select').material_select(); }); },
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

  sentEmail(){
    Meteor.call('sendEmail','kavish@deligence.com','praful@deligence.com','Hello from Meteor!', ReactDOM.render(<emailTemplate />, mountNode));
  },

  handleSubmit(event) {
    //event.preventDefault();

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
          <button onClick={this.sentEmail}>Send</button>
          <input type="checkbox" className="filled-in" id="filled-in-box" readOnly={true} checked={this.state.hideCompleted}/>
          <label className="hide-completed" onClick={this.toggleHideCompleted} >Hide Completed Tasks</label>
          <div className="input-field col s12">
            <select multiple>
              <option value="" disabled>Choose your option</option>
              <option value="1">ReactJS</option>
              <option value="2">Flow Router</option>
              <option value="3">Material Theme</option>
              <option value="4">Aldeed Simple Schema</option>
              <option value="5">ALanning Roles</option>
              <option value="6">Ongoworks Security</option>
            </select>
            <label>Materialize Multiple Select</label>
          </div>

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
