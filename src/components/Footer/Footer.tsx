import React from 'react';

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

export default class Footer extends React.Component<FooterPropsInterface, unknown> {
  render() {
    return (
      <footer className="footer">
        <span className="todo-count">{this.props.itemsLeft} items left</span>
        <TasksFilter filterTasks={this.props.changeTasks.filterTasks} filters={this.props.filters} />
        <button onClick={this.props.changeTasks.removeCompleted} className="clear-completed">
          Clear completed
        </button>
      </footer>
    );
  }
}
