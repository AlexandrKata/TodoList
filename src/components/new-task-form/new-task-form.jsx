import React, { useState } from 'react';
import propTypes from 'prop-types';
import './new-task-form.css';

export const NewTaskForm = ({ onAddItem }) => {
  const [title, setTitle] = useState('');
  const [minutes, setMinutes] = useState('');
  const [seconds, setSeconds] = useState('');

  const onLabelChange = (e) => {
    setTitle(e.target.value);
  };

  const onMinutesChange = (e) => {
    setMinutes(e.target.value);
  };

  const onSecondsChange = (e) => {
    setSeconds(e.target.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    onAddItem(title, minutes, seconds);
    setTitle('');
    setMinutes('');
    setSeconds('');
  };

  return (
    <header className="header">
      <h1>todos</h1>
      <form className="new-todo-form" onSubmit={onSubmit}>
        <input className="new-todo" placeholder="Task" autoFocus onChange={onLabelChange} value={title} required />
        <input
          value={minutes}
          onChange={onMinutesChange}
          className="new-todo-form__timer"
          placeholder="Min"
          required
          type="number"
          min={0}
          max={59}
        />
        <input
          value={seconds}
          onChange={onSecondsChange}
          className="new-todo-form__timer"
          placeholder="Sec"
          required
          type="number"
          min={0}
          max={59}
        />
        <input type="submit" style={{ display: 'none' }}></input>
      </form>
    </header>
  );
};

NewTaskForm.propTypes = {
  onAddItem: propTypes.func,
};

NewTaskForm.defaultProps = {
  onAddItem: () => {},
};
