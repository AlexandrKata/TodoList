import React, { Component } from "react";
import Proptypes from "prop-types";
import TasksFilter from "../tasks-filter";
import "./footer.css";

export default class Footer extends Component {
  static defaultProps = {
    filter: "",
    onFilterChange: () => {},
    onClearCompleted: () => {},
    countCompleted: 0,
  };

  static propTypes = {
    filter: Proptypes.string,
    onFilterChange: Proptypes.func,
    onClearCompleted: Proptypes.func,
    countCompleted: Proptypes.number,
  };

  render() {
    const { filter, onFilterChange, onClearCompleted, countCompleted } =
      this.props;
    return (
      <footer className="footer">
        <span className="todo-count">{countCompleted} items left</span>
        <TasksFilter filter={filter} onFilterChange={onFilterChange} />
        <button className="clear-completed" onClick={onClearCompleted}>
          Clear completed
        </button>
      </footer>
    );
  }
}
