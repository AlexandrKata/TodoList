import React from "react";

import Task from "../task/task";

const TaskList = () => {
  return (
    <ul className="todo-list">
      <Task />
    </ul>
  );
};

export default TaskList;
