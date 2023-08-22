import React from 'react';
import propTypes from 'prop-types';
import './tasks-filter.css';

export const TasksFilter = ({ filter, onChangeFilter }) => {
  const buttonsArr = [
    { name: 'all', label: 'All' },
    { name: 'active', label: 'Active' },
    { name: 'completed', label: 'Completed' },
  ];

  const buttons = buttonsArr.map(({ name, label }) => {
    const isActive = filter === name;
    const classNames = isActive ? 'selected' : '';
    return (
      <li key={name}>
        <button type="button" className={classNames} data-name={name} onClick={(e) => onChangeFilter(e)}>
          {label}
        </button>
      </li>
    );
  });

  return <ul className="filters">{buttons}</ul>;
};

TasksFilter.propTypes = {
  filter: propTypes.string,
  onFilterChange: propTypes.func,
};

TasksFilter.defaultProps = {
  filter: 'all',
  onFilterChange: () => {},
};
