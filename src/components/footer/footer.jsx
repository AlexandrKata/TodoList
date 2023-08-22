import React from 'react';
import propTypes from 'prop-types';

import { TasksFilter } from '../tasks-filter';
import './footer.css';

export const Footer = ({ filter, onChangeFilter, onClearCompleted, countCompleted }) => {
  return (
    <footer className="footer">
      <span className="todo-count">{countCompleted} items left</span>
      <TasksFilter filter={filter} onChangeFilter={onChangeFilter} />
      <button className="clear-completed" onClick={onClearCompleted}>
        Clear completed
      </button>
    </footer>
  );
};

Footer.propTypes = {
  filter: propTypes.string,
  onChangeFilter: propTypes.func,
  onClearCompleted: propTypes.func,
  countCompleted: propTypes.number,
};

Footer.defaultProps = {
  filter: 'all',
  onChangeFilter: () => {},
  onClearCompleted: () => {},
  countCompleted: 0,
};
