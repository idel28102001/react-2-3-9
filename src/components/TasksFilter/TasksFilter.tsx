import './TasksFilter.css';
import React, { FC } from 'react';

import TasksFilterItem from '../TasksFilterItem';
import { FilterTasks, TaskFilters } from '../TasksFilterItem/TasksFilterItem';

interface TaskFilterPropsInterface {
  filters: Array<TaskFilters>;
  filterTasks: FilterTasks;
}

const TasksFilter: FC<TaskFilterPropsInterface> = ({ filterTasks, filters }) => {
  return (
    <ul className="filters">
      {filters.map((filter) => {
        return (
          <li key={filter.id} className="filters__item">
            <TasksFilterItem filterTasks={filterTasks} item={filter} />
          </li>
        );
      })}
    </ul>
  );
};

export default TasksFilter;
