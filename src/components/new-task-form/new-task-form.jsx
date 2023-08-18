import React, { Component } from 'react';
import './new-task-form.css';

export class NewTaskForm extends Component {
  state = {
    label: '',
    minutes: '',
    seconds: '',
  };

  onLabelChange = (e) => {
    this.setState({
      label: e.target.value,
    });
  };

  onMinutesChange = (e) => {
    this.setState({
      minutes: e.target.value,
    });
  };

  onSecondsChange = (e) => {
    this.setState({
      seconds: e.target.value,
    });
  };

  onSubmit = (e) => {
    const { label, minutes, seconds } = this.state;
    e.preventDefault();
    this.props.onItemAdded(label, minutes, seconds);
    this.setState({ label: '', minutes: '', seconds: '' });
  };

  render() {
    const { label, minutes, seconds } = this.state;
    return (
      <header className="header">
        <h1>todos</h1>
        <form className="new-todo-form" onSubmit={this.onSubmit}>
          <input
            className="new-todo"
            placeholder="Task"
            autoFocus
            onChange={this.onLabelChange}
            value={label}
            required
          />
          <input
            value={minutes}
            onChange={this.onMinutesChange}
            className="new-todo-form__timer"
            placeholder="Min"
            autoFocus
            required
            type="number"
            min={0}
            max={59}
          />
          <input
            value={seconds}
            onChange={this.onSecondsChange}
            className="new-todo-form__timer"
            placeholder="Sec"
            autoFocus
            required
            type="number"
            min={0}
            max={59}
          />
          <input type="submit" style={{ display: 'none' }}></input>
        </form>
      </header>
    );
  }
}
