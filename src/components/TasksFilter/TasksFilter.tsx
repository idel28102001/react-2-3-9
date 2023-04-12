import './TasksFilter.css';
import React from 'react';

import TasksFilterItem from '../TasksFilterItem';
import { FilterTasks, TaskFilters } from '../TasksFilterItem/TasksFilterItem';

interface TaskFilterPropsInterface {
  filters: Array<TaskFilters>;
  filterTasks: FilterTasks;
}

export default class TasksFilter extends React.Component<TaskFilterPropsInterface, unknown> {
  render() {
    return (
      <ul className="filters">
        {this.props.filters.map((filter) => {
          return (
            <li key={filter.id} className="filters__item">
              <TasksFilterItem filterTasks={this.props.filterTasks} item={filter} />
            </li>
          );
        })}
      </ul>
    );
  }
}
