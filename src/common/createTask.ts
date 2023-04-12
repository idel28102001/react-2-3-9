import { TimerInterface } from '../components/Timer/Timer';

export interface TaskPropsInterface {
  description: string;
  createdAt: Date;
  isDone: boolean;
  timer: TimerInterface;
}

export interface TaskInterface extends TaskPropsInterface {
  id: number;
}

const timerInit = (): TimerInterface => ({
  isStopped: false,
  startDiapason: new Date(),
  diffInMS: 0,
});

export default function CreateTask(description: string): TaskPropsInterface {
  return { description, createdAt: new Date(), isDone: false, timer: timerInit() };
}
