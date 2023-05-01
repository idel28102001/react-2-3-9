import './TasksFilterItem.css';
import React, { FC, useCallback } from 'react';

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

const TasksFilterItem: FC<TaskFilterItemPropsInterface> = ({ item, filterTasks }) => {
  const filterTasksFunc = useCallback(() => {
    filterTasks(item.value);
  }, [item.value]);
  return (
    <>
      <input
        type="radio"
        id={item.value}
        name="filter"
        value={item.value}
        onChange={filterTasksFunc}
        className="filters__radio"
        defaultChecked={item.checked}
      />
      <label htmlFor={item.value} className="filters__label">
        {item.label}
      </label>
    </>
  );
};

export default TasksFilterItem;
