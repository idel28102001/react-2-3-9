import './Main.css';
import React, { FC } from 'react';

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

const Main: FC<MainSectionPropsInterface> = ({ tasks, changeTasks, refactorFunctions, filters, itemsLeft }) => {
  return (
    <main className="main">
      <TaskList refactorFunctions={refactorFunctions} tasks={tasks} />
      <Footer changeTasks={changeTasks} itemsLeft={itemsLeft} filters={filters} />
    </main>
  );
};

export default Main;
