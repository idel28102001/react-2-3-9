import React from 'react';

import './App.css';
import TodoApp from '../components/TodoApp';
import { TaskFilterFlags, TaskFilters } from '../components/TasksFilterItem/TasksFilterItem';

export default class App extends React.Component<unknown, unknown> {
  filters: Array<TaskFilters> = [
    { value: TaskFilterFlags.ALL, checked: true, label: 'All', id: 1 },
    {
      value: TaskFilterFlags.ACTIVE,
      checked: false,
      label: 'Active',
      id: 2,
    },
    { value: TaskFilterFlags.COMPLETED, checked: false, label: 'Completed', id: 3 },
  ];

  render() {
    return (
      <div className="App">
        <TodoApp filters={this.filters} />
      </div>
    );
  }
}
