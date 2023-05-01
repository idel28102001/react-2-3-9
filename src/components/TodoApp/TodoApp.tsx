import './TodoApp.css';
import React, { FC, useCallback, useMemo, useState } from 'react';
import { differenceInMilliseconds, subMilliseconds } from 'date-fns';

import { TaskFilterFlags, TaskFilters } from '../TasksFilterItem/TasksFilterItem';
import { TaskInterface, TaskPropsInterface } from '../../common/createTask';
import { RefactorTaskMethods } from '../Task/Task';
import { ChangeTasks } from '../Footer/Footer';
import { TimerInterface, UpdateTimerType } from '../Timer/Timer';
import { AddTaskType } from '../NewTaskForm/NewTaskForm';
import Header from '../Header';
import Main from '../Main';

interface TodoAppPropsInterface {
  filters: Array<TaskFilters>;
}

interface TodoAppStateInterface {
  tasks: Array<TaskInterface>;
  filters: Array<TaskFilters>;
  flag: TaskFilterFlags;
}

const TodoApp: FC<TodoAppPropsInterface> = ({ filters }) => {
  const [state, setState] = useState<TodoAppStateInterface>({ tasks: [], filters, flag: TaskFilterFlags.ALL });

  const changeFunctions: ChangeTasks = useMemo(() => {
    const removeCompleted: ChangeTasks['removeCompleted'] = () => {
      setState((state) => ({ ...state, tasks: state.tasks.filter((e) => !e.isDone) }));
    };
    const filterTasks: ChangeTasks['filterTasks'] = (flag: TaskFilterFlags) => {
      setState((state) => ({ ...state, flag }));
    };
    return { removeCompleted, filterTasks };
  }, []);

  const addTask: AddTaskType = useCallback((task: TaskPropsInterface) => {
    setState((state) => {
      const id = Math.max(...[...state.tasks.map((e) => e.id), 0]) + 1;
      const newTasks = [...state.tasks, { ...task, id }];
      return { ...state, tasks: newTasks };
    });
  }, []);

  const refactorFunctions: RefactorTaskMethods = useMemo(() => {
    const removeTask: RefactorTaskMethods['removeTask'] = (id) => {
      setState((state) => ({ ...state, tasks: state.tasks.filter((e) => e.id !== id) }));
    };

    const completeTask: RefactorTaskMethods['completeTask'] = (id, isDone) => {
      setState((state) => {
        const currTasks = state.tasks.map((e) => {
          if (e.id !== id) return e;
          return { ...e, isDone };
        });
        return { ...state, tasks: currTasks };
      });
    };

    const editTask: RefactorTaskMethods['editTask'] = (id: number, description: string) => {
      setState((state) => {
        const currTasks = state.tasks.map((e) => {
          if (e.id !== id) return e;
          return { ...e, description };
        });
        return { ...state, tasks: currTasks };
      });
    };
    const updateTimer: UpdateTimerType = (id, timer: TimerInterface) => {
      setState((state) => {
        const diffInMilliseconds = differenceInMilliseconds(new Date(), timer.startDiapason);
        const startDiapason = subMilliseconds(new Date(), timer.diffInMS);
        const resultTimer: TimerInterface = timer.isStopped
          ? { ...timer, diffInMS: diffInMilliseconds, isStopped: true }
          : { ...timer, isStopped: false, startDiapason };
        const resultTasks = state.tasks.map((task) => {
          if (task.id !== id) return task;
          return { ...task, timer: resultTimer };
        });
        return { ...state, tasks: resultTasks };
      });
    };

    return { editTask, removeTask, completeTask, updateTimer };
  }, []);

  const filteredTasks = (state: TodoAppStateInterface): TaskInterface[] => {
    switch (state.flag) {
      case TaskFilterFlags.ALL: {
        return state.tasks;
      }
      case TaskFilterFlags.ACTIVE: {
        return state.tasks.filter((e) => !e.isDone);
      }
      case TaskFilterFlags.COMPLETED: {
        return state.tasks.filter((e) => e.isDone);
      }
    }
  };

  const itemsLeft = (state: TodoAppStateInterface): number => {
    return state.tasks.filter((e) => !e.isDone).length;
  };

  return (
    <section className="todoapp">
      <Header addTask={addTask} />
      <Main
        itemsLeft={itemsLeft(state)}
        changeTasks={changeFunctions}
        refactorFunctions={refactorFunctions}
        tasks={filteredTasks(state)}
        filters={state.filters}
      />
    </section>
  );
};
export default TodoApp;
