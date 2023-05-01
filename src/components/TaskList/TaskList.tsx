import './TaskList.css';
import React, { FC } from 'react';

import Task from '../Task';
import { RefactorTaskMethods } from '../Task/Task';
import { TaskInterface } from '../../common/createTask';

interface TaskListPropsInterface {
  tasks: Array<TaskInterface>;
  refactorFunctions: RefactorTaskMethods;
}

const TaskList: FC<TaskListPropsInterface> = ({ tasks, refactorFunctions }) => {
  return (
    <ul className="todo-list">
      {tasks.map((task) => (
        <li key={task.id}>
          <Task refactorFunctions={refactorFunctions} task={task} />
        </li>
      ))}
    </ul>
  );
};
export default TaskList;
