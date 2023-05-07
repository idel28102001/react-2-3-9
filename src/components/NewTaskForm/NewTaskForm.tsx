import './NewTaskForm.css';
import React, { FC, useCallback, useState } from 'react';

import CreateTask, { TaskPropsInterface } from '../../common/createTask';

export type AddTaskType = (arg: TaskPropsInterface) => void;

interface NewTaskFormPropsInterface {
  addTask: AddTaskType;
}

const NewTaskForm: FC<NewTaskFormPropsInterface> = ({ addTask }) => {
  const [text, setText] = useState<string>('');
  const addTaskFunc = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (text.trim()) {
        const newTask: TaskPropsInterface = CreateTask(text);
        addTask(newTask);
        setText('');
      }
    },
    [text]
  );
  return (
    <form onSubmit={addTaskFunc}>
      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="new-todo"
        placeholder="What needs to be done?"
        autoFocus
      />
      <input type="submit" className="new-todo-submit" />
    </form>
  );
};
export default NewTaskForm;
