import './Header.css';
import React, { FC } from 'react';

import NewTaskForm from '../NewTaskForm';
import { AddTaskType } from '../NewTaskForm/NewTaskForm';

interface HeaderPropsInterface {
  addTask: AddTaskType;
}

const Header: FC<HeaderPropsInterface> = ({ addTask }) => {
  return (
    <header className="header">
      <h1>todos</h1>
      <NewTaskForm addTask={addTask} />
    </header>
  );
};

export default Header;
