import React, { Component } from 'react';
import { formatDistanceToNow } from 'date-fns';
import Proptypes from 'prop-types';
import './task.css';

export class Task extends Component {
  state = {
    label: this.props.label,
    timeInSecond: this.props.time,
  };

  static defaultProps = {
    onDeleted: () => {},
    onToggleDone: () => {},
    onToggleEditing: () => {},
    completed: false,
    editing: false,
    date: new Date(),
  };

  static propTypes = {
    onDeleted: Proptypes.func,
    onToggleDone: Proptypes.func,
    onToggleEditing: Proptypes.func,
    completed: Proptypes.bool,
    editing: Proptypes.bool,
    date: Proptypes.object,
  };

  componentDidMount() {
    this.timerID = setInterval(() => this.onTick(), 1000);
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

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

  onTick() {
    const { timer } = this.props;
    const { timeInSecond } = this.state;
    if (timer && timeInSecond) {
      this.setState({ timeInSecond: timeInSecond - 1 });
    }
  }

  onTimeFormat = () => {
    const { timeInSecond } = this.state;
    if (Number(timeInSecond) > 0) {
      let minutes = Math.floor(Number(timeInSecond) / 60);
      let seconds = Number(timeInSecond) - minutes * 60;
      minutes = Number(minutes) < 10 ? `0${minutes}` : minutes;
      seconds = Number(seconds) < 10 ? `0${seconds}` : seconds;
      const result = Number(minutes) === 0 && Number(seconds) === 0 ? 'The end' : `${minutes}:${seconds}`;
      return result;
    }
    return 'end';
  };

  onBlur = () => {
    this.setState({ label: this.props.label });
    this.props.onToggleEditing();
  };

  onKeyDown = (e) => {
    if (e.key === 'Escape') {
      this.setState({ label: this.props.label });
      this.props.onToggleEditing();
    }
  };

  render() {
    const { onDeleted, onToggleDone, onToggleEditing, onToggleTimer, completed, editing, date, id } = this.props;
    let { label } = this.state;

    const dateCreateTask = formatDistanceToNow(
      date,
      {
        includeSeconds: true,
      },
      new Date()
    );

    let taskClassNames = [completed ? 'completed' : '', editing ? 'editing' : ''];

    return (
      <li className={taskClassNames.join(' ')}>
        <div className="view">
          <input className="toggle" type="checkbox" checked={completed} onChange={onToggleDone} />
          <label htmlFor={id}>
            <div className="title">{label}</div>
            <span className="description">
              <button className="icon icon-play" onClick={(e) => onToggleTimer(e)}></button>
              <button className="icon icon-pause" onClick={(e) => onToggleTimer(e)}></button>
              <span className="timer">{this.onTimeFormat()}</span>
            </span>
            <span className="description">{dateCreateTask}</span>
          </label>
          <button className="icon icon-edit" onClick={onToggleEditing}></button>
          <button className="icon icon-destroy" onClick={onDeleted}></button>
        </div>
        {editing ? (
          <form onSubmit={this.onEditSubmit}>
            <input
              type="text"
              className="edit"
              value={label}
              onChange={this.onEditChange}
              autoFocus
              onBlur={this.onBlur}
              onKeyDown={this.onKeyDown}
            ></input>
          </form>
        ) : (
          ''
        )}
      </li>
    );
  }
}
