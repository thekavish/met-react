// Task component - represents a single todo item
Task = React.createClass({
  propTypes: {
    // This component gets the task to display through a React prop.
    // We can use propTypes to indicate it is required
    task: React.PropTypes.object.isRequired,
    showPrivateButton: React.PropTypes.bool.isRequired
  },

  togglePrivate() {
    // Toggles between Private and Public
    Meteor.call("setPrivate", this.props.task._id, ! this.props.task.private);
  },

  toggleChecked() {
    // Set the checked property to the opposite of its current value
    Meteor.call("setChecked", this.props.task._id, ! this.props.task.checked);
  },
 
  deleteThisTask() {
    // Remove a task
    Meteor.call("removeTask", this.props.task._id)
    // console.log('Deleted '+this.props.task.text);
  },

  addRoles() {
    // console.log(this.props.task.text);
    Meteor.call("addRoles", this.props.task.owner, this.props.task.text);
  },

  render() { 

    const taskClassName = (this.props.task.checked ? "checked" : "") + " " + (this.props.task.private ? "private" : "");
    var timeString = new Date().getTime() - this.props.task.createdAt.getTime();

    // construct time difference
    /*if (timeString >= 86400000) {timeText = "More than a day ago."} else if (timeString >= 76400000) {timeText = "A day ago"} 
    else if (timeString >= 10800000) {timeText = "A few hours ago"; } else if (timeString >= 90000) {timeText = "A few minutes ago"; } 
    else if(timeString <= 1000){timeText = "Just Now"; } else{timeText = this.props.task.createdAt.toLocaleTimeString(); }*/

    // return (<li><div className="tasksDisplay"><div className="left">{this.props.task.text}</div><div className="right">{this.props.task.createdAt.toDateString()} {this.props.task.createdAt.toLocaleTimeString()}</div></div></li> ); }
    return (
      <li className={taskClassName}>

      <button className="delete" onClick={this.addRoles}> &times; </button>

      <input type="checkbox"readOnly={true} checked={this.props.task.checked} onClick={this.toggleChecked} />

      { this.props.showPrivateButton ? (
        <button className="toggle-private" onClick={this.togglePrivate}>
          { this.props.task.private ? "Make Public" : "Make Private" }
        </button>
      ) : ''}
      <span className="text" onClick={this.toggleChecked} >
        {this.props.task.username ? <strong>{this.props.task.username} : </strong>  : <b>Unknown : </b>}{this.props.task.text} - - Added : {this.props.task.createdAt.toLocaleString()}
      </span>

    </li>
    );
  }
});
