import classNames from 'classnames';
import React, { createRef } from 'react';

import './Task.css';

import CreatedNAgo from '../CreatedNAgo';
import { TaskInterface } from '../../common/createTask';
import Timer from '../Timer';
import { UpdateTimerType } from '../Timer/Timer';

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

interface TaskState {
  isEditing: boolean;
}

export default class Task extends React.PureComponent<TaskProps, TaskState> {
  ref: React.RefObject<HTMLInputElement>;

  constructor(props: TaskProps) {
    super(props);
    this.state = { isEditing: false };
    this.ref = createRef<HTMLInputElement>();
  }

  setToEdit = () => {
    this.setState({ isEditing: true });
  };

  editTask = (e: React.FormEvent<HTMLFormElement>) => {
    this.editTaskText(e);
    this.setState({ isEditing: false });
  };

  editTaskText = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!this.ref.current) return;
    const current = this.ref.current;
    const value = current.value.trim();
    if (value === this.props.task.description) return;
    if (!value) {
      this.ref.current.value = this.props.task.description;
    } else {
      this.props.refactorFunctions.editTask(this.props.task.id, value);
    }
  };

  render() {
    const task = this.props.task;
    const liClass = classNames({ editing: this.state.isEditing, completed: !this.state.isEditing && task.isDone });
    return (
      <div className={liClass}>
        <div className="view">
          <input
            className="toggle"
            type="checkbox"
            defaultChecked={task.isDone}
            onChange={(e) => this.props.refactorFunctions.completeTask(task.id, e.target.checked)}
          />
          <label>
            <span className="title">{task.description}</span>
            <Timer timer={task.timer} updateTimer={this.props.refactorFunctions.updateTimer} id={task.id} />
            <CreatedNAgo createdAt={task.createdAt} />
          </label>
          <button className="icon icon-edit" onClick={this.setToEdit} />
          <button className="icon icon-destroy" onClick={() => this.props.refactorFunctions.removeTask(task.id)} />
        </div>
        <form onSubmit={this.editTask}>
          {this.state.isEditing && (
            <input ref={this.ref} type="text" className="edit" defaultValue={task.description} autoFocus />
          )}
          <input type="submit" className="edit-submit" />
        </form>
      </div>
    );
  }
}
