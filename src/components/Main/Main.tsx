import './Main.css';
import React from 'react';

import TaskList from '../TaskList';
import Footer from '../Footer';
import { ChangeTasks } from '../Footer/Footer';
import { TaskFilters } from '../TasksFilterItem/TasksFilterItem';
import { RefactorTaskMethods } from '../Task/Task';
import { TaskInterface } from '../../common/createTask';

interface MainSectionPropsInterface {
  tasks: Array<TaskInterface>;
  filters: Array<TaskFilters>;
  refactorFunctions: RefactorTaskMethods;
  changeTasks: ChangeTasks;
  itemsLeft: number;
}

export default class Main extends React.Component<MainSectionPropsInterface, unknown> {
  render() {
    return (
      <main className="main">
        <TaskList refactorFunctions={this.props.refactorFunctions} tasks={this.props.tasks} />
        <Footer changeTasks={this.props.changeTasks} itemsLeft={this.props.itemsLeft} filters={this.props.filters} />
      </main>
    );
  }
}
