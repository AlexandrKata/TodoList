import React, { Component } from 'react';
import Proptypes from 'prop-types';
import './tasks-filter.css';

export default class TasksFilter extends Component {
  static defaultProps = {
    filter: '',
    onFilterChange: () => {},
  };
  static propTypes = {
    filter: Proptypes.string,
    onFilterChange: Proptypes.func,
  };

  buttons = [
    { name: 'all', label: 'All' },
    { name: 'active', label: 'Active' },
    { name: 'completed', label: 'Completed' },
  ];

  render() {
    const { filter, onFilterChange } = this.props;

    const buttons = this.buttons.map(({ name, label }) => {
      const isActive = filter === name;
      const classNames = isActive ? 'selected' : '';
      return (
        <li key={name}>
          <button type="button" className={classNames} onClick={() => onFilterChange(name)}>
            {label}
          </button>
        </li>
      );
    });

    return <ul className="filters">{buttons}</ul>;
  }
}
