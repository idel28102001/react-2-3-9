import React, { FC } from 'react';

import './Footer.css';
import TasksFilter from '../TasksFilter';
import { FilterTasks, TaskFilters } from '../TasksFilterItem/TasksFilterItem';

export type RemoveCompleted = () => void;

export interface ChangeTasks {
  filterTasks: FilterTasks;
  removeCompleted: RemoveCompleted;
}

interface FooterPropsInterface {
  filters: Array<TaskFilters>;
  itemsLeft: number;
  changeTasks: ChangeTasks;
}

const Footer: FC<FooterPropsInterface> = ({ filters, itemsLeft, changeTasks }) => {
  return (
    <footer className="footer">
      <span className="todo-count">{itemsLeft} items left</span>
      <TasksFilter filterTasks={changeTasks.filterTasks} filters={filters} />
      <button onClick={changeTasks.removeCompleted} className="clear-completed">
        Clear completed
      </button>
    </footer>
  );
};

export default Footer;
