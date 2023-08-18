import React, { Component } from 'react';
import Proptypes from 'prop-types';
import './task-list.css';

import { Task } from '../task';

export class TaskList extends Component {
  static defaultProps = {
    todos: [],
    onDeleted: () => {},
    onToggleDone: () => {},
    onToggleEditing: () => {},
    onEdited: () => {},
  };

  static propTypes = {
    todos: Proptypes.array,
    onDeleted: Proptypes.func,
    onToggleDone: Proptypes.func,
    onToggleEditing: Proptypes.func,
    onEdited: Proptypes.func,
  };

  render() {
    const { todos, onDeleted, onToggleDone, onToggleEditing, onToggleTimer, onEdited } = this.props;
    const elements = todos.map((item) => {
      const { ...itemProps } = item;
      return (
        <Task
          key={item.id}
          {...itemProps}
          onEdited={onEdited}
          onDeleted={() => onDeleted(item.id)}
          onToggleDone={() => onToggleDone(item.id)}
          onToggleEditing={() => onToggleEditing(item.id)}
          onToggleTimer={(e) => onToggleTimer(item.id, e)}
        />
      );
    });
    return <ul className="todo-list">{elements}</ul>;
  }
}
