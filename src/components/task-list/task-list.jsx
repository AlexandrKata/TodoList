import React from 'react';
import propTypes from 'prop-types';
import './task-list.css';

import { Task } from '../task';

export const TaskList = ({
  todos,
  onEditItem,
  onDeleteItem,
  onToggleEditing,
  onToggleDone,
  onToggleTimer,
  onTickTimerItem,
}) => {
  const elements = todos.map((item) => {
    const { id, ...itemProps } = item;
    return (
      <Task
        key={id}
        id={id}
        {...itemProps}
        item={item}
        onEditItem={onEditItem}
        onDeleteItem={() => onDeleteItem(id)}
        onToggleEditing={() => onToggleEditing(id)}
        onToggleDone={() => onToggleDone(id)}
        onToggleTimer={(e) => onToggleTimer(e, id)}
        onTickTimerItem={() => onTickTimerItem(id)}
      />
    );
  });
  return <ul className="todo-list">{elements}</ul>;
};

TaskList.propTypes = {
  todos: propTypes.array,
  onEditItem: propTypes.func,
  onDeleteItem: propTypes.func,
  onToggleEditing: propTypes.func,
  onToggleDone: propTypes.func,
  onToggleTimer: propTypes.func,
  onTickTimerItem: propTypes.func,
};

TaskList.defaultProps = {
  todos: [],
  onEditItem: () => {},
  onDeleteItem: () => {},
  onToggleEditing: () => {},
  onToggleDone: () => {},
  onToggleTimer: () => {},
  onTickTimerItem: () => {},
};
