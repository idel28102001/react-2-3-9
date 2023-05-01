import type { FC } from 'react';
import React, { useCallback, useRef, useState } from 'react';
import classNames from 'classnames';

import './Task.css';

import { TaskInterface } from '../../common/createTask';
import Timer, { UpdateTimerType } from '../Timer/Timer';
import CreatedNAgo from '../CreatedNAgo';

export interface RefactorTaskMethods {
  removeTask: (id: number) => void;
  completeTask: (id: number, isDone: boolean) => void;
  editTask: (id: number, description: string) => void;
  updateTimer: UpdateTimerType;
}

interface TaskProps {
  task: TaskInterface;
  refactorFunctions: RefactorTaskMethods;
}

const Task: FC<TaskProps> = ({ task, refactorFunctions }) => {
  const ref = useRef<HTMLInputElement>(null);
  const [isEditing, setIsEditing] = useState(false);
  const editTaskText = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!ref.current) return;
    const current = ref.current;
    const value = current.value.trim();
    if (value === task.description) return;
    if (!value) {
      ref.current.value = task.description;
    } else {
      refactorFunctions.editTask(task.id, value);
    }
  };
  const setToEdit = useCallback(() => {
    setIsEditing(true);
  }, []);

  const editTask = useCallback((e: React.FormEvent<HTMLFormElement>) => {
    editTaskText(e);
    setIsEditing(false);
  }, []);
  const liClass = classNames({ editing: isEditing, completed: !isEditing && task.isDone });

  return (
    <div className={liClass}>
      <div className="view">
        <input
          className="toggle"
          type="checkbox"
          defaultChecked={task.isDone}
          onChange={(e) => refactorFunctions.completeTask(task.id, e.target.checked)}
        />
        <label>
          <span className="title">{task.description}</span>
          <Timer timer={task.timer} updateTimer={refactorFunctions.updateTimer} id={task.id} />
          <CreatedNAgo createdAt={task.createdAt} />
        </label>
        <button className="icon icon-edit" onClick={setToEdit} />
        <button className="icon icon-destroy" onClick={() => refactorFunctions.removeTask(task.id)} />
      </div>
      <form onSubmit={editTask}>
        {isEditing && <input ref={ref} type="text" className="edit" defaultValue={task.description} autoFocus />}
        <input type="submit" className="edit-submit" />
      </form>
    </div>
  );
};
export default Task;
