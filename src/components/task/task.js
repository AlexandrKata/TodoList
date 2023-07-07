import React, { Component } from "react";
import { formatDistanceToNow } from "date-fns";

const date = formatDistanceToNow(new Date());

export default class Task extends Component {
  render() {
    const { label, onDeleted, onToggleDone, completed, id } = this.props;

    let classNames = null;
    if (completed) {
      classNames = "completed";
    }

    return (
      <li className={classNames}>
        <div className="view">
          <input
            className="toggle"
            type="checkbox"
            checked={completed}
            onChange={onToggleDone}
          />
          <label htmlFor={id}>
            <span className="description" onClick={onToggleDone}>
              {label}
            </span>
            <span className="created">{date}</span>
          </label>
          <button className="icon icon-edit"></button>
          <button className="icon icon-destroy" onClick={onDeleted}></button>
        </div>
      </li>
    );
  }
}
