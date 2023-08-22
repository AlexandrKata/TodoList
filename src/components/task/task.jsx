import React, { useEffect, useState } from 'react';
import { formatDistanceToNow } from 'date-fns';
import propTypes from 'prop-types';
import './task.css';

export const Task = ({
  onEditItem,
  onDeleteItem,
  onToggleEditing,
  onToggleDone,
  onToggleTimer,
  item,
  id,
  onTickTimerItem,
}) => {
  const [title, setTitle] = useState(item.title);

  useEffect(() => {
    if (item.timer) {
      const timerId = setInterval(() => onTickTimerItem(), 1000);
      return () => clearInterval(timerId);
    }
  });

  const onEditChange = (e) => {
    setTitle(e.target.value);
  };

  const onTimeFormat = () => {
    if (Number(item.time) > 0) {
      let minutes = Math.floor(Number(item.time) / 60);
      let seconds = Number(item.time) - minutes * 60;
      minutes = Number(minutes) < 10 ? `0${minutes}` : minutes;
      seconds = Number(seconds) < 10 ? `0${seconds}` : seconds;
      const result = Number(minutes) === 0 && Number(seconds) === 0 ? 'The end' : `${minutes}:${seconds}`;
      return result;
    }
    return 'The end';
  };

  const onBlur = () => {
    setTitle(item.title);
    onToggleEditing();
  };

  const onKeyDown = (e) => {
    if (e.key === 'Escape') {
      setTitle(item.title);
      onToggleEditing();
    }
  };

  const dateCreateTask = formatDistanceToNow(
    item.date,
    {
      includeSeconds: true,
    },
    new Date()
  );

  let taskClassNames = [item.completed ? 'completed' : '', item.editing ? 'editing' : ''];

  return (
    <li className={taskClassNames.join(' ')}>
      <div className="view">
        <input className="toggle" type="checkbox" checked={item.completed} onChange={onToggleDone} />
        <label>
          <div className="title">{title}</div>
          <span className="description">
            <button className="icon icon-play" onClick={(e) => onToggleTimer(e)}></button>
            <button className="icon icon-pause" onClick={(e) => onToggleTimer(e)}></button>
            <span className="timer">{onTimeFormat()}</span>
          </span>
          <span className="description">{dateCreateTask}</span>
        </label>
        <button className="icon icon-edit" onClick={onToggleEditing}></button>
        <button className="icon icon-destroy" onClick={onDeleteItem}></button>
      </div>
      {item.editing ? (
        <form onSubmit={(e) => onEditItem(e, id, title)}>
          <input
            type="text"
            className="edit"
            value={title}
            onChange={onEditChange}
            autoFocus
            onBlur={onBlur}
            onKeyDown={onKeyDown}
          ></input>
        </form>
      ) : (
        ''
      )}
    </li>
  );
};

Task.propTypes = {
  onEditItem: propTypes.func,
  onDeleteItem: propTypes.func,
  onToggleEditing: propTypes.func,
  onToggleDone: propTypes.func,
  onToggleTimer: propTypes.func,
  item: propTypes.object,
  id: propTypes.number,
  onTickTimerItem: propTypes.func,
};

Task.defaultProps = {
  onEditItem: () => {},
  onDeleteItem: () => {},
  onToggleEditing: () => {},
  onToggleDone: () => {},
  onToggleTimer: () => {},
  item: {},
  id: 1,
  onTickTimerItem: () => {},
};
