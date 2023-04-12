import './TasksFilterItem.css';
import React from 'react';

export enum TaskFilterFlags {
  ALL = 'all',
  ACTIVE = 'active',
  COMPLETED = 'completed',
}

export interface TaskFilters {
  id: number;
  value: TaskFilterFlags;
  label: string;
  checked: boolean;
}

export type FilterTasks = (flag: TaskFilterFlags) => void;

interface TaskFilterItemPropsInterface {
  item: TaskFilters;
  filterTasks: FilterTasks;
}

export default class TasksFilterItem extends React.Component<TaskFilterItemPropsInterface, unknown> {
  filterTasks = () => {
    this.props.filterTasks(this.props.item.value);
  };

  render() {
    return (
      <>
        <input
          type="radio"
          id={this.props.item.value}
          name="filter"
          value={this.props.item.value}
          onChange={this.filterTasks}
          className="filters__radio"
          defaultChecked={this.props.item.checked}
        />
        <label htmlFor={this.props.item.value} className="filters__label">
          {this.props.item.label}
        </label>
      </>
    );
  }
}
