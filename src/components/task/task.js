import React, { Component } from "react";
import { formatDistanceToNow } from "date-fns";

const date = formatDistanceToNow(new Date());

export default class Task extends Component {
  state = {
    completed: false,
  };

  onLabelClick = () => {
    this.setState(({ completed }) => {
      return {
        completed: !completed,
      };
    });
  };

  render() {
    const { label, onDeleted } = this.props;
    const { completed } = this.state;

    let classNames = null;
    if (completed) {
      classNames = "completed";
    }

    return (
      <li className={classNames}>
        <div className="view">
          <input className="toggle" type="checkbox" />
          <label>
            <span className="description" onClick={this.onLabelClick}>
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
