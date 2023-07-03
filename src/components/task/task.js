import React from "react";
import { formatDistanceToNow } from "date-fns";

const date = formatDistanceToNow(new Date());

const Task = () => {
  return (
    <li>
      <div className="view">
        <input className="toggle" type="checkbox" />
        <label>
          <span className="description">Active task</span>
          <span className="created">{date}</span>
        </label>
        <button className="icon icon-edit"></button>
        <button className="icon icon-destroy"></button>
      </div>
    </li>
  );
};

export default Task;
