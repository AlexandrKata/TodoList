import React from "react";
import TasksFilter from "../tasks-filter/tasks-filter";

const Footer = ({
  filter,
  onFilterChange,
  onClearCompleted,
  countCompleted,
}) => {
  return (
    <footer className="footer">
      <span className="todo-count">{countCompleted} items left</span>
      <TasksFilter filter={filter} onFilterChange={onFilterChange} />
      <button className="clear-completed" onClick={onClearCompleted}>
        Clear completed
      </button>
    </footer>
  );
};

export default Footer;
