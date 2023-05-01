import './NewTaskForm.css';
import React, { FC, useCallback, useRef } from 'react';

import CreateTask, { TaskPropsInterface } from '../../common/createTask';

export type AddTaskType = (arg: TaskPropsInterface) => void;

interface NewTaskFormPropsInterface {
  addTask: AddTaskType;
}

const NewTaskForm: FC<NewTaskFormPropsInterface> = ({ addTask }) => {
  const ref = useRef<HTMLInputElement>(null);
  const addTaskFunc = useCallback((e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (ref.current) {
      const current = ref.current;
      if (current.value.trim()) {
        const newTask: TaskPropsInterface = CreateTask(current.value);
        addTask(newTask);
        current.value = '';
      }
    }
  }, []);
  return (
    <form onSubmit={addTaskFunc}>
      <input ref={ref} className="new-todo" placeholder="What needs to be done?" autoFocus />
      <input type="submit" className="new-todo-submit" />
    </form>
  );
};
export default NewTaskForm;
