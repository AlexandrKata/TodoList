import React, { Component } from 'react';
import { formatDistanceToNow } from 'date-fns';
import Proptypes from 'prop-types';
import './task.css';

export default class Task extends Component {
  state = {
    label: this.props.label,
  };

  static defaultProps = {
    onDeleted: () => {},
    onToggleDone: () => {},
    onToggleEditing: () => {},
    completed: false,
    editing: false,
    time: new Date(),
  };

  static propTypes = {
    onDeleted: Proptypes.func,
    onToggleDone: Proptypes.func,
    onToggleEditing: Proptypes.func,
    completed: Proptypes.bool,
    editing: Proptypes.bool,
    time: Proptypes.object,
  };

  onEditChange = (e) => {
    this.setState({
      label: e.target.value,
    });
  };

  onEditSubmit = (e) => {
    e.preventDefault();
    this.props.onEdited(this.props.id, this.state.label);
    this.props.onToggleEditing();
  };

  render() {
    const { onDeleted, onToggleDone, onToggleEditing, completed, editing, time } = this.props;
    let { label } = this.state;
    const date = formatDistanceToNow(
      time,
      {
        includeSeconds: true,
      },
      new Date()
    );

    let taskClassNames = '';
    if (completed) {
      taskClassNames = 'completed';
    }

    if (editing) {
      taskClassNames = 'editing';
    }

    return (
      <li className={taskClassNames}>
        <div className="view">
          <input className="toggle" type="checkbox" checked={completed} onChange={onToggleDone} />
          <label>
            <span className="description" onClick={onToggleDone}>
              {label}
            </span>
            <span className="created">{date}</span>
          </label>
          <button className="icon icon-edit" onClick={onToggleEditing}></button>
          <button className="icon icon-destroy" onClick={onDeleted}></button>
        </div>
        <form onSubmit={this.onEditSubmit}>
          <input type="text" className="edit" value={label} onChange={this.onEditChange}></input>
        </form>
      </li>
    );
  }
}
