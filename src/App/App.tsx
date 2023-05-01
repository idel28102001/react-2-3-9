import React, { FC } from 'react';

import './App.css';
import TodoApp from '../components/TodoApp';
import { TaskFilterFlags, TaskFilters } from '../components/TasksFilterItem/TasksFilterItem';

const App: FC = () => {
  const filters: Array<TaskFilters> = [
    { value: TaskFilterFlags.ALL, checked: true, label: 'All', id: 1 },
    {
      value: TaskFilterFlags.ACTIVE,
      checked: false,
      label: 'Active',
      id: 2,
    },
    { value: TaskFilterFlags.COMPLETED, checked: false, label: 'Completed', id: 3 },
  ];
  return (
    <div className="App">
      <TodoApp filters={filters} />
    </div>
  );
};
export default App;
