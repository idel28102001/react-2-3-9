import './Header.css';
import React from 'react';

import NewTaskForm from '../NewTaskForm';
import { AddTaskType } from '../NewTaskForm/NewTaskForm';

interface HeaderPropsInterface {
  addTask: AddTaskType;
}

export default class Header extends React.Component<HeaderPropsInterface, unknown> {
  render() {
    return (
      <header className="header">
        <h1>todos</h1>
        <NewTaskForm addTask={this.props.addTask} />
      </header>
    );
  }
}
